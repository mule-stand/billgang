import { useAtom } from '@reatom/npm-react'
import {
  getTransactions,
  pageNumberAtom,
  getPaginationText,
  PageSize,
} from './model.js'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'
import { Pagination } from '../../common/Pagination.js'
import { IconWrapper } from '../../common/IconWrapper.js'
import { Button, ButtonVariant } from '../../common/Button.js'
import { formatPrice, Price } from '../../utils/index.js'

import { Plus, Minus, Fire, Question, ThreeDots } from '../../assets/icons.js'

enum TransactionStatus {
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
}
interface Transaction {
  id: string
  price: Price
  createdAt: string
  description: string
  status: TransactionStatus
}
const iconStatusMap = {
  [TransactionStatus.ADDED]: Plus,
  [TransactionStatus.REMOVED]: Minus,
}

const symbolStatusMap = {
  [TransactionStatus.ADDED]: '+',
  [TransactionStatus.REMOVED]: '-',
}
const classNamesStatusMap = {
  [TransactionStatus.ADDED]: 'text-successText',
  [TransactionStatus.REMOVED]: 'text-textPrimary',
}
const textStatusMap = {
  [TransactionStatus.ADDED]: 'Added to your balance',
  [TransactionStatus.REMOVED]: 'Payment',
}

const groupTransactionsByDate = (
  transactions: Transaction[],
): Record<string, Transaction[]> => {
  const result: Record<string, Transaction[]> = {}
  const today = new Date()
  const todayString = 'Today'

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.createdAt)
    let groupKey = transactionDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    if (transactionDate.toDateString() === today.toDateString()) {
      groupKey = todayString
    }

    if (!result[groupKey]) {
      result[groupKey] = []
    }

    result[groupKey]!.push(transaction)
  })

  return result
}

export const formatTransactionTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
const test = {
  id: '848f0c54-6ce0-4add-893e-d32326d13915326a0e',
  price: {
    amount: 100,
    currency: 'USD',
  },
  createdAt: '2024-05-27T15:47:42.940087Z',
  description: 'MANUAL',
  status: 'ADDED',
}
export const Balance = () => {
  const [transactions] = useAtom(getTransactions.dataAtom)
  const [currentPage, setCurrentPage] = useAtom(pageNumberAtom)
  if (!transactions) return <LoadingSpinner />
  const groupTransactions = Object.entries(
    groupTransactionsByDate(transactions.list),
  )

  return (
    <>
      <div className="p-[24px] border rounded-[16px] border-borderDefault mb-[16px]">
        <div className="text-sm text-brandDefault py-[8px] px-[12px] flex bg-surface0 rounded-[12px] mb-[16px]">
          <Fire />
          <div className="ml-[8px]">
            Top up your store balance below and get <b>25%</b> back.
          </div>
        </div>
        <div className="text-textSecondary">Your balance</div>
        <div className="flex items-baseline">
          <div className="text-xxl font-bold mr-auto leading-[40px]">$0.00</div>
          <Button className="mr-[16px] flex-center">
            <IconWrapper color="surface100" Icon={Plus} />
            <span className="ml-[4px]">Add balance</span>
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            className="mr-[16px] flex-center"
          >
            <IconWrapper Icon={Question} />
            <span className="ml-[4px]">Contact support</span>
          </Button>
          <Button variant={ButtonVariant.Secondary} isSquare>
            <IconWrapper Icon={ThreeDots} />
          </Button>
        </div>
      </div>
      <div className="m-[8px_0_16px_8px] font-bold text-lg">Transactions</div>

      <div className="flex justify-between flex-col flex-1">
        {groupTransactions!.map(([date, group], index) => (
          <div key={index}>
            <div className="p-[12px_16px_10px] text-textSecondary text-sm w-full border-b-[1px] border-borderDefault">
              {date}
            </div>
            {group.map(({ id, price, status }) => {
              const finalPrice = formatPrice(price).slice(
                status === TransactionStatus.REMOVED ? 1 : 0,
              )
              return (
                <div className="p-[12px_16px] flex items-center" key={id}>
                  <div className="mr-auto flex-center">
                    <IconWrapper
                      color="textPrimary"
                      size="m"
                      Icon={iconStatusMap[status]}
                    />

                    <div className="ml-[12px]">
                      <div>{textStatusMap[status]}</div>
                      <div className="text-textSecondary text-sm">ID: {id}</div>
                    </div>
                  </div>
                  <div
                    className={`${classNamesStatusMap[status]} font-semibold`}
                  >
                    {symbolStatusMap[status]} {finalPrice}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div className="flex h-[72px] align-middle justify-between px-[16px]">
          <div className="text-textSecondary flex-center">
            {getPaginationText(currentPage, transactions.totalCount)}
          </div>
          <div className="flex-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(transactions.totalCount / PageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}
