import { useEffect } from 'react'
import { useAtom, useCtx } from '@reatom/npm-react'

import { Bag } from '../../assets/icons/bag.js'
import { Billgang } from '../../assets/icons/billgang.js'
import { Calendar } from '../../assets/icons/calendar.js'
import { Crown } from '../../assets/icons/crown.js'
import { D4RK } from '../../assets/icons/d4rk.js'
import { Dollar } from '../../assets/icons/dollar.js'
import { Eye } from '../../assets/icons/eye.js'
import { Heart } from '../../assets/icons/heart.js'
import { Medal } from '../../assets/icons/medal.js'
import { Star } from '../../assets/icons/star.js'
import ChartItem from '../../components/ChartItem/index.js'
import ReferralBlock from '../../components/ReferralBlock/index.js'
import StatItem from '../../components/StatItem/index.js'
import {LoadingSpinner} from '../../common/LoadingSpinner.js'

import { getHome } from './model.js'
import {
  convertCfImageIdToUrl,
  formatPrice,
  formatTimestamp,
} from '../../utils/index.js'

const POWERED_BY = 'Billgang'
const STORE = 'D4RK'

export const Home = () => {
  const [data] = useAtom(getHome.dataAtom)

  if (!data) return <LoadingSpinner />

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[repeat(4,min-content)] gap-[16px] sm:grid-cols-2 xl:grid-cols-4 ">
      <div className="col-span-1 row-span-2 mb-[24px] sm:col-span-2 xl:mb-0">
        <ReferralBlock />
      </div>
      <ChartItem
      // title="Referrals"
      // value={charts.referrals}
      // data={charts.data}
      />
      <ChartItem
      // title="Earned" value={charts.earned} data={charts.data}
      />
      <ChartItem
      // title="Total Revenue"
      // value={charts.totalRevenue}
      // data={charts.data}
      />
      <ChartItem
      // title="Earn Percent"
      // value={charts.earnPercent}
      // data={charts.data}
      />

      <div className="col-span-1 h-[24px] text-lg font-bold sm:col-span-2 xl:col-span-4">
        Your statistics
      </div>
      <div className="mr-[16px] w-full flex flex-col">
        <StatItem
          Icon={Calendar}
          title="Customer since"
          value={formatTimestamp(data.createdAt)}
        />
        <StatItem
          Icon={Dollar}
          title="Total spent"
          value={formatPrice({ amount: data.totalSpent })}
        />
        <StatItem Icon={Medal} title="Top" value={`#${data.ratingPlacement}`} />
        <StatItem
          Icon={Star}
          title="Average review"
          value={data.averageReview}
        />
      </div>
      {data.topSpenderProduct && (
        <StatItem
          image={convertCfImageIdToUrl(data.topSpenderProduct.image.cfId)}
          imageName={data.topSpenderProduct.name}
          Icon={Crown}
          title="Top spent"
          value={`${formatPrice({ amount: data.topSpenderProduct.amountSpentUsd })} spent`}
        />
      )}
      <div className="mr-[16px] w-full flex flex-col">
        <StatItem Icon={Bag} title="Purchases" value={data.totalPurchases} />
        <StatItem Icon={Eye} title="Visits" value={data.visits} />
        <StatItem Icon={Billgang} title="Powered by" value={POWERED_BY} />
        <StatItem Icon={D4RK} title="Store" value={STORE} />
      </div>
      {data.favoriteProduct && (
        <StatItem
          image={convertCfImageIdToUrl(data.favoriteProduct.image.cfId)}
          imageName={data.favoriteProduct.name}
          Icon={Heart}
          title="Favorite product"
          value={`bought ${data.favoriteProduct.purchasedTimes} times`}
        />
      )}
    </div>
  )
}
