import { createCtx } from '@reatom/framework'

import { reatomContext } from '@reatom/npm-react'
import App from './app/index.js'
import { ReCaptchaProvider } from './utils/recapcha.js'
export const ctx = createCtx()

export const Dashboard = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <ReCaptchaProvider>
        <App />
      </ReCaptchaProvider>
    </reatomContext.Provider>
  )
}
