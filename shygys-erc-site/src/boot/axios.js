import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { mainStore } from 'src/store/mainStore'
import cookies from 'src/cookies'

let api // создаём переменную для экспорта

export default boot(({ app }) => {
  const store = mainStore() // pinia уже подключен в main.js

  api = axios.create({
    baseURL: store.getRouteAPI,
    timeout: 10000
  })

  api.interceptors.request.use(
    (config) => {
      const token = cookies.getValue('token')
      const apiKey = store.getAPIkey
      const userName = cookies.getValue('ls')

      const publicRoutes = ['/signIn', '/registration', 'resetPassword']
      const isPublic = publicRoutes.some(route => config.url?.includes(route))

      if (!isPublic) {
        if (token) config.headers.Session = token
        if (apiKey) config.headers.ApiKey = apiKey
        if (userName) config.headers.UserName = userName
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  // Глобально для компонентов Vue
  app.config.globalProperties.$api = api
})

export { api }