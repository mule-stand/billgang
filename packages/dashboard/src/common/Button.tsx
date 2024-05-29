import type React from 'react'
import { ccn } from '../utils/index.js'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
  isSquare?: boolean
}

const variants = {
  primary: ccn(
    'bg-brandDefault',
    'text-surface100',
    'border-brandDefault',
    'border',
  ),
  primaryRounded: ccn(
    'bg-surface0',
    'text-brandDefault',
    'border-brandDefault',
    'border',
  ),
  secondary: ccn('bg-surface0', 'text-textPrimary'),
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  isSquare = false,
  ...props
}) => (
  <button
    className={ccn(
      'rounded-xl',
      'p-[8px_16px]',
      'text-sm',
      'disabled:opacity-50',
      variants[variant],
      isSquare
        ? 'w-[32px] h-[32px] !p-0 flex-center rounded-sm'
        : 'w-fit h-[36px]',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
