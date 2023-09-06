import { useToast } from 'primevue/usetoast'

export function useToastComponent() {
  const toast = useToast()
  const showToast = (severity, summary, detail, group, life) => {
    const toast = useToast()
    toast.add({
      severity, summary, detail, group, life,
    })
  }
  const clear = () => {
    toast.removeAllGroups()
  }

  return {
    showToast,
    clear,
  }
}
