import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    group: 'Workflows',
    useAsTitle: 'jobName',
  },
  fields: [
    {
      type: 'text',
      name: 'jobName',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'jobStatus',
      options: ['Draft', 'Active', 'Running', 'Disabled', 'Blocked'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'jobTags',
      relationTo: 'tags',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'relationship',
          name: 'jobAssignee',
          relationTo: 'users',
        },
        {
          type: 'relationship',
          name: 'jobProxies',
          relationTo: 'pools',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '🖹 Details',
          fields: [
            {
              type: 'group',
              name: 'When',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'trigger',
                      label: 'Trigger Type',
                      options: [
                        'A Payload Collection is Changed',
                        'A TradeDesk Webhook is Received',
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'targetCollections',
                      label: 'Target Collection(s)',
                      options: ['Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                    },
                    {
                      type: 'relationship',
                      name: 'targetDocuments',
                      label: 'Target Document(s)',
                      relationTo: ['orders', 'pools', 'users', 'tags', 'jobs'],
                    },
                    {
                      type: 'text',
                      name: 'targetFields',
                      label: 'Target Field(s)',
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              label: '',
              virtual: true,
              fields: [
                {
                  type: 'array',
                  name: 'if',
                  labels: {
                    singular: 'Condition',
                    plural: 'Conditions',
                  },
                  fields: [
                    {
                      type: 'select',
                      name: 'filter',
                      label: 'Filter Type',
                      options: [
                        'Is Equal to',
                        'Is Not Equal to',
                        'Is Less Than',
                        'Is Less Than or Equal to',
                        'Is Greater Than',
                        'Is Greater Than or Equal to',
                        'Is Like',
                        'Is Not Like',
                        'Is In',
                        'Is Not In',
                        'Exists',
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'targetCollections',
                          label: 'Filter Collection(s)',
                          options: ['Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                        },
                        {
                          type: 'relationship',
                          name: 'targetDocuments',
                          label: 'Filter Document(s)',
                          relationTo: ['orders', 'pools', 'users', 'tags', 'jobs'],
                        },
                        {
                          type: 'text',
                          name: 'targetFields',
                          label: 'Target Field(s)',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'array',
              name: 'then',
              labels: {
                singular: 'Actions',
                plural: 'Actions',
              },
              fields: [
                {
                  type: 'select',
                  name: 'type',
                  label: 'Action Type',
                  options: ['Sequential', 'Parallel', 'Asynchronous'],
                },
                {
                  type: 'array',
                  name: 'operations',
                  labels: {
                    singular: 'Operation',
                    plural: 'Operations',
                  },
                  fields: [
                    {
                      type: 'select',
                      name: 'type',
                      label: 'Operation Type',
                      options: ['Payload Operation', 'TradeDesk Operation'],
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
