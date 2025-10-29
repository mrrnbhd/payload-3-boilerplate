import type { CollectionAfterChangeHook } from 'payload'
import type { Order } from '@/payload-types'

export const createBrowserJob: CollectionAfterChangeHook<Order> = async ({ data, req }) => {
  if (
    data.purchaseAndFulfill &&
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
                orderNumber: '1234',
                purchaseLink: data.purchaseLink ?? '',
                email: 'email@gmail.com',
                password: '123456789',
                cardCvcNumber: 1234,
                cardExpirationDate: '11/22/22',
                cardNumber: 123456789,
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
