import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { secret_token } = auth

  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: 'Token missing', status: HTTP_STATUS.UNAUTHORIZED })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload

    req.user = {
      id: user_id
    }

    next()
  } catch (err) {
    throw res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: 'Invalid Token',
      status: HTTP_STATUS.UNAUTHORIZED,
      error: err.message
    })
  }
}
