import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { createBrowserJob } from './hooks/create-browser-job'

export const Orders: CollectionConfig = {
  slug: 'orders',
  enableQueryPresets: true,
  folders: true,
  access: {
    update: authenticated,
    read: authenticated,
  },
  admin: {
    defaultColumns: [
      'orderNumber',
      'fulfillmentStatus',
      'purchaseLink',
      'parkingLocation',
      'projectedCost',
      'actualCost',
      'purchasePdf',
      'orderNotes',
      'orderValue',
      'orderLink',
      'tags',
    ],
    useAsTitle: 'orderNumber',
    group: 'Operation',
  },
  hooks: { beforeChange: [createBrowserJob] },
  fields: [
    {
      type: 'select',
      name: 'fulfillmentStatus',
      label: 'Fulfillment Status',
      defaultValue: 'Pending',
      options: ['Pending', 'Queued', 'Running', 'Purchased', 'Fulfilled', 'Error'],
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'number',
          name: 'orderValue',
          label: 'Order Value',
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
        {
          type: 'text',
          name: 'orderLink',
          label: 'Order Link',
          admin: {
            readOnly: true,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'text',
      name: 'orderNumber',
      required: true,
      admin: {
        readOnly: false,
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'tags',
      label: 'Order Tags',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        readOnly: false,
        position: 'sidebar',
      },
    },
    {
      type: 'checkbox',
      name: 'purchaseAndFulfill',
      label: 'Purchase and Fulfill Order?',
      admin: {
        description: 'Adds this order to the automated purchase and fulfillment queue.',
        readOnly: false,
        width: '50%',
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'purchaseLink',
          label: 'Purchase Link',
          required: true,
          admin: {
            width: '50%',
            readOnly: false,
          },
        },
        {
          type: 'text',
          name: 'parkingLocation',
          label: 'Parking Location',
          admin: {
            width: '50%',
            readOnly: false,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'number',
          name: 'projectedCost',
          admin: {
            width: '50%',
            readOnly: false,
          },
        },
        {
          type: 'number',
          name: 'actualCost',
          admin: {
            width: '50%',
            readOnly: false,
          },
        },
      ],
    },
    {
      type: 'upload',
      name: 'purchasePdf',
      label: 'Purchase PDF',
      relationTo: 'files',
      admin: {
        readOnly: false,
        width: '60%',
      },
    },
    {
      type: 'textarea',
      name: 'orderNotes',
      label: 'Order Notes',
      admin: {
        rows: 3,
        readOnly: false,
      },
    },
  ],
}
