import { fetchBalance, fetchLogin, fetchRefreshToken } from '~/api/authApi'
import { BALANCE_UPDATE_INTERVAL, DEFAULT_CURRENCY, TOKEN_REFRESH_INTERVAL } from '~/api/config'
import { UnauthorizedError } from '~/utils/handleApiError'

interface AuthState {
  token: string | null
  refreshToken: string | null
  username: string | null
  balance: number
  currency: string
  isAuthenticated: boolean
}

const state = reactive<AuthState>({
  token: null,
  refreshToken: null,
  username: null,
  balance: 0,
  currency: DEFAULT_CURRENCY,
  isAuthenticated: false,
})

let tokenRefreshTimer: ReturnType<typeof setInterval> | null = null
let balanceUpdateTimer: ReturnType<typeof setInterval> | null = null

export function useAuthStore() {
  const router = useRouter()

  async function login(username: string, password: string) {
    try {
      const response = await fetchLogin(username, password)
      const attributes = response.data[0].attributes

      state.token = attributes.token
      state.refreshToken = attributes['refresh-token']
      state.username = username
      state.isAuthenticated = true

      localStorage.setItem('token', attributes.token)
      localStorage.setItem('refreshToken', attributes['refresh-token'])
      localStorage.setItem('username', username)

      startTokenRefresh()
      startBalanceUpdate()
      await updateBalance()
    }
    catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  function logout() {
    state.token = null
    state.refreshToken = null
    state.username = null
    state.balance = 0
    state.isAuthenticated = false

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')

    stopTokenRefresh()
    stopBalanceUpdate()

    router.push('/login')
  }

  function startTokenRefresh() {
    stopTokenRefresh()
    tokenRefreshTimer = setInterval(async () => {
      try {
        if (state.refreshToken) {
          const response = await fetchRefreshToken(state.refreshToken)
          state.token = response.token
          state.refreshToken = response['refresh-token']

          localStorage.setItem('token', response.token)
          localStorage.setItem('refreshToken', response['refresh-token'])
        }
      }
      catch (error) {
        if (error instanceof UnauthorizedError) {
          logout()
          return
        }

        console.error('Token refresh error:', error)
        logout()
      }
    }, TOKEN_REFRESH_INTERVAL)
  }

  function stopTokenRefresh() {
    if (tokenRefreshTimer) {
      clearInterval(tokenRefreshTimer)
      tokenRefreshTimer = null
    }
  }

  function startBalanceUpdate() {
    stopBalanceUpdate()
    balanceUpdateTimer = setInterval(async () => {
      await updateBalance()
    }, BALANCE_UPDATE_INTERVAL)
  }

  function stopBalanceUpdate() {
    if (balanceUpdateTimer) {
      clearInterval(balanceUpdateTimer)
      balanceUpdateTimer = null
    }
  }

  async function updateBalance() {
    try {
      if (!state.token) {
        return
      }

      const response = await fetchBalance(state.token)

      if (!response.data || response.data.length === 0) {
        state.balance = (response as any).balance || 0
        state.currency = (response as any).currency || DEFAULT_CURRENCY
        return
      }

      const usdBalance = response.data.find(item => item.attributes.currency === DEFAULT_CURRENCY)
      const balanceItem = usdBalance || response.data[0]

      state.balance = balanceItem.attributes.available
      state.currency = balanceItem.attributes.currency
    }
    catch (error) {
      if (error instanceof UnauthorizedError) {
        logout()
        return
      }

      console.error('Balance update error:', error)
    }
  }

  function restoreSession() {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const username = localStorage.getItem('username')

    if (token && refreshToken) {
      state.token = token
      state.refreshToken = refreshToken
      state.username = username
      state.isAuthenticated = true

      startTokenRefresh()
      startBalanceUpdate()
      updateBalance()
    }
  }

  return {
    state: readonly(state),
    login,
    logout,
    restoreSession,
    updateBalance,
  }
}
