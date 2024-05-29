import { NextIcon, PreviousIcon } from '../assets/icons.js'
import { Button } from './button.js'
export type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  if (totalPages < 2) return null

  const range = (from: number, to: number) => {
    const range: number[] = []
    for (let i = from; i <= to; i++) range.push(i)
    return range
  }

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 3 + 2
    if (totalPages <= totalPageNumbers) return range(1, totalPages)

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
    const shouldShowLeftEllipsis = leftSiblingIndex > 2
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      return [...range(1, 3 + 2 * siblingCount), 'right-ellipsis', totalPages]
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      return [
        1,
        'left-ellipsis',
        ...range(totalPages - (3 + 2 * siblingCount) + 1, totalPages),
      ]
    }
    return [
      1,
      'left-ellipsis',
      ...range(leftSiblingIndex, rightSiblingIndex),
      'right-ellipsis',
      totalPages,
    ]
  }

  const handleEllipsisClick = (isLeft: boolean) => {
    const offset = siblingCount * 2 + 1
    onPageChange(
      isLeft
        ? Math.max(currentPage - offset, 1)
        : Math.min(currentPage + offset, totalPages),
    )
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const renderButton = (page: number | string) => {
    if (typeof page === 'string') {
      return (
        <Button
          variant="secondary"
          key={page}
          onClick={() => handleEllipsisClick(page === 'left-ellipsis')}
          isSquare
        >
          …
        </Button>
      )
    }

    const isCurrentPage = page === currentPage
    return (
      <Button
        variant={isCurrentPage ? 'primaryRounded' : 'secondary'}
        key={page}
        onClick={() => onPageChange(page)}
        aria-current={isCurrentPage ? 'page' : undefined}
        isSquare
      >
        {page}
      </Button>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="secondary"
        onClick={() => isFirstPage || onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        isSquare
      >
        <PreviousIcon />
      </Button>
      {paginationRange().map(renderButton)}
      <Button
        variant="secondary"
        onClick={() => isLastPage || onPageChange(currentPage + 1)}
        disabled={isLastPage}
        isSquare
      >
        <NextIcon />
      </Button>
    </div>
  )
}
