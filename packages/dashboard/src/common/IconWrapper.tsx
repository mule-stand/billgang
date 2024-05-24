import React from 'react'

const iconSizes = {
  s: 'w-[17px] h-[17px]',
  m: 'w-[21px] h-[21px]',
  l: 'w-[28px] h-[28px]',
}

const colorVariants = {
  primary: 'fill-brandDefault',
  black: 'fill-textPrimary',
  steel: 'fill-textSecondary',
  grayish: 'fill-surface200',
  primaryDarker: 'fill-signalDanger',
}

const containerSizeClassNamesMap = {
  s: '',
  m: 'icon-wrapper w-[44px] h-[44px]',
  l: 'icon-wrapper w-[48px] h-[48px]',
}

type IconWrapperProps = {
  Icon?: React.FunctionComponent
  color?: keyof typeof colorVariants
  size?: keyof typeof iconSizes
}

export const IconWrapper = ({
  Icon,
  color = 'primary',
  size = 's',
}: IconWrapperProps) => (
  <div className={containerSizeClassNamesMap[size]}>
    <div className={`${colorVariants[color]} ${iconSizes[size]}`}>
      {Icon && <Icon />}
    </div>
  </div>
)
