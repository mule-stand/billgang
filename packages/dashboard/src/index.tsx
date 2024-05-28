import { createCtx } from '@reatom/framework'

import { reatomContext } from '@reatom/npm-react'
import App from './app/index.js'

const ctx = createCtx()

export const Dashboard = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <App />
    </reatomContext.Provider>
  )
}
