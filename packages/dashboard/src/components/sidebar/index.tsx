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
    <div className="w-full xl:border-r border-borderDefault px-4 py-0 xl:max-w-[320px] xl:pr-4">
      <Card email={data.email} balance={balance} />
      <NavList />
    </div>
  )
}
