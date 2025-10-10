import { betterAuthPluginOptions } from '@/lib/auth/options'

import type { Plugin } from 'payload'
import { betterAuthPlugin } from 'payload-auth/better-auth'
import { s3StoragePluginPrivate, s3StoragePluginPublic } from './s3-storage-plugin'
import { seoPlugin } from './seo-plugin'
import formPlugin from 'extra/plugins/form-plugin'
import { auditorPlugin } from 'payload-auditor'

export const plugins: Plugin[] = [
  betterAuthPlugin(betterAuthPluginOptions),
  seoPlugin,
  formPlugin,
  s3StoragePluginPublic,
  s3StoragePluginPrivate,
  auditorPlugin({
    enabled: true,
    collection: {
      configureRootCollection: (defaults) => {
        const prevConf = defaults
        return {
          ...prevConf,
          admin: {
            group: 'Library',
          },
          labels: {
            singular: 'Log',
            plural: 'Logs',
          },
        }
      },
      trackCollections: [
        {
          slug: 'accounts',
          hooks: {
            afterChange: {
              update: {
                enabled: true,
              },
            },
          },
        },
      ],
    },
  }),
]
