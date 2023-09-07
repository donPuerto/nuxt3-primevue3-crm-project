<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { useToastStore } from '../../stores/primevue/toastStore'

const toastStore = useToastStore()
const { fireToast } = storeToRefs(toastStore)
console.log('fireToast', fireToast.value)

const toastPosition = ref<ToastConfigPosition>({ position: undefined })
const toastGroup = ref<ToastConfigGroup>({ group: undefined })

const toast = useToast()

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
function showAlert() {
  alert('hi')
}

function clear() {
  toast.removeAllGroups()
}

watch(
  () => toastStore.fireToast,
  (val) => {
    if (val)
      showAlert()
  },
)
</script>

<template>
  <Toast
    :position="toastPosition.position"
    :group="toastGroup.group"
  />
</template>
