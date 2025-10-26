import { Suspense } from 'react'

import { RefreshRouteOnSave } from '@/hooks/refresh-route-on-save'
import config from '@payload-config'
import { getPayload, type PaginatedDocs } from 'payload'
import type { Order } from '@/payload-types'
import { columns } from './columns'
import { DataTable } from './table'

export default async function Orders() {
  const payload = await getPayload({ config })

  const orders: PaginatedDocs<Order> = await payload.find({
    collection: 'orders',
    draft: true,
    trash: true,
    limit: 0,
  })

  return (
    <Suspense>
      <div className="m-0 p-5">
        <RefreshRouteOnSave />
        <br />
        <DataTable data={orders.docs} columns={columns}></DataTable>
      </div>
    </Suspense>
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
