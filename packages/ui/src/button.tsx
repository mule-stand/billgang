import 'zode.css'
import 'card.css'

import type { ReactNode } from 'react'
import tsupConfig from '../tsup.config.js'

const a = tsupConfig

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

// Button ddddв

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!!`)}
    >
      {children} +
    </button>
  )
}
