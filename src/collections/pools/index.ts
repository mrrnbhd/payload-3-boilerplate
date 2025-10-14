import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

export const Pools: CollectionConfig = {
  slug: 'pools',
  admin: {
    group: 'Workflows',
    useAsTitle: 'poolName',
    defaultColumns: ['name', 'status', 'provider', 'lastHealthCheck'],
  },
  fields: [
    {
      name: 'poolName',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'poolStatus',
      type: 'select',
      required: true,
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '🖹 Details',
          fields: [
            {
              name: 'connectionConfig',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'provider',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'lastHealthCheck',
                      type: 'date',
                      admin: {
                        width: '50%',
                        date: { pickerAppearance: 'dayAndTime' },
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'host',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'port',
                      type: 'number',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'authType',
                  type: 'select',
                  options: ['none', 'usernamePassword', 'ipWhitelist'],
                  defaultValue: 'usernamePassword',
                },
                {
                  name: 'credentials',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.authType === 'usernamePassword',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'username',
                          type: 'text',
                          admin: { width: '50%' },
                        },
                        {
                          name: 'password',
                          type: 'text',
                          admin: { width: '50%' },
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
