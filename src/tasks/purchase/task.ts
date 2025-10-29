import type { TaskConfig } from 'payload'
import { purchaseHandler } from './handler'

export const purchaseTask: TaskConfig<'purchase-task'> = {
  slug: 'purchase-task',
  handler: purchaseHandler,
  inputSchema: [
    {
      type: 'text',
      name: 'orderNumber',
    },
    {
      type: 'text',
      name: 'purchaseLink',
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
      displayPreview: true,
    },
    {
      type: 'textarea',
      name: 'orderNotes',
    },
  ],
}
