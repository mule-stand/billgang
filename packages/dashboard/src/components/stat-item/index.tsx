import { useState } from 'react'
import { FallbackImage } from '../../assets/icons.js'
import { IconWrapper } from '../../common/icon-wrapper.js'

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
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isImageError, setIsImageError] = useState(false)

  const handleLoad = () => {
    setIsImageLoading(false)
  }

  const handleError = () => {
    setIsImageLoading(false)
    setIsImageError(true)
  }
  return (
    <div className="relative mb-4 flex w-full flex-col justify-between rounded-xl border-[1px] border-borderDefault flex-auto">
      {image && (
        <>
          <img
            src={image}
            alt="FallbackImage"
            style={{ display: 'none' }}
            onError={handleError}
            onLoad={handleLoad}
          />
          {isImageLoading || isImageError ? (
            <div className="flex h-full min-h-[300px] flex-col rounded-xl bg-surface0 p-4">
              <div className="flex-center flex-1">
                <FallbackImage />
              </div>
              <div className="font-semibold mt-auto">{imageName}</div>
            </div>
          ) : (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('${image}')`,
              }}
              className="flex h-full min-h-[300px] flex-col justify-end rounded-xl bg-cover bg-no-repeat p-4 text-white"
            >
              <div>
                <div className="font-semibold">{imageName}</div>
                {/* <div className="inline-block max-h-8 min-w-0 overflow-hidden text-xs">
                {imageDesc}
              </div> */}
              </div>
            </div>
          )}
        </>
      )}
      <div className={`px-4 ${children ? 'py-3' : 'p-6'}`}>
        <div className="flex">
          <IconWrapper Icon={Icon} color="brandDefault" size="l" />
          <div className="ml-3">
            <div className="text-sm text-textSecondary">{title}</div>
            <div className="text-lg font-bold">{value}</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default StatItem
