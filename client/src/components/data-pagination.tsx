import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Table } from '@tanstack/react-table'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import { Button } from './ui/button'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { InitialPaginationState } from './data-table'

interface DataPaginationProps {
  table: Table<any>
  pagination: InitialPaginationState
  setPagination: Dispatch<SetStateAction<InitialPaginationState>>
  pageFunction: any
}

const DEFAULT_JUMP_PAGE = 5

export default function DataPagination({ table, pageFunction, pagination, setPagination }: DataPaginationProps) {
  const currentPageIndex = pagination.pageIndex

  const firstPageIndex = table.getPageOptions()[0]

  const lastPageIndex = table.getPageCount() - 1

  const options = useMemo(() => {
    return table.getPageOptions()
  }, [currentPageIndex])

  const [jumpPage, setJumpPage] = useState({
    startIndex: 2,
    endIndex: 7
  })

  const isCurrentPage = (condition: boolean) => {
    return condition ? 'border-primary text-primary hover:bg-transparent hover:text-primary' : ''
  }

  const handleJumpPage = (jump: number = DEFAULT_JUMP_PAGE) => {
    setJumpPage((prev) => {
      let newStartIndex = prev.startIndex + jump
      let newEndIndex = prev.endIndex + jump

      if (newStartIndex < firstPageIndex + 1) {
        newStartIndex = firstPageIndex + 2
        newEndIndex = firstPageIndex + 7
      }

      if (newEndIndex > lastPageIndex) {
        newEndIndex = lastPageIndex
        newStartIndex = lastPageIndex - DEFAULT_JUMP_PAGE
      }

      table.setPageIndex(Math.floor((newStartIndex + newEndIndex) / 2) - 1)

      pageFunction({
        skip: Math.floor((newStartIndex + newEndIndex) / 2 - 1) * 50
      })

      return {
        startIndex: newStartIndex,
        endIndex: newEndIndex
      }
    })
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setPagination((prev) => {
                pageFunction({
                  categorySlug: 'all-code-essentials',
                  limit: 50,
                  skip: (prev.pageIndex - 1) * 50,
                  filters: {}
                })
                return {
                  ...prev,
                  pageIndex: prev.pageIndex - 1
                }
              })
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <Button
            size='sm'
            className={isCurrentPage(currentPageIndex === firstPageIndex)}
            onClick={() => {
              table.firstPage()
              pageFunction({
                categorySlug: 'all-code-essentials',
                limit: 50,
                skip: 0,
                filters: {}
              })
            }}
            variant={currentPageIndex === firstPageIndex ? 'outline' : 'ghost'}
          >
            {firstPageIndex + 1}
          </Button>
        </PaginationItem>
        <div className={cn('group', jumpPage.startIndex === firstPageIndex + 2 ? 'hidden' : '')}>
          <PaginationItem className='group-hover:hidden'>
            <PaginationLink>
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className='hidden group-hover:block'>
            <PaginationLink onClick={() => handleJumpPage(-DEFAULT_JUMP_PAGE)}>
              <RxDoubleArrowLeft />
            </PaginationLink>
          </PaginationItem>
        </div>
        {options.slice(jumpPage.startIndex, jumpPage.endIndex).map((item) => (
          <PaginationItem key={item}>
            <Button
              size='sm'
              className={isCurrentPage(currentPageIndex + 1 === item)}
              onClick={() => {
                table.setPageIndex(item - 1)
                pageFunction({
                  categorySlug: 'all-code-essentials',
                  limit: 50,
                  skip: (item - 1) * 50,
                  filters: {}
                })
              }}
              variant={currentPageIndex + 1 === item ? 'outline' : 'ghost'}
            >
              {item}
            </Button>
          </PaginationItem>
        ))}
        <div className={cn('group', jumpPage.endIndex === lastPageIndex ? 'hidden' : '')}>
          <PaginationItem className='group-hover:hidden'>
            <PaginationLink>
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className='hidden group-hover:block'>
            <PaginationLink onClick={() => handleJumpPage()}>
              <RxDoubleArrowRight />
            </PaginationLink>
          </PaginationItem>
        </div>
        <PaginationItem>
          <Button
            size='sm'
            className={isCurrentPage(currentPageIndex === lastPageIndex)}
            onClick={() => {
              table.lastPage()
              pageFunction({
                categorySlug: 'all-code-essentials',
                limit: 50,
                skip: (currentPageIndex + 1) * 50,
                filters: {}
              })
            }}
            variant={currentPageIndex === lastPageIndex ? 'outline' : 'ghost'}
          >
            {lastPageIndex}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              // if (currentPageIndex + 2 === jumpPage.endIndex && currentPageIndex !== 64) {
              //   handleJumpPage()
              // }
              console.log('jumpPage', jumpPage)
              console.log('currentPageIndex', currentPageIndex)
              table.nextPage()
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

{
  /* <Button onClick={() => table.firstPageIndex()} disabled={!table.getCanPreviousPage()}>
        {'<<'}
      </Button>
      <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        {'<'}
      </Button>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        {'>'}
      </Button>
      <Button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
        {'>>'}
      </Button>
      <Select
        value={String(table.getState().pagination.pageSize)}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select> */
}
