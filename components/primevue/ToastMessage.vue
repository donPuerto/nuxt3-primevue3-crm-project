<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'

const toastPosition = ref<ToastConfigPosition>({ position: undefined })
const toastGroup = ref<ToastConfigGroup>({ group: undefined })

interface ToastFunctions {
  show: (toastConfig: ToastConfig) => void
  clear: () => void
}

interface ToastConfigPosition {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center' | undefined
}

interface ToastConfigGroup {
  group?: string | undefined
}

interface ToastConfigBasic {
  severity: 'success' | 'info' | 'warn' | 'error' | undefined
  summary?: string
  detail?: string
  life?: number
}

interface ToastConfig extends ToastConfigBasic,
  ToastConfigPosition, ToastConfigGroup {}

const toast = useToast()

// Expose the functions in the component's public API
// const toastFunctions = {
//   show: (toastConfig: ToastConfig) => {
//     // Update the values using refs correctly
//     if (toastConfig.position !== undefined)
//       toastPosition.value.position = toastConfig.position

//     else
//       toastPosition.value.position = undefined

//     if (toastConfig.group !== undefined)
//       toastGroup.value.group = toastConfig.group

//     else
//       toastGroup.value.group = undefined

//     toast.add({
//       severity: toastConfig.severity,
//       summary: toastConfig.summary,
//       detail: toastConfig.detail,
//       group: toastConfig.group,
//       life: toastConfig.life,
//     })
//   },
//   clear: () => {
//     toast.removeAllGroups()
//   },

// }
// provide('toastFunctions', toastFunctions)

function show(toastConfig: ToastConfig) {
  // Update the values using refs correctly
  if (toastConfig.position !== undefined)
    toastPosition.value.position = toastConfig.position

  else
    toastPosition.value.position = undefined

  if (toastConfig.group !== undefined)
    toastGroup.value.group = toastConfig.group

  else
    toastGroup.value.group = undefined

  toast.add({
    severity: toastConfig.severity,
    summary: toastConfig.summary,
    detail: toastConfig.detail,
    group: toastConfig.group,
    life: toastConfig.life,
  })
}

function clear() {
  toast.removeAllGroups()
}

// Expose the functions through provide
provide('toastFunctions', {
  show,
  clear,
})
</script>

<template>
  <Toast
    :position="toastPosition.position"
    :group="toastGroup.group"
  />
</template>

<style>

</style>
