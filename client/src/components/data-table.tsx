import DataPagination from './data-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined | null
  total: number | undefined
  pageFunction: any
}

export interface InitialPaginationState {
  pageIndex: number
  pageSize: number
}

export function DataTable<TData, TValue>({ columns, data, total, pageFunction }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<InitialPaginationState>({
    pageIndex: 0,
    pageSize: 50
  })

  const table = useReactTable({
    data: data ?? Array(30).fill({}),
    columns,
    manualPagination: true,
    rowCount: total,
    state: { pagination },
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='flex flex-col gap-5'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead style={{ textAlign: header.column.columnDef.meta?.style.textAlign }} key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell align={cell.column.columnDef.meta?.style.textAlign} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-32 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataPagination table={table} pagination={pagination} setPagination={setPagination} pageFunction={pageFunction} />
    </div>
  )
}
