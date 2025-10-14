import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    group: 'Workflows',
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'type',
      label: 'Task Type',
      options: ['Fulfill Orders', 'Custom Task'],
    },
    {
      type: 'relationship',
      name: 'tags',
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
              type: 'row',
              fields: [
                {
                  type: 'relationship',
                  name: 'taskAssignee',
                  relationTo: ['users', 'pools'],
                  admin: {},
                },
                {
                  type: 'select',
                  name: 'taskStatus',
                  options: ['Pending', 'In Progress', 'Complete', 'Blocked', 'Backlogged'],
                  admin: {},
                },
              ],
            },
            {
              type: 'richText',
              name: 'Task Notes',
              editor: lexicalEditor(),
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
