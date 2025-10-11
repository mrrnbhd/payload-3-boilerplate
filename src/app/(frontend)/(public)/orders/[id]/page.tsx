import { notFound } from 'next/navigation'

import { RefreshRouteOnSave } from '@/hooks/refresh-route-on-save'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Order } from '@/payload-types'

interface OrderParams {
  params: Promise<{
    id?: string
  }>
}

export default async function Orders({ params: paramsPromise }: OrderParams) {
  const { id = 'index' } = await paramsPromise

  const payload = await getPayload({ config })

  const order = await payload.find({
    collection: 'orders',
    draft: true,
    trash: true,
    depth: 3,
    limit: 1,
    where: {
      id: {
        equals: id,
      },
    },
  })

  const data = order?.docs?.[0] as null | Order

  if (data === null) {
    return notFound()
  }

  return (
    <div className="m-5">
      <RefreshRouteOnSave />
      <div>
        <p>Automation Panel Placeholder</p>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const ordersRes = await payload.find({
    collection: 'orders',
    depth: 0,
    draft: true,
    limit: 100,
  })

  const orders = ordersRes?.docs

  return orders.map(({ id }) =>
    id !== 'index'
      ? {
          id,
        }
      : {}
  )
}
