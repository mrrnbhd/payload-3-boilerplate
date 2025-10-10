import type { Block, Data } from 'payload'

export const DataBlock: Block = {
  slug: 'DataBlock',
  interfaceName: 'DataBlock',
  imageURL: '/images/blocks/media-block.png',
  fields: [
    {
      name: 'Selection',
      type: 'group',
      virtual: true,
      fields: [
        {
          name: 'selections',
          type: 'array',
          fields: [
            {
              name: 'selectionType',
              type: 'select',
              options: ['Static', 'Dynamic', 'Input', 'UI'],
            },
            {
              name: 'staticData',
              type: 'array',
              admin: {
                condition: (_, siblingData) => {
                  if (siblingData.selectionType === 'Static') {
                    return true
                  } else {
                    return false
                  }
                },
              },
              fields: [
                {
                  name: 'dataType',
                  type: 'select',
                  options: ['Text', 'Number', 'Email', 'Phone', 'Date Time', 'Location'],
                },
                {
                  name: 'textData',
                  type: 'text',
                },
              ],
            },
            {
              name: 'dynamicData',
              type: 'array',
              admin: {
                condition: (_, siblingData) => {
                  if (siblingData.selectionType === 'Dynamic') {
                    return true
                  } else {
                    return false
                  }
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'collections',
                      type: 'select',
                      hasMany: true,
                      options: [
                        'Courses',
                        'Tournaments',
                        'Members',
                        'Credits',
                        'Invoices',
                        'Payment Methods',
                        'Folders',
                        'Files',
                        'Jobs',
                        'Logs',
                      ],
                    },
                    {
                      name: 'documents',
                      type: 'relationship',
                      hasMany: true,
                      relationTo: [
                        'accounts',
                        'users',
                        'payload-folders',
                        'payload-jobs',
                        'blog',
                        'admin-invitations',
                        'payload-uploads',
                        'private-uploads',
                      ],
                    },
                    {
                      name: 'fields',
                      type: 'select',
                      hasMany: true,
                      options: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
