import type { GlobalConfig } from 'payload'
import { csvToJson } from './hooks/csv-to-json'

export const Settings: GlobalConfig = {
  slug: 'settings',
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
                width: '75%',
              },
            },
            {
              type: 'number',
              name: 'proxyPort',
              defaultValue: 10000,
              required: true,
              admin: {
                width: '25%',
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
        {
          type: 'json',
          name: 'accountData',
          admin: {
            hidden: false,
            readOnly: false,
            maxHeight: 500,
          },
          jsonSchema: {
            uri: 'a://b/account-schema.json',
            fileMatch: ['a://b/account-schema.json'],
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['available', 'in-use', 'error', 'used'],
                  },
                },
                first: { type: 'string' },
                last: { type: 'string' },
                pass: { type: 'string' },
                email: { type: 'string' },
                card: { type: 'number' },
                exp: { type: 'string' },
                cvc: { type: 'number' },
                zip: { type: 'number' },
                required: ['email', 'card', 'exp', 'cvc', 'zip', 'status'],
              },
            },
          },
        },
      ],
    },
  ],
}
