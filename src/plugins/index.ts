import { betterAuthPluginOptions } from '@/lib/auth/options'

import { importExportPlugin } from '@payloadcms/plugin-import-export'
import type { Plugin } from 'payload'
import { auditorPlugin } from 'payload-auditor'
import { betterAuthPlugin } from 'payload-auth/better-auth'
import { isAdmin } from '@/access/admin'
import { s3StoragePluginPrivate } from './s3-storage-plugin'

export const plugins: Plugin[] = [
  betterAuthPlugin(betterAuthPluginOptions),
  importExportPlugin({
    collections: ['orders', 'tags', 'users', 'uploads'],
  }),
  s3StoragePluginPrivate,
  auditorPlugin({
    enabled: true,
    collection: {
      configureRootCollection: (defaults) => {
        const prevConf = defaults
        return {
          ...prevConf,
          access: {
            read: isAdmin,
            update: isAdmin,
            create: isAdmin,
            delete: isAdmin,
          },
          admin: {
            group: 'Operation',
          },
          labels: {
            singular: 'Log',
            plural: 'Logs',
          },
        }
      },
      trackCollections: [
        {
          slug: 'users',
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
        {
          slug: 'verifications',
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
          slug: 'invitations',
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
          slug: 'uploads',
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
          slug: 'tags',
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
          slug: 'settings',
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
