import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Access',
  },

  auth: true,
  fields: [
    {
      type: 'select',
      name: 'userRole',
      options: ['Operator', 'Admin'],
    },
  ],
}
