import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Tab } from 'payload'

export const pagesMetaTab: Tab[] = [
  {
    name: 'meta',
    label: '🛈 Meta',
    fields: [
      OverviewField({
        titlePath: 'meta.title',
        descriptionPath: 'meta.description',
        imagePath: 'meta.image',
      }),
      MetaTitleField({
        hasGenerateFn: true,
      }),
      MetaImageField({
        relationTo: 'payload-uploads',
      }),

      MetaDescriptionField({}),
      PreviewField({
        // if the `generateUrl` function is configured
        hasGenerateFn: true,

        // field paths to match the target field for data
        titlePath: 'meta.title',
        descriptionPath: 'meta.description',
      }),
    ],
  },
]
