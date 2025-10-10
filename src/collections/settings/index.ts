import type { CollectionConfig, GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Library',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🗲 Features',
          fields: [],
        },
                                {
          label: '🌫 Themes',
          fields: [],
        },
                {
          label: '⚙ Integrations',
          fields: [],
        },

        {
              label: '🕮 Help',
              fields: [],
        }

      ],
    },
    {
      type: 'text',
      name: 'title',
    },
  ],
}
