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
                      options: ['Payload Event', 'TradeDesk Event'],
                    },
                    {
                      type: 'select',
                      name: 'eventType',
                      label: 'Trigger Event',
                      options: ['Create', 'Update', 'Delete'],
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'sourceCollections',
                      label: 'Source Collection(s)',
                      options: ['Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                    },
                    {
                      type: 'relationship',
                      name: 'sourceDocuments',
                      label: 'Source Document(s)',
                      relationTo: ['tasks', 'orders', 'pools', 'users', 'tags', 'jobs'],
                    },
                    {
                      type: 'text',
                      name: 'sourceFields',
                      label: 'Source Field(s)',
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
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'filterCollections',
                          label: 'Filtered Collection(s)',
                          options: ['Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                        },
                        {
                          type: 'relationship',
                          name: 'filterDocuments',
                          label: 'Filtered Document(s)',
                          relationTo: ['tasks', 'orders', 'pools', 'users', 'tags', 'jobs'],
                        },
                        {
                          type: 'text',
                          name: 'filterFields',
                          label: 'Filtered Field(s)',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'condition',
                          label: 'Condition Type',
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
                          type: 'select',
                          name: 'comparisonType',
                          label: 'Comparison Type',
                          options: ['Static Value', 'Dynamic Value'],
                        },
                      ],
                    },
                    {
                      type: 'text',
                      name: 'comparedValue',
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData.comparisonType === 'Static Value',
                      },
                    },
                    {
                      type: 'row',
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData.comparisonType === 'Dynamic Value',
                      },
                      fields: [
                        {
                          type: 'select',
                          name: 'comparedCollections',
                          label: 'Compared Collection(s)',
                          options: ['Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                        },
                        {
                          type: 'relationship',
                          name: 'comparedDocuments',
                          label: 'Compared Document(s)',
                          relationTo: ['orders', 'pools', 'users', 'tags', 'jobs'],
                        },
                        {
                          type: 'text',
                          name: 'comparedFields',
                          label: 'Compared Field(s)',
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
                singular: 'Operation',
                plural: 'Operations',
              },
              fields: [
                {
                  type: 'select',
                  name: 'type',
                  label: 'Operation Type',
                  options: ['Sequential', 'Parallel', 'Asynchronous'],
                },
                {
                  type: 'array',
                  name: 'actions',
                  labels: {
                    singular: 'Action',
                    plural: 'Actions',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'actionType',
                          label: 'Action Type',
                          options: ['Payload Action', 'TradeDesk Action'],
                        },
                        {
                          type: 'select',
                          name: 'eventType',
                          label: 'Action Event',
                          options: ['Create', 'Update', 'Delete'],
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          type: 'select',
                          name: 'targetCollections',
                          label: 'Target :Collection(s)',
                          options: ['Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs'],
                        },
                        {
                          type: 'relationship',
                          name: 'targetDocuments',
                          label: 'Target Document(s)',
                          relationTo: ['tasks', 'orders', 'pools', 'users', 'tags', 'jobs'],
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
