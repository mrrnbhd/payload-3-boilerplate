import type { Tab } from 'payload'
import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/media-block/config'
import { GalleryBlock } from '@/blocks/gallery-block/config'
import { ContentBlock } from '@/blocks/content-block/config'
import { DataBlock } from '@/blocks/data-block/config'

export const pagesContentTab: Tab[] = [
  {
    label: '☰ Content',
    fields: [
      {
        name: 'heroImage',
        type: 'upload',
        relationTo: 'payload-uploads',
      },
      {
        name: 'content',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              HeadingFeature({
                enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
              }),
              BlocksFeature({
                blocks: [MediaBlock, GalleryBlock, ContentBlock, DataBlock],
              }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              HorizontalRuleFeature(),
              UnorderedListFeature(),
              OrderedListFeature(),
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              AlignFeature(),
            ]
          },
        }),
        label: false,
        required: true,
      },
    ],
  },
]
