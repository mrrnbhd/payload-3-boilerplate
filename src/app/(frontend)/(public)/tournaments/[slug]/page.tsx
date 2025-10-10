import { RefreshRouteOnSave } from '@/hooks/refresh-route-on-save'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Tournament } from '@/payload-types'
import { notFound } from 'next/navigation'
import { DataTable } from '@/components/data-table'

interface TournamentParams {
  params: Promise<{
    title?: string
  }>
}

export default async function Tournaments({ params: paramsPromise }: TournamentParams) {
  const { title = 'index' } = await paramsPromise

  const payload = await getPayload({ config })

  const tournament = await payload.find({
    collection: 'tournaments',
    draft: true,
    trash: true,
    depth: 3,
    limit: 1,
    where: {
      title: {
        equals: title,
      },
    },
  })

  const data = tournament?.docs?.[0] as null | Tournament

  if (data === null) {
    return notFound()
  }

  return (
    <div className="m-5">
      <RefreshRouteOnSave />
      <DataTable />
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pagesRes = await payload.find({
    collection: 'tournaments',
    depth: 0,
    draft: true,
    limit: 100,
  })

  const pages = pagesRes?.docs

  return pages.map(({ title }) =>
    title !== 'index'
      ? {
          title,
        }
      : {}
  )
}
