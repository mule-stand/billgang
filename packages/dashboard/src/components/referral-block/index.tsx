import ReferralList from './referral-list.js'
import ReferralModal from './referral-modal.js'

const ReferralBlock = () => (
  <div className="h-full rounded-xl border-[1px] border-borderDefault p-6">
    <div className="text-xxl font-bold">Refer friends</div>
    <div className="mb-3 text-textSecondary">
      Refer friends. Earn rewards. Make bank.
    </div>
    <div className="mb-6">
      <ReferralModal />
    </div>
    <ReferralList />
  </div>
)
export default ReferralBlock
