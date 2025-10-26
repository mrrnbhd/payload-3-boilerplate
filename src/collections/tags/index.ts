import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  enableQueryPresets: true,
  trash: true,
  folders: true,
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
