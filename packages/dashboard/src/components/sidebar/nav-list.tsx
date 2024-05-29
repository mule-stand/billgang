import { reatomComponent, useAtom } from '@reatom/npm-react'
import { routeAtom } from '../../app/index.js'
import { Routes } from '../../app/routes.js'
import {
  Dollar,
  Heart,
  Home,
  Logout,
  Medal,
  Question,
  Wallet,
} from '../../assets/icons.js'
import { IconWrapper } from '../../common/icon-wrapper.js'

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
      {sidebarItems.map(([text, Icon]) => {
        const isActive = text === route
        return (
          <button
            type="button"
            onClick={() => routeAtom(ctx, text)}
            className={`flex cursor-pointer items-center py-3 pl-2 w-full ${
              isActive
                ? 'rounded-xl bg-surface0 text-textPrimary'
                : 'text-textSecondary'
            }`}
            key={text}
          >
            <div className="mr-2">
              <IconWrapper
                Icon={Icon}
                color={isActive ? 'textPrimary' : 'textSecondary'}
              />
            </div>

            <div>{text}</div>
          </button>
        )
      })}
      <div className="flex cursor-pointer items-center py-3 pl-2	text-signalDanger mt-[6px]">
        <div className="mr-2">
          <IconWrapper Icon={Logout} color="signalDanger" size="s" />
        </div>

        <div>Log out</div>
      </div>
    </div>
  )
})

export default NavList
