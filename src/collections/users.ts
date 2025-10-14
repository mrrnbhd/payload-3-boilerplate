import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Operator',
    plural: 'Operators',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Access',
  },

  auth: true,
  fields: [
    {
      type: 'select',
      name: 'operatorRole',
      options: ['Bot', 'User', 'Admin'],
    },
  ],
}
