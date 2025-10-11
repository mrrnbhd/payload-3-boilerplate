import { getServerSideURL } from '@/lib/payload'

import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    group: 'Workflows',
    livePreview: {
      url: ({ data }) => {
        return `${getServerSideURL()}/orders/${data.id}?draft=true`
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
      type: 'text',
      name: 'title',
    },
    {
      type: 'array',
      name: 'dataLog',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'select',
              name: 'dataSource',
              options: ['SpotHero', 'ParkWhiz', 'ParkMobile', 'ACE Parking'],
            },
            {
              type: 'select',
              name: 'dataType',
              options: ['Entire Page', 'Pass Details', 'QR Code', 'Event Details'],
              filterOptions: ({ options, siblingData }) =>
                siblingData.dataSource
                  ? options.filter((option) =>
                      siblingData.dataSource === 'SpotHero' || siblingData.dataSource === 'ParkWhiz'
                        ? option
                        : option.toString
                    )
                  : options,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              type: 'json',
              name: 'data',
              admin: {
                style: {
                  width: 50,
                },
              },
            },
            {
              type: 'upload',
              name: 'attachments',
              relationTo: 'payload-uploads',
              hasMany: true,
              admin: {
                style: {
                  width: 50,
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
