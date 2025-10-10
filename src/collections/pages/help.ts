import { Tab } from 'payload'

export const pagesHelpTab: Tab[] = [
  {
    label: '🕮 Help',
    fields: [
      {
        type: 'join',
        virtual: true,
        name: 'pageHelp',
        collection: 'handbook',
        on: 'tags',
        where: {
          tags: {
            contains: 'Page Help',
          },
        },
      },
    ],
  },
]
