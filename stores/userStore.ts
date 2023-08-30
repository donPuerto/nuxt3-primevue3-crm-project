import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: null as string | null,
    }
  },
  persist: true,
  getters: {
    getUserId: state => state.id,
  },
  actions: {
    updateUserId(id: string | null) {
      this.id = id
    },
  },

})
