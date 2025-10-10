import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Collections',
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
