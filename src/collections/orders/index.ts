import { getServerSideURL } from '@/lib/payload'

import type { CollectionConfig } from 'payload'

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
        if (data.browserView === true) {
          return 'https://ticketer-browser.up.railway.app/ui'
        } else {
          return `${getServerSideURL()}/orders`
        }
      },
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 275,
      },
    },
  },
  fields: [
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
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'checkbox',
          name: 'purchaseAndFulfill',
          label: 'Process Purchase and Fulfill Order?',
          admin: {
            description: 'Adds this order to the automated purchase and fulfillment queue.',
            readOnly: false,
            position: 'sidebar',
          },
        },
        {
          type: 'checkbox',
          name: 'browserView',
          label: 'Enable Web Browser Monitoring?',
          admin: {
            description: 'Displays the browser automation tool inside the preview panel.',
            readOnly: false,
            position: 'sidebar',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'fulfillmentStatus',
          label: 'Fulfillment Status',
          defaultValue: 'Pending',
          options: ['Pending', 'Queued', 'Running', 'Purchased', 'Fulfilled', 'Error'],
          admin: {
            width: '40%',
            readOnly: true,
          },
        },
        {
          type: 'text',
          name: 'orderNumber',
          required: true,
          admin: {
            width: '60%',
            readOnly: true,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'number',
          name: 'value',
          label: 'Order Value',
          admin: {
            width: '40%',
            readOnly: true,
          },
        },
        {
          type: 'text',
          name: 'orderLink',
          label: 'Order Link',
          admin: {
            width: '60%',
            readOnly: true,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'number',
          name: 'price',
          label: 'Purchase Price',
          admin: {
            width: '40%',
            readOnly: false,
          },
        },
        {
          type: 'text',
          name: 'purchaseLink',
          label: 'Purchase Link',
          admin: {
            width: '60%',
            readOnly: false,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'event',
          label: 'Parking Event',
          admin: {
            width: '40%',
            readOnly: false,
          },
        },
        {
          type: 'text',
          name: 'venue',
          label: 'Parking Venue',
          admin: {
            width: '30%',
            readOnly: false,
          },
        },
        {
          type: 'text',
          name: 'location',
          label: 'Parking Location',
          admin: {
            width: '30%',
            readOnly: false,
          },
        },
      ],
    },
    {
      type: 'upload',
      name: 'pdf',
      label: 'Purchase PDF',
      relationTo: 'files',
      admin: {
        readOnly: false,
      },
    },
    {
      type: 'textarea',
      name: 'notes',
      label: 'Order Notes',
      admin: {
        rows: 3,
        readOnly: false,
      },
    },
  ],
}
