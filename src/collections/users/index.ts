import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  enableQueryPresets: true,
  folders: true,
  access: {
    read: isAdmin,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Access',
  },
  fields: [],
}
