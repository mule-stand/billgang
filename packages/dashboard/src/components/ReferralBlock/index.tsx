import ReferralList from './ReferralList.js'
// import ReferralModal from './ReferralModal.js'

const ReferralBlock = () => (
  <div className="h-full rounded-[12px] border-[1px] border-borderDefault p-[24px]">
    <div className="text-xxl font-bold">Refer friends</div>
    <div className="mb-[12px] text-textSecondary">
      Refer friends. Earn rewards. Make bank.
    </div>
    <div className="mb-[24px]">
      {/* <ReferralModal /> */}
    </div>
    <ReferralList />
  </div>
)
export default ReferralBlock
