import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import {
  IChangePass,
  IUserAuthRepository
} from '@modules/Accounts/repositories/IUserAuthRepository'
import { IResponseRepository } from 'services/Response/interfaces'
import { hash } from 'bcrypt'
import { IUserAuthSQL, IUserOldPass } from '../interfaces/IUserAuthSQL'
import { IUserRulesSQL } from '../interfaces/IUserRulesSQL'

class UserAuthRepository implements IUserAuthRepository {
  async findByEmail(email: string): Promise<IResponseRepository<IUserAuthSQL>> {
    let response: IResponseRepository<IUserAuthSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('DS_MAIL', sql.NVarChar(36), email)
        .execute('[dbo].[PRC_USUA_LOGI]')

      const { recordset: user } = result

      response = {
        success: true,
        data: user
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async changePassword({
    uuid_usua,
    password,
    uuid_token,
    is_reset,
    user_action
  }: IChangePass): Promise<IResponseRepository> {
    let response: IResponseRepository

    const hashPassword = await hash(password, 8)

    try {
      const pool = getPool()

      await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), uuid_usua)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .input('UUID_TOKE', sql.NVarChar(36), uuid_token)
        .input('DS_PASS', sql.VarChar(128), hashPassword)
        .input('IN_RESE', sql.Bit, is_reset)
        .execute('[dbo].[PRC_USUA_ALTE_SENH]')

      response = {
        success: true
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async getPasswordById(
    userId: string
  ): Promise<IResponseRepository<IUserOldPass>> {
    let response: IResponseRepository<IUserOldPass>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), userId)
        .query('SELECT DS_PASS FROM [dbo].[TB_USUA] WHERE UUID = @UUID_USUA')

      const { recordset: user } = result

      response = {
        success: true,
        data: user
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async getPermissions(
    userId: string
  ): Promise<IResponseRepository<IUserRulesSQL>> {
    let response: IResponseRepository<IUserRulesSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), userId)
        .execute('[dbo].PRC_USUA_LOGI_PERM')

      const { recordset: user } = result

      response = {
        success: true,
        data: user
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }
}

export { UserAuthRepository }
