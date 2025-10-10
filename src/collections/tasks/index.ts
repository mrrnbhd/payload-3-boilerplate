import type { CollectionConfig } from 'payload'

export const Tasks: CollectionConfig = {
  slug: 'Tasks',
  admin: {
    group: 'Workflows',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
  ],
}
