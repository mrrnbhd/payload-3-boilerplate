import type { CollectionConfig } from 'payload'
import { getBrowserSession } from './hooks/get-browser-session'

export const Orders: CollectionConfig = {
  slug: 'orders',
  enableQueryPresets: true,
  trash: true,
  folders: true,
  admin: {
    defaultColumns: [
      'orderStatus',
      'orderNumber',
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
        return data.sessionURL || ''
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
  hooks: {
    beforeChange: [getBrowserSession],
  },
  fields: [
    {
      type: 'text',
      name: 'sessionURL',
      admin: {
        hidden: true,
      },
    },
    {
      type: 'row',
      admin: {},
      fields: [
        {
          type: 'number',
          name: 'orderNumber',
          admin: {
            width: '40%',
          },
        },
        {
          type: 'relationship',
          name: 'tags',
          relationTo: 'tags',
          hasMany: true,
          admin: {
            width: '60%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'status',
          label: 'Order Status',
          options: ['Pending', 'Purchased', 'Fulfilled', 'Error'],
          admin: {
            width: '40%',
          },
        },
        {
          type: 'text',
          name: 'orderLink',
          label: 'Order Link',
          admin: {
            width: '30%',
          },
        },
        {
          type: 'number',
          name: 'value',
          label: 'Order Value',
          admin: {
            width: '30%',
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
          },
        },
        {
          type: 'text',
          name: 'venue',
          label: 'Parking Venue',
          admin: {
            width: '30%',
          },
        },
        {
          type: 'text',
          name: 'location',
          label: 'Parking Location',
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'vendor',
          label: 'Purchase Vendor',
          options: ['SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking'],
          admin: {
            width: '40%',
          },
        },
        {
          type: 'text',
          name: 'link',
          label: 'Purchase Link',
          admin: {
            width: '30%',
          },
        },

        {
          type: 'number',
          name: 'price',
          label: 'Purchase Price',
          admin: {
            width: '30%',
          },
        },
      ],
    },

    {
      type: 'upload',
      name: 'PDF',
      label: 'Purchase PDF',
      relationTo: 'files',
    },
    {
      type: 'textarea',
      name: 'notes',
      label: 'Additional Notes',
      admin: {
        rows: 5,
      },
    },
  ],
}
