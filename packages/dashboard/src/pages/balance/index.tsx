import { useAtom } from '@reatom/npm-react'

import { Button } from '../../common/button.js'
import { IconWrapper } from '../../common/icon-wrapper.js'
import { LoadingSpinner } from '../../common/loading-spinner.js'
import { NoItemsBlock } from '../../common/no-items-block.js'
import { PageTitle } from '../../common/page-title.js'
import { PaginationWithRange } from '../../common/pagination.js'
import {
  type Transaction,
  TransactionStatus,
  getTransactions,
  pageNumberAtom,
} from './model.js'

import { formatPrice } from '../../utils/index.js'

import { Fire, Minus, Plus, Question, ThreeDots } from '../../assets/icons.js'

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

const groupTransactionsByDate = (transactions: Transaction[]) => {
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
        <div className="ml-3">
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
          <PaginationWithRange
            currentPage={currentPage}
            totalCount={transactions.totalCount}
            onPageChange={setCurrentPage}
          />
        </>
      )
    }

    return (
      <NoItemsBlock
        title="Transactions are empty"
        description="This is where all your transactions will be"
      />
    )
  }
  return (
    <>
      <div className="p-6 border rounded-2xl border-borderDefault mb-4">
        <div className="text-sm text-brandDefault py-2 px-3 flex bg-surface0 rounded-xl mb-4">
          <Fire />
          <div className="ml-2">
            Top up your store balance below and get <b>25%</b> back.
          </div>
        </div>
        <div className="text-textSecondary">Your balance</div>
        <div className="flex items-baseline flex-col md:flex-row">
          <div className="text-xxl font-bold mr-auto leading-10 mb-4 md:mb-0">
            $0.00
          </div>
          <Button className="mr-4 flex-center mb-2 md:mb-0 w-full md:w-auto">
            <IconWrapper color="surface100" Icon={Plus} />
            <span className="ml-1">Add balance</span>
          </Button>
          <div className="flex w-full md:w-auto">
            <Button
              variant="secondary"
              className="mr-2 md:mr-4 flex-center w-full md:w-auto"
            >
              <IconWrapper Icon={Question} />
              <span className="ml-1">Contact support</span>
            </Button>
            <Button variant="secondary" isSquare>
              <IconWrapper Icon={ThreeDots} />
            </Button>
          </div>
        </div>
      </div>
      <PageTitle title="Transactions" />
      <div className="flex flex-col flex-1">{renderContent()}</div>
    </>
  )
}
