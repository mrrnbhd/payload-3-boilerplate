import type { TaskConfig } from 'payload'
import { fulfillmentHandler } from './handler'

export const fullfillmentTask: TaskConfig<any> = {
  slug: 'fulfillment-task',
  handler: fulfillmentHandler,
  inputSchema: [
    {
      type: 'number',
      name: 'purchasePrice',
      required: true,
    },
    {
      type: 'upload',
      name: 'purchasePdf',
      required: false,
      relationTo: 'files',
      displayPreview: true,
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
