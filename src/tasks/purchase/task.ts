import type { TaskConfig } from 'payload'
import { purchaseHandler } from './handler'

export const purchaseTask: TaskConfig<any> = {
  slug: 'purchase-task',
  handler: purchaseHandler,
  inputSchema: [
    {
      type: 'text',
      name: 'orderNumber',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
    },
    {
      type: 'email',
      name: 'password',
    },
    {
      type: 'number',
      name: 'cardNumber',
    },
    {
      type: 'number',
      name: 'cardCvcNumber',
    },
    {
      type: 'date',
      name: 'cardExpirationDate',
    },
  ],
  outputSchema: [
    {
      type: 'number',
      name: 'purchasePrice',
      required: true,
    },
    {
      type: 'upload',
      name: 'purchasePdf',
      required: true,
      relationTo: 'files',
      displayPreview: true,
    },
    {
      type: 'textarea',
      name: 'orderNotes',
    },
    {
      type: 'select',
      name: 'orderStatus',
      options: ['Purchased', 'Error'],
    },
  ],
}
