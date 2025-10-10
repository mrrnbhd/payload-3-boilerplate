import { getServerSideURL } from '@/lib/payload'
import type { CollectionConfig, Data } from 'payload'
import { pagesContentTab } from './content'
import { pagesMetaTab } from './meta'
import { pagesHelpTab } from './help'
import { slugField } from '@/fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  trash: true,
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
        return `${getServerSideURL()}/pages/${data.title}?draft=true`
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
