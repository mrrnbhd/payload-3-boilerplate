import type { Field } from 'payload'

export const purchaseOutputSchema: Field[] = [
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
]
