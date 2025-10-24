import type { CollectionConfig } from 'payload'

/** All media uploaded from Payload Admin*/
export const PayloadUploads: CollectionConfig = {
  slug: 'payload-uploads',
  folders: true,
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  enableQueryPresets: true,
  trash: true,
  access: {
    read: () => true,
  },
  admin: {
    group: 'Operation',
    description: 'All media uploaded from the admin panel.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
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
