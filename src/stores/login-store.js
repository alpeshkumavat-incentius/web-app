import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLoginStore = defineStore('counter', {
  state: () => ({
    email: '',
    userType: '',
    password: '',
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}
