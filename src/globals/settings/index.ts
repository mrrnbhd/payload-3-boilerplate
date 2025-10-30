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
      type: 'text',
      name: 'proxyServer',
      admin: {
        placeholder: 'http://username:password@proxy.example.com:8080',
      },
    },
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
}
