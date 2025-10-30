import type { TaskConfig } from 'payload'
import { purchaseHandler } from './handler'

export const purchaseTask: TaskConfig<'purchase-task'> = {
  slug: 'purchase-task',
  handler: purchaseHandler,
  onSuccess: ({ req }) => {
    req.payload.update({
      collection: 'orders',
      limit: 1,
      where: {
        fulfillmentStatus: {
          equals: 'running',
        },
      },
      data: {
        fulfillmentStatus: 'Purchased',
      },
    })
  },
  onFail: ({ req }) => {
    req.payload.update({
      collection: 'orders',
      limit: 1,
      where: {
        fulfillmentStatus: {
          equals: 'running',
        },
      },
      data: {
        fulfillmentStatus: 'Error',
      },
    })
  },
  inputSchema: [
    {
      type: 'text',
      name: 'orderNumber',
      required: true,
    },
    {
      type: 'text',
      name: 'purchaseLink',
      required: true,
    },
    {
      type: 'text',
      name: 'location',
      required: true,
    },
    {
      type: 'number',
      name: 'projectedCost',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      required: true,
    },
    {
      type: 'text',
      name: 'password',
      required: true,
    },
    {
      type: 'number',
      name: 'cardNumber',
      required: true,
    },
    {
      type: 'number',
      name: 'cardCvcNumber',
      required: true,
    },
    {
      type: 'date',
      name: 'cardExpirationDate',
      required: true,
    },
    {
      type: 'text',
      name: 'promoCode',
      required: false,
    },
  ],
}
