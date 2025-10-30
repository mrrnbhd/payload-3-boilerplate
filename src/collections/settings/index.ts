import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Operation',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Proxy Pool',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'proxyLogin',
              admin: {
                placeholder: 'http://username:password@proxy.example.com:8080',
              },
            },
            {
              type: 'text',
              name: 'proxyPassword',
              admin: {
                placeholder: 'http://username:password@proxy.example.com:8080',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'proxyHost',
          admin: {
            placeholder: 'http://username:password@proxy.example.com:8080',
          },
        },

        {
          type: 'text',
          name: 'proxyPort',
          admin: {
            placeholder: 'http://username:password@proxy.example.com:8080',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Account Pool',
      fields: [
        {
          type: 'upload',
          relationTo: 'files',
          name: 'accounts',
          hasMany: false,
          admin: {
            description:
              'Upload a CSV of accounts to be used for browser automation, will overwrite any pre-existing list.',
          },
        },
      ],
    },
  ],
}
