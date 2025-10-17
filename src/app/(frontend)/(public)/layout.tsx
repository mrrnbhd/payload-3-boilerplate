import '../globals.css'

import type { Metadata } from 'next'

import { getServerSideURL } from '@/lib/payload'
import { mergeOpenGraph } from '@/lib/payload/merge-open-graph'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    template: '%s | ticketer',
    default: 'Ticketer',
  },
  description: 'Ticketer',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>
}
