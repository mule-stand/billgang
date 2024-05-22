import Card from './Card.js'
import NavList from './NavList.js'
import { getDashInfo } from './model.js'
import { useAtom } from '@reatom/npm-react'

export const Sidebar = () => {
  const [data] = useAtom(getDashInfo.dataAtom)

  if (!data) {
    return null
  }

  const balance = '$0.00'
  return (
    <div className="w-full border-r-[1px] border-borderDefault px-[40px] pt-[24px] lg:max-w-[320px] lg:pr-[16px]">
      <Card email={data.email} balance={balance} />
      <NavList />
    </div>
  )
}
