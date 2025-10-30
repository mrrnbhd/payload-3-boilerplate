import { randomInt } from 'crypto'
import type { CollectionBeforeChangeHook } from 'payload'
import { generator as passwordGenerator } from 'ts-password-generator'
import { uniqueNamesGenerator as nameGenerator, names, starWars } from 'unique-names-generator'
import type { Order } from '@/payload-types'

export const createBrowserJob: CollectionBeforeChangeHook<Order> = async ({ data, req }) => {
  if (
    data.purchaseAndFulfill &&
    data.purchaseLink &&
    data.orderNumber &&
    data.parkingLocation &&
    data.projectedCost &&
    data.parkingLocation &&
    data._status !== 'draft' &&
    ['Pending', 'Purchased'].includes(data.fulfillmentStatus ?? '')
  )
    try {
      switch (data.fulfillmentStatus) {
        case 'Pending':
          await req.payload.jobs
            .queue({
              task: 'purchase-task',
              input: {
                orderNumber: data.orderNumber,
                purchaseLink: data.purchaseLink,
                parkingLocation: data.parkingLocation,
                accountEmail: `${nameGenerator({ dictionaries: [names, starWars], length: randomInt(10, 15) })}`,
                accountFirstName: nameGenerator({ dictionaries: [names] }),
                accountLastName: nameGenerator({ dictionaries: [names] }),
                accountPassword: passwordGenerator({
                  haveString: true,
                  haveNumbers: true,
                  haveSymbols: true,
                  charsQty: randomInt(12, 25),
                }),
                billingZip: 0,
                cardCvcNumber: 0,
                cardExpirationDate: '11/22/22',
                cardNumber: 1234,
                projectedCost: 22,
                proxySession: '',
              },
            })
            .finally(() => {
              data.fulfillmentStatus = 'Queued'
            })
          break
        case 'Purchased':
          await req.payload.jobs
            .queue({
              task: 'fulfillment-task',
              input: {
                orderNotes: '',
                orderNumber: '',
                purchasePdf: '',
                purchasePrice: 1234,
              },
            })
            .finally(() => {
              data.fulfillmentStatus = 'Queued'
            })
      }
    } catch (error) {
      console.log(error)
      data.fulfillmentStatus = 'Error'
    }
}
