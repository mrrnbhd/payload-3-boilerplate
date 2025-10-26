'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const router = useRouter()

  const navigateTo = useCallback(
    (href?: string) => {
      if (!href) return
      if (typeof window !== 'undefined' && window.self !== window.top) {
        try {
          //@ts-expect-error
          window.top.location.href = href
          return
        } catch {
          router.push(href)
          return
        }
      }
      router.push(href)
    },
    [router]
  )

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent, href?: string) => {
      if (!href) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        navigateTo(href)
      }
    },
    [navigateTo]
  )

  const visibleColumnsCount =
    columns.filter((col: any) => (col.id ?? col.accessorKey) !== 'id').length || columns.length

  return (
    <div className="overflow-hidden m-0 p-0">
      <Table className="rounded-md m-0 p-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            const visibleHeaders = headerGroup.headers.filter(
              (h) => !h.isPlaceholder && h.id !== 'id'
            )

            if (visibleHeaders.length === 0) return null

            return (
              <TableRow key={headerGroup.id}>
                {visibleHeaders.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const idValue = row.getValue('id') as string | number | undefined
              const href = idValue != null ? `/admin/collections/orders/${idValue}` : undefined

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={href ? 'cursor-pointer' : undefined}
                  onClick={() => navigateTo(href)}
                  tabIndex={href ? 0 : undefined}
                  onKeyDown={(e) => handleRowKeyDown(e, href)}
                >
                  {row
                    .getVisibleCells()
                    .filter((c) => c.column.id !== 'id')
                    .map((c) => (
                      <TableCell key={c.id}>
                        {flexRender(c.column.columnDef.cell, c.getContext())}
                      </TableCell>
                    ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={visibleColumnsCount} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
