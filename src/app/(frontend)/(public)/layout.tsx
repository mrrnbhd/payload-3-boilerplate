import '../globals.css'

import type { Metadata } from 'next'
import { headers } from 'next/headers'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

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
  const headersList = await headers()
  const url = headersList.get('referer') || headersList.get('x-url') || ''
  const pathname = new URL(url, getServerSideURL()).pathname

  const isAdminDashboardRoute = pathname.startsWith('/orders/') || pathname.startsWith('/tasks/')

  return isAdminDashboardRoute ? (
    <div>{children}</div>
  ) : (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
