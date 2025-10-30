import type { TaskConfig } from 'payload'
import { purchaseHandler } from './handlers'

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
      name: 'proxySession',
      required: true,
    },
    {
      type: 'group',
      name: 'account',
      fields: [
        {
          type: 'text',
          name: 'first',
          required: true,
        },
        {
          type: 'text',
          name: 'last',
          required: true,
        },
        {
          type: 'email',
          name: 'email',
          required: true,
        },
        {
          type: 'text',
          name: 'pass',
          required: true,
        },
        {
          type: 'number',
          name: 'card',
          required: true,
        },
        {
          type: 'number',
          name: 'cvc',
          required: true,
        },
        {
          type: 'date',
          name: 'exp',
          required: true,
          admin: {},
        },
        {
          type: 'number',
          name: 'zip',
          required: true,
        },
        {
          type: 'text',
          name: 'promo',
          required: false,
        },
      ],
    },
  ],
  outputSchema: [
    {
      type: 'number',
      name: 'actualCost',
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
