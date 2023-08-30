import { useToast } from 'primevue/usetoast'

export function useToastComponent() {
  const toast = useToast()
  function showToast() {
    console.log('Show toast')
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 })
  }

  return {
    showToast,
  }
}
