import { api } from 'boot/axios'
import cookies from 'src/cookies'

const apiRequests = {
  async userRegistration(user) {
    try {
      const res = await api.post('/registration', {
        Login: user.Login,
        Password: user.Password,
        Email: user.Email
      })

      cookies.setValue('token', res.data.token)
      cookies.setValue('ls', res.data.user.login)
      cookies.setValue('user_id', res.data.user.id)

      return { success: true, data: res.data }

    } catch (err) {
      if (err.response) {
        return {
          success: false,
          data: {
            message: err.response.data.Message,
            messagelocale: err.response.data.MessageLocale
          }
        }
      }
      if (err.request) {
        return {
          success: false,
          data: {
            message: "server is not available",
            messagelocale: "serverIsNotAvailable"
          }
        }
      }
      return {
        success: false,
        data: { message: "", messagelocale: "serverIsNotAvailable" }
      }
    }
  },

  async userAutorization(user) {
    try {
      const res = await api.post('/signIn', {
        Login: user.Login,
        Password: user.Password
      })

      cookies.setValue('token', res.data.token)
      cookies.setValue('ls', res.data.user.login)
      cookies.setValue('user_id', res.data.user.id)

      return { success: true, data: res.data }

    } catch (err) {
      if (err.response) {
        return {
          success: false,
          data: {
            message: err.response.data.Message,
            messagelocale: err.response.data.MessageLocale
          }
        }
      }
      if (err.request) {
        return {
          success: false,
          data: {
            message: "server is not available",
            messagelocale: "serverIsNotAvailable"
          }
        }
      }
      return {
        success: false,
        data: { message: "", messagelocale: "serverIsNotAvailable" }
      }
    }
  },
  // загрузка инфы
  async getInfo(_ls) {
    try {
      const res = await api.get('/getDataCabinet', {
        params: {
          ls: _ls
        }
      })

      return { success: true, data: res.data }

    } catch (err) {
      if (err.response) {

          if (err.response.status === 401) {
              return {
                  success: false,
                  data: {
                        message: err.response.data.Error,
                        messagelocale: "unauthorized"
                  }
              }
          } else {
              console.log(err.response.data)
              return {
                  success: false,
                  data: {
                        message: err.response.data.Message,
                        messagelocale: "getInfoError"
                  }
              }
          }
      }
      if (err.request) {
        return {
          success: false,
          data: {
            message: "server is not available",
            messagelocale: "serverIsNotAvailable"
          }
        }
      }
      return {
        success: false,
        data: { message: "", messagelocale: "serverIsNotAvailable" }
      }
    }
  },
  // отказ от бумажки (или согласие на бумажку)
  
  async isMailing(_uid, _isMailing) {
    try {
      await api.post('/isMailing', {
        user_id: _uid,
        IsMailing: _isMailing,        
      })

      return { success: true }

    } catch (err) {
      if (err.response) {

          if (err.response.status === 401) {
              return {
                  success: false,
                  data: {
                        message: err.response.data.Error,
                        messagelocale: "unauthorized"
                  }
              }
          } else {
              
            console.log(err.response)
              return {
                  success: false,
                  data: {
                        message: err.response.data.Message,
                        messagelocale: "isMailingError"
                  }
              }
          }
      }
      if (err.request) {
        return {
          success: false,
          data: {
            message: "server is not available",
            messagelocale: "serverIsNotAvailable"
          }
        }
      }
      return {
        success: false,
        data: { message: "", messagelocale: "serverIsNotAvailable" }
      }
    }
  },
  // смена пароля
  async changePassword(_ID, _passwordOld, _passwordNew) {
    try {

      await api.post('/changePassword', {
          user_id: _ID,
          old_password: _passwordOld,
          new_password: _passwordNew
      })

      return { success: true, data: null }

    } catch (err) {
      if (err.response) {
        return {
          success: false,
          data: {
              message: err.response.data.Message,
              messagelocale: err.response.data.MessageLocale
          }
        }
      }
      if (err.request) {
        return {
          success: false,
          data: {
            message: "server is not available",
            messagelocale: "serverIsNotAvailable"
          }
        }
      }
      return {
        success: false,
        data: { message: "", messagelocale: "serverIsNotAvailable" }
      }
    }
  }
}

export default apiRequests