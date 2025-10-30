import type { GlobalConfig } from 'payload'
import { csvToJson } from './hooks/csv-to-json'

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
          required: true,
          admin: {
            description:
              'Upload a CSV of accounts to be used for browser automation, will overwrite any pre-existing list.',
          },
          hooks: {
            afterChange: [
              async ({ siblingData, req, value, previousValue }) => {
                if (value && value !== previousValue) {
                  const csvDocument = await req.payload.findByID({
                    collection: 'files',
                    id: value,
                  })
                  if (csvDocument.url) {
                    try {
                      const response = await fetch(`${csvDocument.url}`)

                      if (!response.ok) {
                        req.payload.logger.error(
                          `Failed to fetch file from S3/MinIO: ${response.statusText}`
                        )
                      }

                      const csvDataString = await response.text()

                      const parsedCsv = await csvToJson(csvDataString)

                      siblingData.accountData = parsedCsv
                    } catch (error) {
                      req.payload.logger.error(`Error processing file from S3: ${error}`)
                    }
                  }
                }
              },
            ],
          },
        },
        {
          type: 'json',
          name: 'accountData',
          required: true,
          admin: {
            hidden: false,
            readOnly: false,
            maxHeight: 3000,
          },
        },
      ],
    },
  ],
}
