import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    //routeAPI: 'http://10.250.180.144:8081/api/',
    routeAPI: 'http://localhost:8081/api/',
    APIkey: 'f0d218b5f594f68848ad215f7eec3533060cbe15cdbf58e2',
    accessToken: null,
  }),
  getters: {
    getRouteAPI: (state) => state.routeAPI,
    getAPIkey: (state) => state.APIkey,
    isAuth: (state) => !!state.accessToken
  },
  actions: {    
    /*setName(newName) {
      this.name = newName
    }*/
    setToken(token) {
      this.accessToken = token
    },

    clearAuth() {
      this.accessToken = null
      this.user = null
    }
  },
  persist: true
})