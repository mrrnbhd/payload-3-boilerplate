import { ResultAsync } from 'neverthrow'
import type { PayloadRequest, TaskHandler, TaskHandlerResult } from 'payload'
import puppeteer, { type Page } from 'puppeteer-core'
import Steel from 'steel-sdk'
import type { Account } from '@/collections/orders/hooks/create-browser-job'
import type { VendorHostName } from '../schemas/vendors'
import { handleAceParking } from './vendors/ace-parking'
import { handleParkMobile } from './vendors/park-mobile'
import { handleParkWhiz } from './vendors/park-whiz'
import { handleSpotHero } from './vendors/spot-hero'

class BrowserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BrowserError'
  }
}
class AutomationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AutomationError'
  }
}

const vendorHandlers: Record<
  VendorHostName,
  (page: Page, account: Account, purchaseLink: string, req: PayloadRequest) => Promise<void>
> = {
  'parkwhiz.com': handleParkWhiz,
  'spothero.com': handleSpotHero,
  'app.parkmobile.io': handleParkMobile,
  'space.aceparking.com': handleAceParking,
}

export const purchaseHandler: TaskHandler<'purchase-task'> = async ({ input, req }) => {
  const { purchaseLink, account } = input

  const client = new Steel({
    steelAPIKey: process.env.STEEL_API_KEY,
    baseURL: `https://${process.env.STEEL_URL}`,
  })

  let session: Awaited<ReturnType<typeof client.sessions.create>> | undefined

  try {
    session = await client.sessions.create()
    req.payload.logger.info(`Session created: ${session.id}`)
    req.payload.logger.info(`View live session at: ${session.sessionViewerUrl}`)

    const automationResult = await ResultAsync.fromPromise(
      (async () => {
        const browser = await puppeteer.connect({
          browserWSEndpoint: `wss://ticketer-browser.up.railway.app?apiKey=${process.env.STEEL_API_KEY}&sessionId=${session.id}`,
        })

        const hostname = new URL(purchaseLink).hostname as VendorHostName
        req.payload.logger.info(`Running purchase automation for ${hostname}`)
        const { docs: ordersToUpdate } = await req.payload.find({
          collection: 'orders',
          where: {
            orderNumber: {
              equals: input.orderNumber,
            },
          },
          limit: 1,
          overrideAccess: true,
        })

        if (!ordersToUpdate || ordersToUpdate.length === 0) {
          throw new AutomationError(`Could not find order with orderNumber: ${input.orderNumber}`)
        }

        const orderId = ordersToUpdate[0].id

        await req.payload.update({
          collection: 'orders',
          id: orderId,
          overrideAccess: true,
          data: {
            fulfillmentStatus: 'Running',
          },
        })

        const page = await browser.newPage()

        const handler = vendorHandlers[hostname]

        if (!handler) {
          throw new AutomationError(`Unknown vendor hostname: ${hostname}. Cannot process.`)
        }
        await handler(page, account as Account, purchaseLink, req)
        await browser.close()
      })(),
      (e) => (e instanceof Error ? e : new AutomationError(String(e)))
    )

    if (automationResult.isErr()) {
      throw automationResult.error
    }

    const purchaseResult: TaskHandlerResult<'purchase-task'> = {
      output: {},
      state: 'succeeded',
    }
    return purchaseResult
  } catch (error: any) {
    req.payload.logger.error(`${error.name}: ${error.message}`)
    const purchaseResult: TaskHandlerResult<'purchase-task'> = {
      state: 'failed',
      errorMessage: `${error.name}: ${error.message}`,
    }
    return purchaseResult
  } finally {
    if (session) {
      await client.sessions.release(session.id)
      req.payload.logger.info('Session released')
    }
  }
}
