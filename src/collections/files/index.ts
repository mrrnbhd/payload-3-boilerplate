import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Files: CollectionConfig = {
  slug: 'files',
  enableQueryPresets: true,
  folders: true,
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  access: {
    update: authenticated,
    read: authenticated,
  },
  admin: {
    group: 'Operation',
  },
  fields: [
    {
      name: 'notes',
      type: 'textarea',
      label: 'File Notes',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      label: 'File Tags',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
