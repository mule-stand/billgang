import { useAtom } from '@reatom/npm-react'
import { LoadingSpinner } from '../../common/LoadingSpinner.js'
import { IconWrapper } from '../../common/IconWrapper.js'
import { type Price, formatPrice } from '../../utils/index.js'
import { Bag, Confetti } from '../../assets/icons.js'
import { getRewards } from './model.js'
import { Button } from '../../common/Button.js'

export const Rewards = () => {
  const [rewards] = useAtom(getRewards.dataAtom)
  const [pending] = useAtom((ctx) => ctx.spy(getRewards.pendingAtom) > 0)

  const renderContent = () => {
    if (pending) {
      return <LoadingSpinner />
    }
    if (rewards === null) return

    if (rewards?.length) {
      return rewards.map((item: CustomerReward) => (
        <Achievement key={item.id} achievement={item} />
      ))
    }

    return <div>No items</div>
  }
  return (
    <>
      <div className="m-[8px_0_16px_8px]">
        <div className="font-bold text-lg">Rewards</div>
        <div className="text-textSecondary">
          To unlock an exclusive reward, complete everything on this checklist
        </div>
      </div>

      <div className="justify-between grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {renderContent()}
      </div>
    </>
  )
}

const Achievement = ({ achievement }: AchievementProps) => {
  const [title, description] = formatAchievementTitleDescription(achievement)
  const [percentageProgress, progress, goal] =
    calculateProgressPercentageAndComplete(achievement)

  const isComplete = progress === goal
  return (
    <div className="flex flex-col border border-borderDefault rounded-2xl p-6 items-center">
      <CircularProgress percentage={percentageProgress} />
      <div
        className={`mt-3 rounded-xl px-2 py-1 items-start flex ${
          isComplete
            ? 'text-brandDefault bg-brandLight'
            : 'text-textSecondary bg-surface0'
        }`}
      >
        {isComplete ? (
          <div className="flex items-center">
            <Confetti /> <span className="ml-1">Completed!</span>
          </div>
        ) : (
          `Done: ${progress} / ${goal}`
        )}
      </div>

      <span className="items-center font-semibold flex mb-1 mt-4">
        <IconWrapper className="icon-wrapper w-6 h-6 rounded-lg" Icon={Bag} />
        <div className="ml-2">{title}</div>
      </span>
      <span className="bg-surface100 text-center mb-4 text-sm">
        {description}
      </span>
      <Button
        variant={isComplete ? 'primary' : 'secondary'}
        className="w-full mt-auto"
      >
        {isComplete ? 'Claim' : getButtonText(achievement)}
      </Button>
    </div>
  )
}
interface CircularProgressProps {
  percentage: number
  radius?: number
  strokeWidth?: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  radius = 40,
  strokeWidth = 8,
}) => {
  const normalisedRadius = radius + strokeWidth / 2
  const diameter = normalisedRadius * 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div
      style={{ width: diameter, height: diameter }}
      className="flex items-center justify-center overflow-hidden"
    >
      <svg aria-hidden="true" width={diameter} height={diameter}>
        <circle
          cx={normalisedRadius}
          cy={normalisedRadius}
          r={radius}
          fill="transparent"
          className="stroke-borderDefault"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={normalisedRadius}
          cy={normalisedRadius}
          r={radius}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          className="stroke-brandDefault"
          transform={`rotate(-90 ${normalisedRadius} ${normalisedRadius})`}
        />
      </svg>
      <span className="absolute text-lg font-bold text-brandDefault">
        {percentage}%
      </span>
    </div>
  )
}

export enum RewardType {
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

export enum AchievementType {
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
      return `${formatPrice(
        achievement.rewardRule.rewardOptions.balance,
      )} on the balance`
    case RewardType.Product:
      return `products: ${achievement.rewardRule.rewardOptions.productsWithVariants
        .map(
          (product) =>
            `${product.quantity} ${product.productName} (${product.variantName})`,
        )
        .join()}`
  }
}
const getButtonText = (achievement: CustomerReward): string => {
  switch (achievement.rewardRule.rewardType) {
    case RewardType.Balance:
      return formatPrice(achievement.rewardRule.rewardOptions.balance)
    case RewardType.Product:
      return `${achievement.rewardRule.rewardOptions.productsWithVariants
        .map(
          (product) =>
            `${product.quantity} ${product.productName} (${product.variantName})`,
        )
        .join()}`
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

const calculateProgressPercentageAndComplete = (
  achievement: CustomerReward,
): [number, number, number] => {
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
  const percentage =
    Math.round(((achievement.progress / goal) * 100 + Number.EPSILON) * 100) /
    100
  return [percentage, achievement.progress, goal]
}

type AchievementProps = {
  achievement: CustomerReward
}
