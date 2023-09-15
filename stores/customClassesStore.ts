import { defineStore } from 'pinia'

export const useCustomClassesStore = defineStore({
  id: 'customClassesStore',
  state: () => ({
    socialAuthIcons: {
      iconDimensions: {
        width: 23,
        height: 23,
      },
      container: {
        justifyContent: 'justify-content-center',
        alignItems: 'align-items-center',
        gap: 'gap-4',

      },

    },
  }),
  getters: {
    getContainerCustomClass(state): Record<string, boolean> {
      const classes: Record<string, boolean> = {}

      for (const [_, value] of Object.entries(state.socialAuthIcons.container))
        classes[value] = true

      return classes
    },
  },
  actions: {},
})
