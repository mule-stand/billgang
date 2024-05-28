import type React from 'react'
import { ccn } from '../utils/index.js'
const iconSizes = {
  sm: 'w-[16px] h-[16px]',
  s: 'w-[16px] h-[16px]',
  m: 'w-[21px] h-[21px]',
  l: 'w-[28px] h-[28px]',
}

const colorVariants = {
  brandDefault: 'fill-brandDefault',
  textPrimary: 'fill-textPrimary',
  textSecondary: 'fill-textSecondary',
  surface100: 'fill-surface100',
  signalDanger: 'fill-signalDanger',
}

const containerSizeClassNamesMap = {
  s: '',
  sm: 'icon-wrapper w-[40px] h-[40px]',
  m: 'icon-wrapper w-[44px] h-[44px]',
  l: 'icon-wrapper w-[48px] h-[48px]',
}

type IconWrapperProps = {
  Icon?: React.FunctionComponent
  color?: keyof typeof colorVariants
  size?: keyof typeof iconSizes
  className?: string
}

export const IconWrapper = ({
  Icon,
  color = 'brandDefault',
  size = 's',
  className,
}: IconWrapperProps) => (
  <div className={ccn(containerSizeClassNamesMap[size], className)}>
    <div className={ccn(colorVariants[color], iconSizes[size], 'flex-center')}>
      {Icon && <Icon />}
    </div>
  </div>
)
