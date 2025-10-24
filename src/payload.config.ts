import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Orders } from './collections/orders'
import { Proxies } from './collections/proxies'
import { Profiles } from './collections/profiles'
import { PayloadUploads } from './collections/uploads/payload-uploads'
import { Users } from './collections/users'
import { getEmailAdapter } from './lib/email-adapter'
import { getServerSideURL } from './lib/payload'
import { plugins } from './plugins'
import { Errors } from './collections/errors'

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
          path: '@/components/payload/admin-icon.tsx',
        },
        Logo: {
          path: '@/components/payload/admin-logo.tsx',
        },
      },
    },
  },
  folders: {
    browseByFolder: true,
    collectionSpecific: false,
  },
  email: getEmailAdapter(),
  collections: [Orders, Errors, Proxies, Profiles, Users, PayloadUploads],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
  }),
  cors: [getServerSideURL()].filter(Boolean),
  sharp,
  plugins,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
})
