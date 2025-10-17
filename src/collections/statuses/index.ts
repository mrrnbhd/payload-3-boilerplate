import type { CollectionConfig } from 'payload'

export const Statuses: CollectionConfig = {
  slug: 'statuses',
  labels: {
    singular: 'Status',
    plural: 'Statuses',
  },
  admin: {
    group: 'Library',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
  ],
}
