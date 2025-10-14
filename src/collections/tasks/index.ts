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
                  options: ['Fulfill Orders', 'Custom Task'],
                },
                {
                  type: 'relationship',
                  name: 'taskAssignee',
                  relationTo: 'users',
                },
                {
                  type: 'relationship',
                  name: 'taskProxies',
                  relationTo: 'pools',
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
