import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon = null, className = '', ...props }, ref) => (
    <div className={`relative w-full ${className}`}>
      <input
        ref={ref}
        className="block h-12 w-full rounded-xl border-none bg-surface0 p-3 align-middle placeholder:text-surface200"
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 right-[14px] flex items-center">
          {icon}
        </div>
      )}
    </div>
  ),
)
