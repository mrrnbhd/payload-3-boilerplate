import type { CollectionBeforeChangeHook } from 'payload'
import type { Order } from '@/payload-types'

export const createBrowserJob: CollectionBeforeChangeHook<Order> = async ({ data, req }) => {
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
                orderNumber: data.orderNumber ?? '',
                purchaseLink: data.purchaseLink ?? '',
                location: data.location ?? '',
                projectedCost: data.projectedCost ?? 0,
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
                orderNumber: '',
                purchasePrice: 1234,
                purchasePdf: '',
                orderNotes: '',
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
