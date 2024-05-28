import { useAtom } from '@reatom/npm-react'
import { getRewards } from './model.js'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'
import { formatPrice, Price } from '../../utils/index.js'
export const Rewards = () => {
  const [rewards] = useAtom(getRewards.dataAtom)
  const [pending] = useAtom((ctx) => ctx.spy(getRewards.pendingAtom) > 0)

  const renderContent = () => {
    if (pending) {
      return <LoadingSpinner />
    }
    if (rewards === null) return

    if (rewards?.length) {
      return rewards.map((item) => (
        <Achievement key={item.id} achievement={item} />
      ))
    }

    return <div>No items</div>
  }
  return (
    <>
      <div className="m-[8px_0_16px_8px] font-bold text-lg">Rewards</div>
      <div className="text-textSecondary">
        To unlock an exclusive reward, complete everything on this checklist
      </div>
      <div className="justify-between grid gap-4">{renderContent()}</div>
    </>
  )
}

const Achievement = ({ achievement }: AchievementProps) => {
  const [title, description] = formatAchievementTitleDescription(achievement)
  const percentageProgress = calculateProgressPercentage(achievement)

  return (
    <div className="flex flex-col border border-borderDefault rounded-2xl p-6">
      <div className="grid grid-col-[auto_1fr] gap-4 item-center">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl bg-surface100">{title}</span>
          <span className="bg-surface100">{description}</span>
        </div>
      </div>
      <div className="grid item-center grid-col-[1fr_auto] gap-4">
        <div
          style={{
            height: 5,
            width: '100%',
            ['--percentageProgress' as string]: `${percentageProgress}% `,
            // background: `linear-gradient(90deg, red ${percentageProgress}%, grey ${percentageProgress}%)`,
          }}
          className="rounded-full bg-gradient-to-r from-brand from-[length:var(--percentageProgress)] to-gray-900/5 to-[length:var(--percentageProgress)]"
        ></div>
        <div className="text-brand">{percentageProgress}% complete</div>
      </div>
    </div>
  )
}

export const enum RewardType {
  Balance = 'BALANCE',
  Product = 'PRODUCT',
}

type BalanceRewardOptions = { balance: Price }

type ProductRewardsOptions = {
  productsWithVariants: {
    id: number
    variantId: number
    productName: string
    variantName: string
    quantity: number
  }[]
}

export const enum AchievementType {
  Spend = 'SPEND_AMOUNT',
  Order = 'ORDER_COUNT',
  Referral = 'REFER_FRIEND',
  Review = 'LEAVE_REVIEW',
}

type SpendAchievementOptions = {
  forEach: number
}

type OrderAchievementOptions = {
  ordersCount: number
}

type ReferralAchievementOptions = {
  minReferrals: number
  minCompletedOrders: number
}

type ReviewAchievementOptions = {
  minReviews: number
  minStars: number
}

type RewardRule =
  | {
      id: number
      rewardType: RewardType.Balance
      rewardOptions: BalanceRewardOptions
      ruleType: AchievementType.Spend
      ruleOptions: SpendAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Balance
      rewardOptions: BalanceRewardOptions
      ruleType: AchievementType.Order
      ruleOptions: OrderAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Balance
      rewardOptions: BalanceRewardOptions
      ruleType: AchievementType.Referral
      ruleOptions: ReferralAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Balance
      rewardOptions: BalanceRewardOptions
      ruleType: AchievementType.Review
      ruleOptions: ReviewAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Product
      rewardOptions: ProductRewardsOptions
      ruleType: AchievementType.Spend
      ruleOptions: SpendAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Product
      rewardOptions: ProductRewardsOptions
      ruleType: AchievementType.Order
      ruleOptions: OrderAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Product
      rewardOptions: ProductRewardsOptions
      ruleType: AchievementType.Referral
      ruleOptions: ReferralAchievementOptions
    }
  | {
      id: number
      rewardType: RewardType.Product
      rewardOptions: ProductRewardsOptions
      ruleType: AchievementType.Review
      ruleOptions: ReviewAchievementOptions
    }

type CustomerReward = {
  id: number
  progress: number
  createdAt: string
  completedAt: string | null
  rewardRule: RewardRule
}

const formatAchievementReward = (achievement: CustomerReward): string => {
  switch (achievement.rewardRule.rewardType) {
    case RewardType.Balance:
      return `${formatPrice(achievement.rewardRule.rewardOptions.balance)} on the balance`
    case RewardType.Product:
      return (
        'products: ' +
        achievement.rewardRule.rewardOptions.productsWithVariants
          .map(
            (product) =>
              `${product.quantity} ${product.productName} (${product.variantName})`,
          )
          .join()
      )
  }
}

const formatAchievementDescription = (achievement: CustomerReward): string => {
  switch (achievement.rewardRule.ruleType) {
    case AchievementType.Spend:
      return `Spend $${
        achievement.rewardRule.ruleOptions.forEach
      } in total purchases at our store to receive a reward of ${formatAchievementReward(
        achievement,
      )}. You've spent $${achievement.progress} so far.`

    case AchievementType.Order:
      return `Place ${
        achievement.rewardRule.ruleOptions.ordersCount
      } orders to receive a reward of ${formatAchievementReward(
        achievement,
      )}. You've made ${achievement.progress} orders so far.`

    case AchievementType.Referral:
      return `On your referral link should sign up ${
        achievement.rewardRule.ruleOptions.minReferrals
      } people and make at least ${
        achievement.rewardRule.ruleOptions.minCompletedOrders
      } purchase to receive a reward of ${formatAchievementReward(
        achievement,
      )}. You've referred ${achievement.progress} friends so far.`

    case AchievementType.Review:
      return `Leave ${
        achievement.rewardRule.ruleOptions.minReviews
      } reviews with a minimum rating of ${
        achievement.rewardRule.ruleOptions.minStars
      } to receive a reward of ${formatAchievementReward(
        achievement,
      )}. You've left ${achievement.progress} reviews so far.`
  }
}

const formatAchievementTitle = (achievement: CustomerReward): string => {
  switch (achievement.rewardRule.ruleType) {
    case AchievementType.Spend:
      return `Spend $${achievement.rewardRule.ruleOptions.forEach} at our store`

    case AchievementType.Order:
      return `Make ${achievement.rewardRule.ruleOptions.ordersCount} orders`

    case AchievementType.Referral:
      return `Refer ${achievement.rewardRule.ruleOptions.minReferrals} friends to our store`

    case AchievementType.Review:
      return `Leave ${achievement.rewardRule.ruleOptions.minReviews} reviews with a minimum rating of ${achievement.rewardRule.ruleOptions.minStars}`
  }
}

const formatAchievementTitleDescription = (
  achievement: CustomerReward,
): [string, string] => {
  return [
    formatAchievementTitle(achievement),
    formatAchievementDescription(achievement),
  ]
}

const calculateProgressPercentage = (achievement: CustomerReward): number => {
  let goal: number

  switch (achievement.rewardRule.ruleType) {
    case AchievementType.Spend:
      goal = achievement.rewardRule.ruleOptions.forEach
      break
    case AchievementType.Order:
      goal = achievement.rewardRule.ruleOptions.ordersCount
      break
    case AchievementType.Referral:
      goal = achievement.rewardRule.ruleOptions.minReferrals
      break
    case AchievementType.Review:
      goal = achievement.rewardRule.ruleOptions.minReviews
      break
  }

  const percentage = (achievement.progress / goal) * 100
  return Math.round((percentage + Number.EPSILON) * 100) / 100
}

type AchievementProps = {
  achievement: CustomerReward
}
