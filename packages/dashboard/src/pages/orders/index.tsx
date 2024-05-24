import { useAtom } from '@reatom/npm-react'
import React from 'react'
import {
  getOrders,
  pageNumberAtom,
  getPaginationText,
  PageSize,
} from './model.js'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'
import { Pagination } from '../../common/Pagination.js'
import { IconWrapper } from '../../common/IconWrapper.js'
import { StatusVariant, StatusIndicator } from '../../common/StatusIndicator.js'

import { formatPrice, Price, extractDateAndTime } from '../../utils/index.js'
import { Star } from '../../assets/icons.js'
interface ListItemType {
  children: React.ReactNode
  className?: string
}

interface OrderItem {
  id: string
  status: OrderStatus
  price: Price
  gatewayName: string
  time: string
  review?: {
    rating: number
  }
}

type OrderStatus =
  | 'NEW'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'FULL_DELIVERY_FAILURE'
  | 'PARTIALLY_DELIVERED'
  | 'REFUNDED'
  | 'FAILED'

const statusVariantMap: Record<OrderStatus, StatusVariant> = {
  NEW: 'warning',
  PENDING: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'error',
  EXPIRED: 'error',
  FULL_DELIVERY_FAILURE: 'error',
  PARTIALLY_DELIVERED: 'warning',
  REFUNDED: 'success',
  FAILED: 'error',
}

export const ListItem: React.FC<ListItemType> = ({
  children,
  className = '',
}) => (
  <div
    className={`truncate border-b border-borderDefault p-[16px] pr-[24px] justify-start flex items-center ${className}`}
  >
    {children}
  </div>
)

export const ListTitle: React.FC<ListItemType> = ({ children }) => (
  <ListItem className="text-[14px] text-textSecondary uppercase">
    {children}
  </ListItem>
)

export const Orders = () => {
  const [orders] = useAtom(getOrders.dataAtom)
  const [currentPage, setCurrentPage] = useAtom(pageNumberAtom)
  if (!orders) return <LoadingSpinner />
  return (
    <>
      <div className="m-[8px_0_16px_8px] font-bold text-lg">Orders</div>
      <div className="border border-borderDefault rounded-[16px] flex justify-between flex-col flex-1">
        <div className="grid grid-cols-[auto_repeat(5,minmax(0,min-content))]">
          <ListTitle>Invoice ID</ListTitle>
          <ListTitle>Status</ListTitle>
          <ListTitle>Value</ListTitle>
          <ListTitle>Payment</ListTitle>
          <ListTitle>Date</ListTitle>
          <ListTitle>Review</ListTitle>
          {orders.list.map((item: OrderItem) => {
            const { date, time } = extractDateAndTime(item.time)
            return (
              <React.Fragment key={item.id}>
                <ListItem>{item.id}</ListItem>
                <ListItem>
                  <StatusIndicator
                    status={item.status}
                    variant={statusVariantMap[item.status]}
                  />
                </ListItem>
                <ListItem>{formatPrice(item.price)}</ListItem>
                <ListItem>{item.gatewayName}</ListItem>
                <ListItem>
                  <div>
                    <div>{date}</div>
                    <div className="text-[12px] text-textSecondary">{time}</div>
                  </div>
                </ListItem>
                <ListItem>
                  {item.review ? (
                    <div className="flex-center">
                      <IconWrapper Icon={Star} color="primary" />
                      <div className="ml-[4px]">{item.review.rating}</div>
                    </div>
                  ) : (
                    'None'
                  )}
                </ListItem>
              </React.Fragment>
            )
          })}
        </div>
        <div className="flex h-[72px] align-middle justify-between px-[16px]">
          <div className="text-textSecondary flex-center">
            {getPaginationText(currentPage, orders.totalCount)}
          </div>
          <div className="flex-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(orders.totalCount / PageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}
