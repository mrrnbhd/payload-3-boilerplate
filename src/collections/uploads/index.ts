import type { CollectionConfig } from 'payload'

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  enableQueryPresets: true,
  trash: true,
  folders: true,
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Operation',
  },
  fields: [
    {
      name: 'File Notes',
      type: 'textarea',
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
