import React from 'react'
import { ccn } from '../utils/index.js'
export const enum ButtonVariant {
  Primary,
  Secondary,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  isSquare?: boolean
}

const variants: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: ccn(
    'rounded-[8px]',
    'bg-surface0',
    'text-brandDefault',
    'border-brandDefault',
    'border',
  ),
  [ButtonVariant.Secondary]: ccn(
    'rounded-[8px]',
    'bg-surface0',
    'text-textPrimary',
  ),
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.Primary,
  className,
  isSquare = false,
  ...props
}) => (
  <button
    className={ccn(
      'rounded-[12px]',
      'px-[8px 16px]',
      'text-sm',
      'disabled:opacity-50',
      variants[variant],
      isSquare ? 'w-[32px] h-[32px] p-0 flex-center' : 'w-fit h-[36px]',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
