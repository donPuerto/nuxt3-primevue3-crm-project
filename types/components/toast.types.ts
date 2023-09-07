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
