import { initializeServer } from './server'

initializeServer().listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on 3000 port')
})
