import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    //routeAPI: 'http://localhost:8081/api/',
    routeAPI: 'http://91.147.113.202:8081/api',
    APIkey: 'bbc2a9b4da6439c27edb00288c42e17e4519b682d0201fbe',
    accessToken: null,
    lastFeedbackTime: null,
    lastRecoverPasswordTime: null,
  }),
  getters: {
    getRouteAPI: (state) => state.routeAPI,
    getAPIkey: (state) => state.APIkey,
    },
  actions: {    
    setLastFeedbackTime(date) {
        this.lastFeedbackTime = date
    },
    setLastRecoverMailTime(date) {
        this.lastRecoverPasswordTime = date
    },
    canSendFeedback() {
      if (!this.lastFeedbackTime) return true

      const now = new Date()
      const diffMs = now - new Date(this.lastFeedbackTime) // разница в миллисекундах
      const diffMinutes = diffMs / 1000 / 60

      return diffMinutes >= 2
    },
    canSendRecoverMail() {
      if (!this.lastRecoverPasswordTime) return true

      const now = new Date()
      const diffMs = now - new Date(this.lastRecoverPasswordTime) // разница в миллисекундах
      const diffMinutes = diffMs / 1000 / 60

      return diffMinutes >= 2
    }
    
  },
  persist: true
})