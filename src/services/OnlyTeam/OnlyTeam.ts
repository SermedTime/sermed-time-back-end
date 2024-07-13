import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { permissionVerify } from '@shared/infra/http/middlewares/validateUserTimeSheetPermission'
import { Request, Response } from 'express'

export async function OnlyTeam(req: Request, res: Response): Promise<boolean> {
  const requestedFrom = req.get('X-Requested-From')

  if (!requestedFrom.includes('/time-sheet/search-user')) return false

  const userId = userAuthenticated(req)

  const hasPermissionPontoGeral = await permissionVerify(
    userId,
    res,
    'ponto_geral'
  )

  if (hasPermissionPontoGeral) return false

  return true
}
