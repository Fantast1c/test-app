const HTTP_STATUS_UNAUTHORIZED = 401

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export function checkResponseStatus(response: Response) {
  if (response.status === HTTP_STATUS_UNAUTHORIZED) {
    throw new UnauthorizedError()
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
}
