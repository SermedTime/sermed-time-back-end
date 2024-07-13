import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { getPool } from '@shared/infra/database/config'
import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '../status/http-status'

export async function validateUserTimeSheetPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id: userSearch } = req.params

  const userAuth = userAuthenticated(req)

  if (userSearch === userAuth) return next()

  const hasPermissionPontoGeral = await permissionVerify(
    userAuth,
    res,
    'ponto_geral'
  )

  if (hasPermissionPontoGeral) return next()

  const hasPermissionPontoEquipe = await permissionVerify(
    userAuth,
    res,
    'ponto_equipe'
  )

  if (hasPermissionPontoEquipe) {
    const hasPermissionForThisUser = await userVerify(userAuth, userSearch, res)

    if (hasPermissionForThisUser) return next()
  }

  throw res.status(HTTP_STATUS.FORBIDDEN).json({
    message: `Você não tem permissão para acessar os dados deste usuário.`,
    status: HTTP_STATUS.FORBIDDEN
  })
}

export async function permissionVerify(
  userAuth: string,
  res: Response,
  permission: 'ponto_geral' | 'ponto_equipe'
): Promise<boolean> {
  const pool = getPool()

  const query = `
    SELECT
	    COUNT(*) AS TOTAL
    FROM dbo.TB_CORE_USUA_X_PERM	UP
    JOIN dbo.TB_USUA				      U	ON U.ID = UP.ID_USUA
    JOIN dbo.TB_CORE_PERM			    P	ON P.ID = UP.ID_PERM
    WHERE
    	  U.UUID    = TRY_CAST('${userAuth}' AS UNIQUEIDENTIFIER)
    AND	P.SG_PERM = '${permission}'	
  `

  try {
    const response = await pool.request().query(query)

    const hasPermission = response.recordset[0].TOTAL > 0

    return hasPermission
  } catch (err) {
    throw res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: `Não foi possível prosseguir com a sua solicitação, não se preocupe uma mensagem foi enviada a nossa equipe que já está avaliando a causa do problema. Tente novamente em alguns instantes!`,
      status: HTTP_STATUS.BAD_REQUEST,
      error: err.message
    })
  }
}

async function userVerify(userAuth: string, userSearch: string, res: Response) {
  const pool = getPool()

  const query = `
    SELECT
      COUNT(*) AS TOTAL
    FROM TB_USUA_X_EQUI		UE
    JOIN TB_EQUI			    E	ON E.ID = UE.ID_EQUI
    JOIN TB_USUA			    U	ON U.ID = UE.ID_USUA
    OUTER APPLY(
      SELECT TOP 1
        ID_USUA
      FROM TB_USUA_X_EQUI UE
      JOIN TB_USUA		    U	ON U.ID = UE.ID_USUA
      WHERE	ID_EQUI = UE.ID_EQUI
      AND		U.UUID = TRY_CAST('${userAuth}' AS UNIQUEIDENTIFIER)
      AND		IN_SUPE = 1
    ) L
    JOIN TB_USUA			UL	ON UL.ID = L.ID_USUA
    WHERE
      U.UUID = TRY_CAST('${userSearch}' AS UNIQUEIDENTIFIER)
  `

  try {
    const response = await pool.request().query(query)

    const hasThisUserInYourTeam = response.recordset[0].TOTAL > 0

    return hasThisUserInYourTeam
  } catch (err) {
    throw res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: `Não foi possível prosseguir com a sua solicitação, não se preocupe uma mensagem foi enviada a nossa equipe que já está avaliando a causa do problema. Tente novamente em alguns instantes!`,
      status: HTTP_STATUS.BAD_REQUEST,
      error: err.message
    })
  }
}
