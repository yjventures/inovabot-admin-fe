'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { IParams } from '@/types/common/IParams'
import { IMetadata } from '@/types/common/IResponse'

interface Props {
  metadata: IMetadata
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
}

export default function TablePagination({ metadata, params, setparams }: Props) {
  const { totalDocuments, currentPage, totalPages } = { ...metadata }

  const generatePageNumbers = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else if (totalPages >= 10) {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPages - 2, totalPages - 1, totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, 3, 'ellipsis', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(
          1,
          2,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPages - 1,
          totalPages
        )
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPages - 2, totalPages - 1, totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(
          1,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      }
    }
    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className='w-full flex flex-wrap items-center justify-between gap-2 p-3 bg-foreground'>
      <p className='text-sm font-medium'>
        Showing {Math.max((currentPage - 1) * params.limit + 1, 1)} -{' '}
        {Math.min(currentPage * params.limit, totalDocuments)} of {totalDocuments}
      </p>

      <Pagination className='w-auto'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setparams({ ...params, page: currentPage - 1 })}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {pageNumbers.map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationButton
                  isActive={currentPage === page}
                  onClick={() => setparams({ ...params, page: page as number })}
                >
                  {page}
                </PaginationButton>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => setparams({ ...params, page: currentPage + 1 })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
