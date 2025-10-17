import { getServerSideURL } from '@/lib/payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    group: 'Workflows',
    useAsTitle: 'name',
    livePreview: {
      url: ({ data }) => {
        return `${getServerSideURL()}/tasks/${data.id}?draft=true`
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
      name: 'name',
      label: 'Task Name',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'taskStatus',
      options: ['Pending', 'In Progress', 'Running', 'Complete', 'Blocked', 'Backlogged'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'tags',
      label: 'Task Tags',
      relationTo: 'tags',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'richText',
      name: 'Task Notes',
      editor: lexicalEditor(),
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
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'taskType',
                  label: 'Task Type',
                  options: ['Purchase Ticket', 'Custom Task'],
                },

                {
                  type: 'select',
                  name: 'ticketVendor',
                  options: ['SpotHero', 'ParkWhiz', 'ACE Parking'],
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.taskType === 'Purchase Ticket'
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  name: 'taskAssignee',
                  relationTo: 'users',
                },
                {
                  type: 'relationship',
                  name: 'taskProfile',
                  relationTo: 'profiles',
                },
                {
                  type: 'relationship',
                  name: 'taskProxy',
                  relationTo: ['pools', 'proxies'],
                },
              ],
            },
            {
              type: 'group',
              label: 'SpotHero Purchase',
              fields: [
                {
                  type: 'collapsible',
                  label: 'Step 1 - Link Incomplete Order Document',
                  fields: [
                    {
                      type: 'relationship',
                      name: 'linkedOrder',
                      relationTo: 'orders',
                      admin: {
                        description: 'Select the order you would like to process.',
                      },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Step 2 - Get Parking Pass Purchase Price',
                  fields: [
                    {
                      type: 'number',
                      name: 'purchasePrice',
                      admin: {
                        description: 'Get purchase price.',
                      },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Step 3 - Upload Parking Pass Page as a PDF',
                  fields: [
                    {
                      type: 'upload',
                      name: 'passPDF',
                      label: 'Pass PDF',
                      relationTo: 'payload-uploads',
                      admin: {
                        description: 'Upload the parking pass as a PDF.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '🗠 History',
          fields: [],
        },
        {
          label: '⛁ Metadata',
          fields: [
            {
              name: 'healthStatus',
              type: 'text',
              virtual: true,
              admin: {
                readOnly: true,
              },
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
