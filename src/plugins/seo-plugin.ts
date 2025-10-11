import { getServerSideURL } from '@/lib/payload'

import { seoPlugin as seoPluginConfig } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'
import type { Page } from '@/payload-types'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.meta?.title ? `${doc.meta?.title} | Ticketer` : 'Ticketer'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const seoPlugin: Plugin = seoPluginConfig({
  generateTitle,
  generateURL,
})
