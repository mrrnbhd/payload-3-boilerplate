import type { Field } from 'payload'

export const purchaseInputSchema: Field[] = [
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
    type: 'number',
    name: 'projectedCost',
    required: true,
  },
  {
    type: 'text',
    name: 'parkingLocation',
    required: true,
  },
  {
    type: 'text',
    name: 'proxySession',
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
]
