import { getServerSideURL } from '@/lib/payload'

import type { CollectionConfig } from 'payload'
import { createBrowserJob } from './hooks/create-browser-job'

export const Orders: CollectionConfig = {
  slug: 'orders',
  enableQueryPresets: true,
  trash: true,
  folders: true,
  admin: {
    defaultColumns: [
      'orderNumber',
      'orderStatus',
      'orderValue',
      'orderLink',
      'marketplace',
      'venue',
      'eventOrPerformerName',
      'location',
      'vendor',
      'price',
      'pdf',
      'link',
      'tags',
    ],
    useAsTitle: 'orderNumber',
    group: 'Operation',
    livePreview: {
      url: ({ data }) => {
        if (data.enableBrowserView === true) {
          return `https://${process.env.STEEL_URL}/ui`
        } else {
          return `${getServerSideURL()}/admin/orders`
        }
      },
    },
  },
  hooks: { beforeChange: [createBrowserJob] },
  versions: {
    drafts: {
      autosave: {
        interval: 275,
      },
    },
  },
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
      type: 'collapsible',
      label: 'Automation',
      admin: {},
      fields: [
        {
          type: 'row',
          fields: [
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
              type: 'checkbox',
              name: 'enableBrowserView',
              label: 'Enable Browser Monitoring?',
              admin: {
                description: 'Displays the browser automation tool inside the preview panel.',
                readOnly: false,
                width: '50%',
              },
            },
          ],
        },
      ],
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
        position: 'sidebar',
      },
    },
  ],
}
