import { LoadingSpinner } from './LoadingSpinner.js'
import { Pagination } from './Pagination.js'

interface ContentWithPaginationProps {
  children: React.ReactNode
  pending: boolean
  data: { list: { length: number }; totalCount: number } | null
  currentPage: number
  setCurrentPage: (page: number) => void
  getPaginationText: (current: number, total: number) => string
  PageSize: number
}

export const ContentWithPagination: React.FC<ContentWithPaginationProps> = ({
  children,
  pending,
  data,
  currentPage,
  setCurrentPage,
  getPaginationText,
  PageSize,
}) => {
  if (pending && !data?.list) {
    return <LoadingSpinner />
  }

  if (data && data.list.length > 0) {
    return (
      <>
        {children}
        <div className="flex h-[72px] align-middle justify-between px-[16px] mt-auto col-span-full">
          <div className="text-textSecondary flex-center">
            {getPaginationText(currentPage, data.totalCount)}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.totalCount / PageSize)}
            onPageChange={setCurrentPage}
          />
        </div>
      </>
    )
  }

  return <div>No items</div>
}
