<script lang="ts" setup>
const toasthandler = useToastHandler()

const toastPosition = ref<ToastConfigPosition>({ position: undefined })
const toastGroup = ref<ToastConfigGroup>({ group: undefined })
</script>

<template>
  <Toast
    :position="toastPosition.position"
    :group="toastGroup.group"
  />
</template>
