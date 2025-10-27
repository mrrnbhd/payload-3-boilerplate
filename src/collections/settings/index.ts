import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Operation',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'upload',
      relationTo: 'files',
      name: 'browserProfiles',
      hasMany: true,
    },
  ],
}
