import { useAtom } from '@reatom/npm-react'

import {
  Bag,
  Billgang,
  Calendar,
  Crown,
  D4RK,
  Dollar,
  Eye,
  Heart,
  Medal,
  Star,
  TopArrow,
} from '../../assets/icons.js'
import { LoadingSpinner } from '../../common/loading-spinner.js'
// import ChartItem from '../../components/chart-item/index.js'
import ReferralBlock from '../../components/referral-block/index.js'
import StatItem from '../../components/stat-item/index.js'

import { IconWrapper } from '../../common/icon-wrapper.js'
import {
  convertCfImageIdToUrl,
  formatPrice,
  formatTimestamp,
} from '../../utils/index.js'
import { getHome } from './model.js'

const POWERED_BY = 'Billgang'
const STORE = 'D4RK'

export const Home = () => {
  const [data] = useAtom(getHome.dataAtom)

  if (!data) return <LoadingSpinner />

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[repeat(4,min-content)] gap-4 sm:grid-cols-2 xl:grid-cols-4 ">
      <div className="sm:col-span-2 row-span-2 mb-6 xl:col-span-4 xl:mb-0">
        <ReferralBlock />
      </div>
      {/* <ChartItem
      title="Referrals"
      value={charts.referrals}
      data={charts.data}
      />
      <ChartItem
      title="Earned" value={charts.earned} data={charts.data}
      />
      <ChartItem
      title="Total Revenue"
      value={charts.totalRevenue}
      data={charts.data}
      />
      <ChartItem
      title="Earn Percent"
      value={charts.earnPercent}
      data={charts.data}
      />

      <div className="col-span-1 h-6 text-lg font-bold sm:col-span-2 xl:col-span-4">
        Your statistics
      </div> */}
      <div className="mr-4 w-full flex flex-col">
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
        <StatItem Icon={Medal} title="Top" value={`#${data.ratingPlacement}`}>
          <div className="text-xs text-textSecondary flex items-center mt-2">
            <IconWrapper Icon={TopArrow} className="mx-1" />
            Spend ${data.spendMoreUsdForNextPlace} more to be #
            {data.ratingPlacement + 1}
          </div>
        </StatItem>
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
          value={`${formatPrice({
            amount: data.topSpenderProduct.amountSpentUsd,
          })} spent`}
        />
      )}
      <div className="mr-4 w-full flex flex-col">
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
