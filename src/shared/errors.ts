/* eslint-disable max-classes-per-file */
export class AuthenticationError extends Error {
  status = 401
  name = 'AuthenticationError'
  message: string
}

export class ValidationError extends Error {
  status = 422
  name = 'ValidationError'
  message: string
}
