import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Tags: CollectionConfig = {
  slug: 'tags',
  enableQueryPresets: true,
  trash: true,
  folders: true,
  access: {
    update: authenticated,
    read: authenticated,
  },
  admin: {
    group: 'Operation',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Tag Name',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Tag Description',
      admin: {
        position: 'sidebar',
        rows: 7,
      },
    },
    {
      type: 'join',
      name: 'Tag Links',
      collection: 'orders',
      on: 'tags',
      admin: {
        allowCreate: true,
      },
    },
  ],
}
