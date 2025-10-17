import type { CollectionConfig } from 'payload'

export const Proxies: CollectionConfig = {
  slug: 'proxies',
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
