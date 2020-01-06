import { initializeServer } from './server'
import { config } from './shared/config'

initializeServer().listen(config('HTTP_PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${config('HTTP_PORT')} port`)
})
