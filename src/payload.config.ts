import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { isAdmin } from './access/admin'
import { Files } from './collections/files'
import { Orders } from './collections/orders'
import { Settings } from './collections/settings'
import { Tags } from './collections/tags'
import { Users } from './collections/users'
import { getEmailAdapter } from './lib/email/email-adapter'
import { getServerSideURL } from './lib/payload'
import { plugins } from './plugins'
import { taskConfigs } from './tasks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    components: {
      graphics: {
        Icon: {
          path: '@/components/admin-icon.tsx',
        },
        Logo: {
          path: '@/components/admin-logo.tsx',
        },
      },
    },
  },
  folders: {
    browseByFolder: true,
    collectionSpecific: false,
  },
  email: getEmailAdapter(),
  collections: [Orders, Files, Tags, Users],
  globals: [Settings],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    idType: 'uuid',
  }),
  jobs: {
    tasks: taskConfigs,
    autoRun: [
      {
        cron: '* 0/5 * * * *',
        limit: 5,
        allQueues: true,
      },
    ],
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {}
      }

      defaultJobsCollection.admin.hidden = false
      defaultJobsCollection.admin.group = 'Operation'
      defaultJobsCollection.labels = {
        singular: 'Job',
        plural: 'Jobs',
      }
      defaultJobsCollection.access = {
        read: isAdmin,
        update: isAdmin,
        create: isAdmin,
        delete: isAdmin,
      }
      defaultJobsCollection.enableQueryPresets = true
      defaultJobsCollection.folders = true
      return defaultJobsCollection
    },
  },
  cors: [getServerSideURL()].filter(Boolean),
  sharp,
  plugins,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
})
