import IconWrapper from '../../common/IconWrapper.js'

interface StatItemProps {
  Icon: React.FunctionComponent
  title: string
  value: string | number
  image?: string
  imageName?: string
  // imageDesc?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  Icon,
  title,
  value,
  image,
  imageName,
  // imageDesc,
}) => (
  <div className="relative mb-[16px] flex w-full flex-col justify-between rounded-[12px] border-[1px] border-borderDefault flex-auto">
    {image && (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('${image}')`,
        }}
        className="flex h-full min-h-[300px] flex-col justify-end rounded-[12px] bg-cover bg-no-repeat p-[16px] text-white"
      >
        <div>
          <div className="font-semibold">{imageName}</div>
          {/* <div className="inline-block max-h-[32px] min-w-0 overflow-hidden text-xs">
            {imageDesc}
          </div> */}
        </div>
      </div>
    )}
    <div className="flex p-[24px_16px]">
      <IconWrapper Icon={Icon} color="primary" size="l" />
      <div className="ml-[12px]">
        <div className="text-sm text-textSecondary">{title}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  </div>
)

export default StatItem
