import type { CollectionConfig } from 'payload'

export const Proxies: CollectionConfig = {
  slug: 'proxies',
  admin: {
    group: 'Operation',
    useAsTitle: 'proxyName',
    defaultColumns: ['name', 'status', 'provider', 'lastHealthCheck'],
  },
  fields: [
    {
      name: 'proxyName',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'proxystatus',
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
                    },
                    {
                      name: 'lastHealthCheck',
                      type: 'date',
                      admin: {
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
                    },
                    {
                      name: 'port',
                      type: 'number',
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
                    condition: (_, siblingData) => siblingData?.authType === 'usernamePassword',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'username',
                          type: 'text',
                        },
                        {
                          name: 'password',
                          type: 'text',
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
              type: 'textarea',
              name: 'userHandbook',
            },
          ],
        },
      ],
    },
  ],
}
