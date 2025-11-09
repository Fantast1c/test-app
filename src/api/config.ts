export const API_BASE_URL = 'https://poker.evenbetpoker.com/api/web'
export const CLIENT_ID = 'default'
export const DEFAULT_CURRENCY = 'USD'
export const TOKEN_REFRESH_INTERVAL = 80000 // 800 seconds
export const BALANCE_UPDATE_INTERVAL = 30000 // 30 seconds

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/v2/login`,
  refreshToken: `${API_BASE_URL}/auth/token`,
  balance: `${API_BASE_URL}/v2/users/me/balance`,
  games: `${API_BASE_URL}/casino/game-list`,
  gameSession: (gameId: string) => `${API_BASE_URL}/v2/casino/games/${gameId}/session`,
} as const
