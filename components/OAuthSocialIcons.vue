<script setup lang="ts">
import type { Provider } from '@supabase/gotrue-js'

// Define Props
const { socialIconsData } = defineProps({
  socialIconsData: {
    type: Array<{ name: string }>,
    required: true,
    validator: (value: Array<{ name: string }>) => {
      const validIconNames = ['google', 'github']
      const invalidIcons = value.filter(icon => !validIconNames.includes(icon.name))

      if (invalidIcons.length > 0)
        throw new Error(`Invalid socialIconsData prop: Invalid icons found - ${invalidIcons.map(icon => icon.name).join(', ')}`)

      return true
    },
  },

})

// Declarations

// Composables
const { signInWithOAuth } = useAuth()

// Pinia
const { getContainerCustomClass, socialAuthIcons } = useCustomClassesStore()

function dynamicComponent(component: Provider) {
  switch (component) {
    case 'google':
      return resolveComponent('IconsGoogle')
    case 'github':
      return resolveComponent('IconsGithub')
    default:
      return ''
  }
}
/**
 * Handles social authentication.
 *
 * @param {Object} socialOAuth - The social OAuth object.
 * @return {undefined} This function does not return a value.
 */
function socialAuthHandler(socialOAuth: Provider) {
  signInWithOAuth(socialOAuth)
}

onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div class="flex" :class="getContainerCustomClass">
    <div v-for="(icon) in socialIconsData" :key="icon.name">
      <component
        :is="dynamicComponent(icon.name as Provider)"
        :height="socialAuthIcons.iconDimensions.height"
        :width="socialAuthIcons.iconDimensions.width"
        @click="socialAuthHandler(icon.name as Provider)"
      />
    </div>
  </div>
</template>

<style>

</style>
