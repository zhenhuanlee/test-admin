import { waitCoverInvisible } from './helper.js'
import login from './modules/login.js'
import programNutrition from './modules/programNutrition.js'
// import user from './modules/user'

await login()
await waitCoverInvisible()
await programNutrition()

// await user()
