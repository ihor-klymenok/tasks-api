import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: err.name,
    details: {
      message: err.message,
    },
  })
}
