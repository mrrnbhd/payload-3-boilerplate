import type { Metadata } from 'next'

import { getServerSideURL } from './get-url'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'ticketer. A better way to manage your business.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.png`,
    },
  ],
  siteName: 'Ticketer',
  title: 'Ticketer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
