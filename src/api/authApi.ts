import type {
  BalanceResponse,
  GameSessionRequest,
  GameSessionResponse,
  GamesResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '~/types/api'
import { checkResponseStatus } from '~/utils/handleApiError'
import { API_ENDPOINTS, CLIENT_ID } from './config'

export async function fetchLogin(login: string, password: string): Promise<LoginResponse> {
  const params: LoginRequest = {
    clientId: CLIENT_ID,
    login,
    password,
  }

  const url = new URL(API_ENDPOINTS.login)
  url.searchParams.append('clientId', CLIENT_ID)

  const formData = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  checkResponseStatus(response)

  return response.json()
}

export async function fetchRefreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const params: RefreshTokenRequest = {
    clientId: CLIENT_ID,
    refreshToken,
  }

  const url = new URL(API_ENDPOINTS.refreshToken)
  url.searchParams.append('clientId', CLIENT_ID)

  const formData = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  checkResponseStatus(response)

  return response.json()
}

export async function fetchBalance(token: string): Promise<BalanceResponse> {
  const url = new URL(API_ENDPOINTS.balance)
  url.searchParams.append('clientId', CLIENT_ID)
  url.searchParams.append('auth', token)

  const response = await fetch(url.toString(), {
    method: 'GET',
  })

  checkResponseStatus(response)

  return response.json()
}

export async function fetchGames(): Promise<GamesResponse> {
  const url = new URL(API_ENDPOINTS.games)
  url.searchParams.append('clientId', CLIENT_ID)

  const response = await fetch(url.toString(), {
    method: 'GET',
  })

  checkResponseStatus(response)

  return response.json()
}

export async function fetchGameSession(gameId: string, token: string, currency: string = 'USD'): Promise<GameSessionResponse> {
  const params: GameSessionRequest = {
    clientId: CLIENT_ID,
    currency,
  }

  const url = new URL(API_ENDPOINTS.gameSession(gameId))
  url.searchParams.append('clientId', CLIENT_ID)
  url.searchParams.append('auth', token)

  const formData = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  checkResponseStatus(response)

  return response.json()
}
