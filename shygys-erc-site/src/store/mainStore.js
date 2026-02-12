import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    //routeAPI: 'http://10.250.180.144:8081/api/',
    routeAPI: 'http://localhost:8081/api',
    APIkey: 'bbc2a9b4da6439c27edb00288c42e17e4519b682d0201fbe',
    accessToken: null,
  }),
  getters: {
    getRouteAPI: (state) => state.routeAPI,
    getAPIkey: (state) => state.APIkey,
    },
  actions: {    
    /*setName(newName) {
      this.name = newName
    }*/
    
  },
  persist: true
})