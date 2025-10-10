import type { CollectionConfig } from 'payload'

export const Handbook: CollectionConfig = {
  slug: 'handbook',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Handbook Entry',
    plural: 'Handbook',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
    {
      type: 'relationship',
      name: 'tags',
      relationTo: 'tags',
    },
  ],
}
