import { useAtom } from '@reatom/npm-react'
import {
  PageSize,
  getPaginationText,
  getTransactions,
  pageNumberAtom,
} from './model.js'

import { Button } from '../../common/Button.js'
import { IconWrapper } from '../../common/IconWrapper.js'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'
import { Pagination } from '../../common/Pagination.js'

import { type Price, formatPrice } from '../../utils/index.js'

import { Fire, Minus, Plus, Question, ThreeDots } from '../../assets/icons.js'

enum TransactionStatus {
  Added = 'ADDED',
  Removed = 'REMOVED',
}

interface Transaction {
  id: string
  price: Price
  createdAt: string
  description: string
  status: TransactionStatus
}

const iconStatusMap = {
  [TransactionStatus.Added]: Plus,
  [TransactionStatus.Removed]: Minus,
}

const symbolStatusMap = {
  [TransactionStatus.Added]: '+',
  [TransactionStatus.Removed]: '-',
}

const classNamesStatusMap = {
  [TransactionStatus.Added]: 'text-successText',
  [TransactionStatus.Removed]: 'text-textPrimary',
}

const textStatusMap = {
  [TransactionStatus.Added]: 'Added to your balance',
  [TransactionStatus.Removed]: 'Payment',
}

const groupTransactionsByDate = (
  transactions: Transaction[],
): Record<string, Transaction[]> => {
  const result: Record<string, Transaction[]> = {}
  const today = new Date()

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.createdAt)
    const key =
      transactionDate.toDateString() === today.toDateString()
        ? 'Today'
        : transactionDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

    if (!result[key]) {
      result[key] = []
    }

    result[key]?.push(transaction)
  }

  return result
}

const renderTransaction = ({ id, price, status }: Transaction) => {
  const finalPrice = formatPrice(price).slice(
    status === TransactionStatus.Removed ? 1 : 0,
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
      <div className={`${classNamesStatusMap[status]} font-semibold`}>
        {symbolStatusMap[status]} {finalPrice}
      </div>
    </div>
  )
}

export const Balance = () => {
  const [transactions] = useAtom(getTransactions.dataAtom)
  const [currentPage, setCurrentPage] = useAtom(pageNumberAtom)
  const [pending] = useAtom((ctx) => ctx.spy(getTransactions.pendingAtom) > 0)

  const renderContent = () => {
    if (pending) {
      return <LoadingSpinner />
    }

    if (transactions?.list?.length) {
      const groupedTransactions = groupTransactionsByDate(transactions.list)
      return (
        <>
          {Object.entries(groupedTransactions).map(([date, group]) => (
            <div key={date}>
              <div className="p-[12px_16px_10px] text-textSecondary text-sm w-full border-b-[1px] border-borderDefault">
                {date}
              </div>
              {group.map(renderTransaction)}
            </div>
          ))}
          <div className="flex h-[72px] align-middle justify-between px-[16px] mt-auto">
            <div className="text-textSecondary flex-center">
              {getPaginationText(currentPage, transactions.totalCount)}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(transactions.totalCount / PageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )
    }

    return <div>No items</div>
  }
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
          <Button variant="secondary" className="mr-[16px] flex-center">
            <IconWrapper Icon={Question} />
            <span className="ml-[4px]">Contact support</span>
          </Button>
          <Button variant="secondary" isSquare>
            <IconWrapper Icon={ThreeDots} />
          </Button>
        </div>
      </div>
      <div className="m-[8px_0_16px_8px] font-bold text-lg">Transactions</div>
      <div className="flex flex-col flex-1">{renderContent()}</div>
    </>
  )
}
