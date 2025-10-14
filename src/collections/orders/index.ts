import { getServerSideURL } from '@/lib/payload'

import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
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
      type: 'select',
      name: 'orderStatus',
      options: ['Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled', 'Archived'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'number',
      name: 'orderValue',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      type: 'number',
      name: 'orderNumber',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'orderLink',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'orderTags',
      relationTo: 'tags',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '🖹 Details',
          fields: [
            {
              type: 'array',
              name: 'eventTickets',
              fields: [
                {
                  type: 'group',
                  label: 'Event Details',
                  virtual: true,
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'marketplace',
                          options: ['Stubhub', 'SeatGeek', 'GoTickets'],
                        },
                        {
                          type: 'text',
                          name: 'eventOrPerformerName',
                        },
                        {
                          type: 'text',
                          name: 'venueName',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'array',
                  name: 'parkingTickets',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'source',
                          label: 'Purchase Source',
                          options: ['SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking'],
                        },
                        {
                          type: 'text',
                          name: 'link',
                          label: 'Purchase Link',
                          admin: {
                            readOnly: true,
                          },
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'type',
                          label: 'Ticket Type',
                          options: ['Eticket'],
                        },
                        {
                          type: 'select',
                          name: 'status',
                          label: 'Purchase Status',
                          options: ['Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled'],
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'text',
                          name: 'parkingSpotLocation',
                        },
                        {
                          type: 'number',
                          name: 'projectedPurchasePrice',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '🗠 History',
          fields: [
            {
              type: 'array',
              name: 'orderHistory',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'source',
                      label: 'Purchase Source',
                      options: ['SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking'],
                    },
                    {
                      type: 'text',
                      name: 'link',
                      label: 'Purchase Link',
                      admin: {
                        readOnly: true,
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'type',
                      label: 'Ticket Type',
                      options: ['Eticket'],
                    },
                    {
                      type: 'select',
                      name: 'status',
                      label: 'Purchase Status',
                      options: ['Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled'],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      name: 'parkingSpotLocation',
                    },
                    {
                      type: 'number',
                      name: 'projectedPurchasePrice',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '⛁ Metadata',
          fields: [
            {
              type: 'richText',
              name: 'orderNotes',
              editor: defaultLexical,
            },
          ],
        },
        {
          label: '🛈 Handbook',
          fields: [
            {
              type: 'richText',
              name: 'userHandbook',
              editor: defaultLexical,
            },
          ],
        },
      ],
    },
  ],
}
