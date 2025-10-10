import type { CollectionConfig } from 'payload'

export const Pools: CollectionConfig = {
  slug: 'pools',
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
