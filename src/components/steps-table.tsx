'use client'

import {
  ArrowUpDown,
  Bot,
  EllipsisVertical,
  Filter,
  MoreHorizontal,
  PlusSquare,
  SquareArrowOutUpRight,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { RainbowButton } from './ui/rainbow-button'

const data: Payment[] = [
  {
    id: '5kma53ae',
    steps: 3,
    status: 'In Progress',
    step: 'Fulfill SpotHero Order #554461',
  },
  {
    id: '3u1reuv4',
    steps: 3,
    status: 'Pending',
    step: 'Fulfill SpotHero Order #554552',
  },
  {
    id: 'm5gr84i9',
    steps: 3,
    status: 'Pending',
    step: 'Fulfill SpotHero Order #514377',
  },

  {
    id: 'derv1ws0',
    steps: 3,
    status: 'Pending',
    step: 'Fulfill SpotHero Order #526222',
  },
  {
    id: 'derv1ws0',
    steps: 3,
    status: 'Pending',
    step: 'Fulfill SpotHero Order #514782',
  },
  {
    id: 'derv1ws0',
    steps: 5,
    status: 'Blocked',
    step: 'Fulfill ACE Parking Order #522552',
  },
  {
    id: 'bhqecj4p',
    steps: 4,
    status: 'Complete',
    step: 'Fulfill ACE Parking Order #512452',
  },
]

export type Payment = {
  id: string
  steps: number
  status: 'Pending' | 'In Progress' | 'Complete' | 'Blocked' | 'Cancelled'
  step: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'step',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Step
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('step')}</div>,
  },
  {
    accessorKey: 'steps',
    header: () => <div className="text-right">Steps</div>,
    cell: ({ row }) => {
      const steps = parseFloat(row.getValue('steps'))

      return <div className="self-end justify-self-end mr-1">1 / {steps}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="w-full flex justify-between">
                <div>Actions</div>
                <div className="flex justify-end gap-1">
                  <PlusSquare
                    size={25}
                    className="hover:cursor-pointer hover:bg-foreground/15 p-1 rounded-sm"
                  />{' '}
                  <SquareArrowOutUpRight
                    size={25}
                    className="hover:cursor-pointer hover:bg-foreground/15 p-1 rounded-sm"
                  />
                </div>
              </DropdownMenuLabel>
              <hr />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy Task Link
              </DropdownMenuItem>
              <DropdownMenuItem>Navigate to This Task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Run This Step's Automation</DropdownMenuItem>
              <DropdownMenuItem>Run This Task's Automations</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export This Task as a PDF</DropdownMenuItem>
              <DropdownMenuItem>Export This Task as a CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export function StepsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full max-h-fill">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search Steps..."
          value={(table.getColumn('step')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('step')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex align-middle">
          <RainbowButton variant={'outline'} className="mr-4">
            Run Automations
            <Bot />
          </RainbowButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filters
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical
                className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                size={32}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="w-full flex justify-between">
                <div>Actions</div>
                <div className="flex justify-end gap-1">
                  <PlusSquare
                    size={25}
                    className="hover:cursor-pointer hover:bg-foreground/15 p-1 rounded-sm"
                  />{' '}
                  <SquareArrowOutUpRight
                    size={25}
                    className="hover:cursor-pointer hover:bg-foreground/15 p-1 rounded-sm"
                  />
                </div>
              </DropdownMenuLabel>
              <div>
                <hr />
                <DropdownMenuItem>Run Selected Steps Automations</DropdownMenuItem>
                <DropdownMenuItem>Run Selected Tasks Automations</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export Selected Steps as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Selected Steps as CSV</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export Selected Tasks as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Selected Tasks as CSV</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
