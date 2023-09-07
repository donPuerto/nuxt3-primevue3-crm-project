import { defineStore } from 'pinia'

export const useToastStore = defineStore({
  id: 'toastStore',
  state: () => ({
    fireToast: true,
  }),
  actions: {},
})
