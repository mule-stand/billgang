import { useAtom, useCtx } from '@reatom/npm-react'
import React from 'react'
import { getOrders, pageNumberAtom } from './model.js'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'

export const Orders = () => {
  const ctx = useCtx()
  const [orders] = useAtom(getOrders.dataAtom)
  const [pageNumber] = useAtom(pageNumberAtom)

  if (!orders) return <LoadingSpinner />
  return (
    <div>
      <div>Orders</div>
      <div className="grid gap-x-[40px] grid-cols-[auto_repeat(5,minmax(0,1fr))]">
        <div>Invoice ID</div>
        <div>Status</div>
        <div>Value</div>
        <div>Payment</div>
        <div>Date</div>
        <div>Review</div>
        {orders.list.map((item) => (
          <React.Fragment key={item.id}>
            <div>{item.id}</div>
            <div>{item.status}</div>
            <div>{item.price.amount}</div>
            <div>{item.gatewayName}</div>
            <div>{item.time}</div>
            <div>{item.review ? item.review.rating : 'None'}</div>
          </React.Fragment>
        ))}
      </div>
      <div onClick={() => pageNumberAtom(ctx, (page) => page - 1)}>page-1</div>
      <div>
        {pageNumber}/{orders.totalCount}
      </div>
      <div onClick={() => pageNumberAtom(ctx, (page) => page + 1)}>page+1</div>
    </div>
  )
}
