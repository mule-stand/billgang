const referralSteps = [
  {
    caption: 'Share link',
    description: 'Send the link to your friends in all convenient ways',
  },
  {
    caption: 'Puchase',
    description: 'They buy a product from our store',
  },
  {
    caption: 'Percentages',
    description: 'You get rewards',
  },
]

const StepItem = ({ caption, description, index, bar = true }) => (
  <div className="flex text-sm text-textSecondary">
    <div className="mb-[4px] mr-[8px] flex flex-col items-center">
      <div className="flex-center mb-[4px] h-[24px] w-[24px] rounded-full bg-borderDefault font-bold">
        {index}
      </div>
      {bar && (
        <div className="h-[38px] w-[4px] rounded-[16px] bg-borderDefault" />
      )}
    </div>
    <div>
      <div className="mb-[4px] font-bold uppercase">{caption}</div>
      <div>{description}</div>
    </div>
  </div>
)

const ReferralList = () => (
  <div>
    {referralSteps.map(({ caption, description }, i, a) => (
      <StepItem
        caption={caption}
        description={description}
        index={i + 1}
        key={i}
        bar={i + 1 !== a.length}
      />
    ))}
  </div>
)

export default ReferralList
