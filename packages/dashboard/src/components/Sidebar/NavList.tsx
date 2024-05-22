import { reatomComponent, useAtom } from '@reatom/npm-react'

import { Dollar } from '../../assets/icons/dollar.js'
import { Heart } from '../../assets/icons/heart.js'
import { Home } from '../../assets/icons/home.js'
import { Logout } from '../../assets/icons/logout.js'
import { Medal } from '../../assets/icons/medal.js'
import { Question } from '../../assets/icons/question.js'
import { Wallet } from '../../assets/icons/wallet.js'
import IconWrapper from '../../common/IconWrapper.js'
import { routeAtom } from '../../app/index.js'
import { Routes } from '../../app/routes.js'

const sidebarItems: [Routes, React.FunctionComponent][] = [
  [Routes.Home, Home],
  [Routes.Favorites, Heart],
  [Routes.Orders, Dollar],
  [Routes.Rewards, Medal],
  [Routes.Balance, Wallet],
  [Routes.Tickets, Question],
]

const NavList = reatomComponent(({ ctx }) => {
  const [route] = useAtom(routeAtom)
  return (
    <div>
      {sidebarItems.map(([text, Icon], i) => {
        const isActive = text === route
        return (
          <div
            onClick={() => routeAtom(ctx, text)}
            className={`flex cursor-pointer items-center py-[12px] pl-[8px] ${
              isActive
                ? 'rounded-[12px] bg-surface0 text-textPrimary'
                : 'text-textSecondary'
            }`}
            key={i}
          >
            <div className="mr-[8px]">
              <IconWrapper
                Icon={Icon}
                size="s"
                color={isActive ? 'black' : 'steel'}
              />
            </div>

            <div>{text}</div>
          </div>
        )
      })}
      <div className="flex cursor-pointer items-center py-[12px] pl-[8px]	text-signalDanger mt-[6px]">
        <div className="mr-[8px]">
          <IconWrapper Icon={Logout} color="primaryDarker" size="s" />
        </div>

        <div>Log out</div>
      </div>
    </div>
  )
})

export default NavList
