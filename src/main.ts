import { initializeServer } from "./server";

initializeServer().listen(3000, () => {
  console.log('Server is running on 3000 port');
})
