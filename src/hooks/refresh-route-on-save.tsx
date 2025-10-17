'use client'
import { useRouter } from 'next/navigation.js'
import type React from 'react'

import { RefreshRouteOnSave as LivePreview } from '@payloadcms/live-preview-react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  return (
    <LivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL as string}
    />
  )
}
