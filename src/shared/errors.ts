export class AuthenticationError extends Error {
  status = 401
  name = 'AuthenticationError'
  message: string
}
