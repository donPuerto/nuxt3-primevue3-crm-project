import { useToast } from 'primevue/usetoast'

export function useToastHandler() {
  const toast = useToast()

  function show(toastConfig: ToastConfig) {
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
  return {
    show,
    clear,
    toast,
  }
}
