import { err, ok, ResultAsync } from 'neverthrow'
import type { CollectionBeforeChangeHook } from 'payload'
import * as R from 'remeda'
import type { Order, Setting as Settings } from '@/payload-types'

export type Account = {
  first: string
  last: string
  pass: string
  email: string
  card: number
  exp: string
  cvc: number
  zip: number
  status: string
}

type AccountData = Account[]

class SettingsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SettingsError'
  }
}
class AccountError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AccountError'
  }
}
class QueueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'QueueError'
  }
}

export const createBrowserJob: CollectionBeforeChangeHook<Order> = async ({ data, req }) => {
  const shouldQueue =
    data.purchaseAndFulfill &&
    data.purchaseLink &&
    data.orderNumber &&
    data.parkingLocation &&
    data.projectedCost &&
    data._status !== 'draft' &&
    ['Pending', 'Purchased'].includes(data.fulfillmentStatus ?? '')

  if (!shouldQueue) {
    return
  }

  const {
    orderNumber,
    purchaseLink,
    parkingLocation,
    projectedCost,
    orderNotes,
    purchasePdf,
    actualCost,
    fulfillmentStatus,
  } = data

  const jobResult = await ResultAsync.fromPromise(
    req.payload.findGlobal({
      slug: 'settings',
      overrideAccess: true,
      select: {
        accountData: true,
        proxyLogin: true,
        proxyPassword: true,
        proxyHost: true,
        proxyPort: true,
      },
    }) as Promise<Settings>,
    (e) => new SettingsError((e as Error).message)
  )
    .andThen((identity) => {
      const { accountData, proxyHost, proxyLogin, proxyPassword, proxyPort } = identity
      const accounts = accountData as AccountData | null | undefined

      if (!accounts || R.isEmpty(accounts)) {
        return err(new AccountError('No accounts found in Settings.'))
      }

      const availableAccounts = R.filter(accounts, (a) => a.status === 'available')

      if (R.isEmpty(availableAccounts)) {
        return err(new AccountError('No available accounts found.'))
      }

      const account = R.sample(availableAccounts, 1)[0]
      if (!account) {
        return err(new AccountError('Failed to select a random account.'))
      }

      if (!proxyLogin || !proxyPassword || !proxyHost || !proxyPort) {
        return err(new SettingsError('Proxy configuration is incomplete in Settings.'))
      }

      const proxySession = `http://${proxyLogin}:${proxyPassword}@${proxyHost}:${proxyPort}`

      return ok({ account, proxySession })
    })
    .andThen(({ account, proxySession }) => {
      if (!orderNumber || !purchaseLink || !parkingLocation || !projectedCost) {
        return err(new QueueError('Order data became empty. This should not happen.'))
      }
      let jobPromise: Promise<any>
      switch (fulfillmentStatus) {
        case 'Pending':
          jobPromise = req.payload.jobs.queue({
            task: 'purchase-task',
            input: {
              orderNumber,
              purchaseLink,
              parkingLocation,
              projectedCost,
              proxySession,
              account,
            },
          })
          break
        case 'Purchased':
          jobPromise = req.payload.jobs.queue({
            task: 'fulfillment-task',
            input: {
              orderNotes,
              orderNumber,
              purchasePdf,
              actualCost,
            },
          })
          break
        default:
          return err(new QueueError(`Invalid fulfillment status: ${fulfillmentStatus}`))
      }

      return ResultAsync.fromPromise(jobPromise, (e) => new QueueError((e as Error).message))
    })

  jobResult.match(
    () => {
      data.fulfillmentStatus = 'Queued'
    },
    (error) => {
      req.payload.logger.error(`${error.name}: ${error.message}`)
      data.fulfillmentStatus = 'Error'
    }
  )
}
