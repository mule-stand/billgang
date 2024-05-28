import type React from 'react'
interface CardProps {
  email: string
  balance: string
}

const Card: React.FC<CardProps> = ({ email, balance }) => (
  <div className="mb-[16px] flex w-full flex-col items-center rounded-[16px] bg-surface0 py-[16px]">
    <div className="mb-[4px] font-bold">{email}</div>
    <div className="rounded-[12px] bg-brandLight px-[8px] py-[4px] text-sm text-brandDefault">
      Balance: {balance}
    </div>
  </div>
)
export default Card
