import { atom } from '@reatom/framework'
import { useAtom } from '@reatom/npm-react'

import { Sidebar } from '../components/Sidebar/index.js'
import { Home } from '../pages/home/index.js'
import { Orders } from '../pages/orders/index.js'
import { Balance } from '../pages/balance/index.js'
import { Rewards } from '../pages/rewards/index.js'
import { Routes } from './routes.js'
import './index.css'
const Template = () => <div>Template</div>

export const routeAtom = atom<Routes>(Routes.Home)

const RouteToRouteComponent: Record<Routes, React.FunctionComponent> = {
  [Routes.Home]: Home,
  [Routes.Favorites]: Template,
  [Routes.Orders]: Orders,
  [Routes.Rewards]: Rewards,
  [Routes.Balance]: Balance,
  [Routes.Tickets]: Template,
}

const App = () => {
  const [route] = useAtom(routeAtom)

  const ContentComponent = RouteToRouteComponent[route]

  return (
    <main className="flex h-screen flex-grow flex-col lg:flex-row">
      <Sidebar />
      <div className="xl:p-[24px_40px_24px_24px] p-[24px_40px]">
        <ContentComponent />
      </div>
    </main>
  )
}
export default App
