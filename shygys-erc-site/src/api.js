import axios from 'axios'
import { mainStore } from 'src/store/mainStore' 
const store = mainStore()

const apiRequests = {
  async userRegistration(user) {
    try {
      const res = await axios.post(store.getRouteAPI + 'registration', {
        Login: user.Login,
        Password: user.Password,
        Email: user.Email
      })

      return {
        success: true,
        data: res.data
      }
    } catch (err) {
      // Ответ пришёл от сервера
      if (err.response) {
        return {
          success: false,
          data: {
            Message: err.response.data.Message,
            MessageLocale: err.response.data.MessageLocale,
          } 
        }
      }

      // Сервер недоступен / сеть
      if (err.request) {
        return {
          success: false,
          data: {
            Message: "server is not available",
            MessageLocale: "serverIsNotAvailable"
          }
        }
      }

      // Неизвестная ошибка
      return {
        success: false,
        status: null,
        data: {
            Success: false,
            Message: err.Message,
            MessageLocale: "serverIsNotAvailable"
        }
      }
    }
  }
}

export default apiRequests