import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Access',
  },

  auth: true,
  fields: [
    {
      type: 'select',
      name: 'userRole',
      options: ['User', 'Admin'],
    },
  ],
}
