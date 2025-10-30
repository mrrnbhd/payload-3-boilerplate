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
          equals: 'Running',
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
          equals: 'Running',
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
      name: 'parkingLocation',
      required: true,
    },
    {
      type: 'number',
      name: 'projectedCost',
      required: true,
    },
    {
      type: 'text',
      name: 'promoCode',
      required: false,
    },
    {
      type: 'text',
      name: 'accountFirstName',
      required: true,
    },
    {
      type: 'text',
      name: 'accountLastName',
      required: true,
    },
    {
      type: 'email',
      name: 'accountEmail',
      required: true,
    },
    {
      type: 'text',
      name: 'accountPassword',
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
      admin: {},
    },
    {
      type: 'number',
      name: 'billingZip',
      required: true,
    },
    {
      type: 'text',
      name: 'proxySession',
      required: true,
    },
  ],
  outputSchema: [
    {
      type: 'number',
      name: 'purchasePrice',
    },
    {
      type: 'upload',
      name: 'purchasePdf',
      relationTo: 'files',
    },
    {
      type: 'textarea',
      name: 'orderNotes',
    },
  ],
}
