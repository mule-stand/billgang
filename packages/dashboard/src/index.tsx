import { createCtx } from '@reatom/framework'

import App from './app/index.js'
import { reatomContext } from '@reatom/npm-react'

const ctx = createCtx()

export const Dashboard = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <App />
    </reatomContext.Provider>
  )
}
