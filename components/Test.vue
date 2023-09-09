<script lang="ts" setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation,
})
</script>

<template>
  <div>
    Test Component
  </div>
  <Button>
    Show
  </Button>
</template>

<style>

</style>
