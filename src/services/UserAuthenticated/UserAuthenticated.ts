import auth from '@config/auth'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function userAuthenticated(req: Request): string {
  const { secret_token } = auth

  const authHeader = req.headers.authorization

  const [, token] = authHeader.split(' ')

  const { sub: user_id } = verify(token, secret_token) as IPayload

  return user_id
}
