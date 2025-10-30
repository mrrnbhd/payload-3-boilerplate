import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/admin'
import { csvToJson } from './hooks/csv-to-json'
import { accountDataSchema as jsonSchema } from './schemas/account-data'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    update: isAdmin,
    read: isAdmin,
  },
  admin: {
    group: 'Operation',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Proxy Pool',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'text',
          name: 'proxyLogin',
          required: true,
          defaultValue: '',
          admin: {
            width: '30%',
          },
        },
        {
          type: 'text',
          name: 'proxyPassword',
          defaultValue: '',
          required: true,
          admin: {
            width: '30%',
          },
        },
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'proxyHost',
              defaultValue: '',
              required: true,
              admin: {
                width: '70%',
              },
            },
            {
              type: 'number',
              name: 'proxyPort',
              defaultValue: 10000,
              required: true,
              admin: {
                width: '30%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Account Pool',
      fields: [
        {
          type: 'json',
          name: 'accountData',
          admin: {
            hidden: false,
            readOnly: false,
            maxHeight: 500,
          },
          jsonSchema,
        },
        {
          type: 'upload',
          relationTo: 'files',
          name: 'accountUploader',
          hasMany: false,
          admin: {
            description:
              'Upload a CSV of accounts to be used for browser automation, will overwrite any pre-existing account data.',
          },
          hooks: {
            beforeChange: [csvToJson],
          },
        },
      ],
    },
  ],
}
