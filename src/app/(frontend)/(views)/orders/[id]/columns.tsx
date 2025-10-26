import type { ColumnDef } from '@tanstack/react-table'
import type { Order } from '@/payload-types'

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Document ID',
  },

  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
  },
  {
    accessorKey: 'marketplace',
    header: 'Marketplace',
  },
  {
    accessorKey: 'venue',
    header: 'Venue',
  },
  { accessorKey: 'eventOrPerformerName', header: 'Event/Performer' },
  {
    accessorKey: 'location',
    header: 'Parking Location',
  },
  {
    accessorKey: 'vendor',
    header: 'Parking Vendor',
  },
  {
    accessorKey: 'link',
    header: 'Purchase Link',
  },

  {
    accessorKey: 'orderValue',
    header: 'Order Value',
  },

  {
    accessorKey: 'orderLink',
    header: 'Order Link',
  },

  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
]
