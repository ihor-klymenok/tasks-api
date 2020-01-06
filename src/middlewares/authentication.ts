import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../shared/config';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get('authorization').split(' ')[1];

  const user = jwt.verify(token, config('JWT_SECRET'));

  (<any>req).user = user;

  next();
}
