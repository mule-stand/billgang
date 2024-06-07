import {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useRef,
} from 'react'
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha'
export const SITE_KEY = '6LdQiIIpAAAAAAkhvhS9zuo5WNS5mAzZrALD9cCa'

interface ReCaptchaInstance {
  executeAsync?: () => Promise<string | null>
  reset?: () => void
  getValue?: () => string | null
}

interface ReCaptchaContextType {
  recaptchaRef: RefObject<ReCaptchaInstance>
  executeRecaptcha: () => Promise<string | null>
}

const ReCaptchaContext = createContext<ReCaptchaContextType | undefined>(
  undefined,
)

export const ReCaptchaProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const recaptchaRef = useRef<ReCaptchaInstance>(null)

  const executeRecaptcha = async () => {
    try {
      if (recaptchaRef?.current?.reset) {
        recaptchaRef.current.reset()
      }
      if (recaptchaRef?.current?.executeAsync) {
        const result = await recaptchaRef.current.executeAsync()
        return result ?? null
      }
    } catch (e) {
      console.error(e)
    }
    return null
  }

  return (
    <ReCaptchaContext.Provider
      value={{
        recaptchaRef,
        executeRecaptcha,
      }}
    >
      {children}
      <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} size="invisible" />
    </ReCaptchaContext.Provider>
  )
}

export const useReCaptcha = () => {
  const context = useContext(ReCaptchaContext)
  if (context === undefined) {
    throw new Error('useReCaptcha must be used within a ReCaptchaProvider')
  }
  return context
}
