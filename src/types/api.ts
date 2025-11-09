export interface LoginRequest {
  clientId: string
  login: string
  password: string
}

export interface LoginResponse {
  data: Array<{
    id: string
    type: string
    attributes: {
      'token': string
      'token-type': string
      'refresh-token': string
      'life-time': number
      'need-tfa': boolean
    }
  }>
}

export interface RefreshTokenRequest {
  clientId: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  'token': string
  'tokenType': string
  'refresh-token': string
  'life-time': number
  'need-tfa': boolean
}

export interface BalanceResponse {
  data: Array<{
    id: string
    type: string
    attributes: {
      'currency': string
      'available': number
      'in-play': number
      'bonus': number
    }
  }>
  links?: any
  meta?: any
}

export interface Game {
  id: string
  type: string
  attributes: {
    'title': string
    'provider-game-id': string
    'provider': string
    'categories': string[]
    'devices': string[]
    'image': string
    'table': any
    'limit-id': any
    'is-mini-game': boolean
    'is-new': boolean
    'is-single-currency': boolean
    'is-favorite': boolean
    'has-freespins': boolean
    'has-demo': boolean
    'tags': any
    'launch-options': {
      strategy: string
    }
    'creation-date': any
  }
}

export interface GamesResponse {
  data: Game[]
  links?: any
  meta?: any
}

export interface GameSessionRequest {
  clientId: string
  currency: string
}

export interface GameSessionResponse {
  data: Array<{
    id: string
    type: string
    attributes: {
      'launch-options': {
        'game-url': string
        'strategy': string
      }
      'session-id': string
    }
  }>
}
