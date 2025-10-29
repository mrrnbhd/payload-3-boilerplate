import type { TaskConfig } from 'payload'
import { fulfillmentHandler } from './handler'

export const fullfillmentTask: TaskConfig<'fulfillment-task'> = {
  slug: 'fulfillment-task',
  handler: fulfillmentHandler,
  inputSchema: [
    {
      type: 'text',
      name: 'orderNumber',
    },
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
  outputSchema: [
    {
      type: 'select',
      name: 'orderStatus',
      options: ['Fulfilled', 'Error'],
    },
  ],
}
