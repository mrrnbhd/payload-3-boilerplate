import { betterAuthPluginOptions } from '@/lib/auth/options'

import formPlugin from 'extra/plugins/form-plugin'
import type { Plugin } from 'payload'
import { auditorPlugin } from 'payload-auditor'
import { betterAuthPlugin } from 'payload-auth/better-auth'
import { s3StoragePluginPrivate, s3StoragePluginPublic } from './s3-storage-plugin'
import { seoPlugin } from './seo-plugin'

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
          slug: 'tasks',
          hooks: {
            afterOperation: {
              create: {
                enabled: true,
              },
              update: {
                enabled: true,
              },
              delete: {
                enabled: true,
              },
              deleteByID: {
                enabled: true,
              },
              updateByID: {
                enabled: true,
              },
            },
          },
        },
        {
          slug: 'jobs',
          hooks: {
            afterOperation: {
              create: {
                enabled: true,
              },
              update: {
                enabled: true,
              },
              delete: {
                enabled: true,
              },
              deleteByID: {
                enabled: true,
              },
              updateByID: {
                enabled: true,
              },
            },
          },
        },
        {
          slug: 'orders',
          hooks: {
            afterOperation: {
              create: {
                enabled: true,
              },
              update: {
                enabled: true,
              },
              delete: {
                enabled: true,
              },
              deleteByID: {
                enabled: true,
              },
              updateByID: {
                enabled: true,
              },
            },
          },
        },
        {
          slug: 'accounts',
          hooks: {
            afterOperation: {
              create: {
                enabled: true,
              },
              update: {
                enabled: true,
              },
              delete: {
                enabled: true,
              },
              deleteByID: {
                enabled: true,
              },
              updateByID: {
                enabled: true,
              },
            },
          },
        },
      ],
    },
  }),
]
