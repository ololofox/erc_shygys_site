import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

export default ({ app }) => {
  const pinia = createPinia()
  pinia.use(piniaPersist)

  app.use(pinia)
}