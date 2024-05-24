import { Button, ButtonVariant } from './Button.js'

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
    } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      return [
        1,
        'left-ellipsis',
        ...range(totalPages - (3 + 2 * siblingCount) + 1, totalPages),
      ]
    } else {
      return [
        1,
        'left-ellipsis',
        ...range(leftSiblingIndex, rightSiblingIndex),
        'right-ellipsis',
        totalPages,
      ]
    }
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

  const renderButton = (page: number | string, index: number) => {
    if (typeof page === 'string') {
      return (
        <Button
          variant={ButtonVariant.Secondary}
          key={index}
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
        variant={
          isCurrentPage ? ButtonVariant.Primary : ButtonVariant.Secondary
        }
        key={index}
        onClick={() => onPageChange(page)}
        aria-current={isCurrentPage ? 'page' : undefined}
        isSquare
      >
        {page}
      </Button>
    )
  }

  return (
    <div className="flex gap-[8px] flex-wrap">
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => isFirstPage || onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        isSquare
      >
        <PreviousIcon />
      </Button>
      {paginationRange().map(renderButton)}
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => isLastPage || onPageChange(currentPage + 1)}
        disabled={isLastPage}
        isSquare
      >
        <NextIcon />
      </Button>
    </div>
  )
}

const PreviousIcon = () => (
  <svg
    width="9"
    height="14"
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.94219 12.8078C8.00026 12.8659 8.04632 12.9348 8.07775 13.0107C8.10918 13.0866 8.12535 13.1679 8.12535 13.25C8.12535 13.3321 8.10918 13.4135 8.07775 13.4893C8.04632 13.5652 8.00026 13.6341 7.94219 13.6922C7.88412 13.7503 7.81518 13.7963 7.73931 13.8278C7.66344 13.8592 7.58213 13.8754 7.5 13.8754C7.41788 13.8754 7.33656 13.8592 7.26069 13.8278C7.18482 13.7963 7.11588 13.7503 7.05782 13.6922L0.807816 7.4422C0.749705 7.38415 0.703606 7.31522 0.672154 7.23935C0.640701 7.16348 0.624512 7.08215 0.624512 7.00001C0.624512 6.91788 0.640701 6.83655 0.672154 6.76067C0.703606 6.6848 0.749705 6.61587 0.807816 6.55782L7.05782 0.307824C7.17509 0.190549 7.33415 0.124664 7.5 0.124664C7.66586 0.124664 7.82492 0.190549 7.94219 0.307824C8.05947 0.4251 8.12535 0.584159 8.12535 0.750012C8.12535 0.915864 8.05947 1.07492 7.94219 1.1922L2.1336 7.00001L7.94219 12.8078Z"
      fill="#252525"
    />
  </svg>
)

const NextIcon = () => (
  <svg
    width="9"
    height="14"
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.19205 7.4422L1.94205 13.6922C1.88398 13.7503 1.81504 13.7963 1.73917 13.8278C1.6633 13.8592 1.58198 13.8754 1.49986 13.8754C1.41774 13.8754 1.33642 13.8592 1.26055 13.8278C1.18468 13.7963 1.11574 13.7503 1.05767 13.6922C0.999603 13.6341 0.95354 13.5652 0.922113 13.4893C0.890687 13.4135 0.874512 13.3321 0.874512 13.25C0.874512 13.1679 0.890687 13.0866 0.922113 13.0107C0.95354 12.9348 0.999603 12.8659 1.05767 12.8078L6.86627 7.00001L1.05767 1.1922C0.940396 1.07492 0.874512 0.915864 0.874512 0.750012C0.874512 0.584159 0.940396 0.4251 1.05767 0.307824C1.17495 0.190549 1.33401 0.124664 1.49986 0.124664C1.66571 0.124664 1.82477 0.190549 1.94205 0.307824L8.19205 6.55782C8.25016 6.61587 8.29626 6.6848 8.32771 6.76067C8.35916 6.83655 8.37535 6.91788 8.37535 7.00001C8.37535 7.08215 8.35916 7.16348 8.32771 7.23935C8.29626 7.31522 8.25016 7.38415 8.19205 7.4422Z"
      fill="#252525"
    />
  </svg>
)
