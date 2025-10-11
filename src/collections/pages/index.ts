import { getServerSideURL } from '@/lib/payload'

import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { pagesContentTab } from './content'
import { pagesHelpTab } from './help'
import { pagesMetaTab } from './meta'

export const Pages: CollectionConfig = {
  slug: 'pages',
  enableQueryPresets: true,
  folders: true,
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        return `${getServerSideURL()}/pages/${data.slug}?draft=true`
      },
    },
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
    {
      type: 'relationship',
      name: 'tags',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        ...pagesContentTab,
        {
          label: '❯ Routes',
          fields: [],
        },
        ...pagesMetaTab,
        ...pagesHelpTab,
      ],
    },
  ],
}
