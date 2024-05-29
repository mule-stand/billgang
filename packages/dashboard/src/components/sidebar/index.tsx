import { useAtom } from '@reatom/npm-react'
import Card from './card.js'
import { getDashInfo } from './model.js'
import NavList from './nav-list.js'

export const Sidebar = () => {
  const [data] = useAtom(getDashInfo.dataAtom)

  if (!data) {
    return null
  }

  const balance = '$0.00'
  return (
    <div className="w-full border-r-[1px] border-borderDefault px-10 pt-6 lg:max-w-[320px] lg:pr-4">
      <Card email={data.email} balance={balance} />
      <NavList />
    </div>
  )
}
