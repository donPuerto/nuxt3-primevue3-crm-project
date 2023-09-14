<script lang="ts" setup>
import type { Provider } from '@supabase/gotrue-js'

const { iconsData } = defineProps(['iconsData'])
const { signInWithOAuth } = useAuth()

function socialAuthHandler(iconData: Provider) {
  // Call the socialAuthHandler function with the selected iconData
  signInWithOAuth(iconData)
}
</script>

<template>
  <div class="flex align-items-center sm:flex-row pa-3">
    <Chip
      v-for="iconData in iconsData"
      :key="iconData.name"
      :icon="`pi pi-${iconData.name}`"
      :removable="iconData.removable || false"
      class="mr-2"
      @click="socialAuthHandler(iconData.name)"
    />
  </div>
</template>

<style>

</style>
