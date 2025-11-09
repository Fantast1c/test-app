const DEFAULT_TOAST_DURATION = 3000

interface ToastState {
  message: string
  visible: boolean
}

const state = reactive<ToastState>({
  message: '',
  visible: false,
})

let timeoutId: ReturnType<typeof setTimeout> | null = null

export function useToastError() {
  function showError(message: string, duration: number = DEFAULT_TOAST_DURATION) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    state.message = message
    state.visible = true

    timeoutId = setTimeout(() => {
      state.visible = false
    }, duration)
  }

  function hideError() {
    state.visible = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return {
    state: readonly(state),
    showError,
    hideError,
  }
}

