import { IconWrapper } from '../../common/IconWrapper.js'

type StatItemProps = {
  Icon: React.FunctionComponent
  title: string
  value: string | number
  image?: string
  imageName?: string
  children?: React.ReactNode
  // imageDesc?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  Icon,
  title,
  value,
  image,
  imageName,
  children,
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
    <div className={`px-4 ${children ? 'py-3' : 'p-6'}`}>
      <div className="flex">
        <IconWrapper Icon={Icon} color="brandDefault" size="l" />
        <div className="ml-[12px]">
          <div className="text-sm text-textSecondary">{title}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
      {children}
    </div>
  </div>
)

export default StatItem
