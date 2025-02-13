import sql, { UniqueIdentifier } from 'mssql'

import { statusVerify } from '@utils/statusVerify'
import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from 'services/Response/interfaces'

import { IUserSQL } from '../interfaces'
import { IParamsListUsers } from '../../../useCases/ListUsers/ListUsersUseCase'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { IAssignWorkingDay } from '../../../useCases/AssignWorkingDay/AssignWorkingDayUseCase'

class UsersRepository implements IUsersRepository {
  async assignWorkingDay({
    userAction,
    userId,
    workingDayId
  }: IAssignWorkingDay): Promise<IResponseRepository<any>> {
    let response: IResponseRepository

    const pool = getPool()
    try {
      const result = await pool
        .request()
        .input('UUID_USUA', sql.UniqueIdentifier, userId)
        .input(
          'UUID_JORN_TRAB',
          sql.UniqueIdentifier,
          workingDayId.length > 0 ? workingDayId : null
        )
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, userAction)
        .execute('[dbo].[PRC_USUA_GRAV]')

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

  async create({
    isJob,
    admissionDate,
    companyIdErp,
    companyUuid,
    cpf,
    ctps,
    email,
    employeeCode,
    name,
    payrollNumber,
    pis,
    position,
    socialName,
    status,
    resignationDate,
    uuid,
    action_user,
    hash,
    password
  }: ICreateUserDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('IS_JOB', sql.Bit, isJob ? 1 : 0)
        .input('UUID_USUA', sql.NVarChar(36), uuid)
        .input('NR_CPF', sql.VarChar(11), cpf)
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('DS_MAIL', sql.VarChar(256), email)
        .input('DS_PASS', sql.VarChar(128), password)
        .input('ID_EMPR_REF_ERP', sql.Int, companyIdErp)
        .input('UUID_EMPR', sql.NVarChar(36), companyUuid)
        .input('DS_FUNC', sql.VarChar(64), position)
        .input('NR_FOLH_PAGA', sql.VarChar(10), payrollNumber)
        .input('NR_IDEN_USUA', sql.VarChar(10), employeeCode)
        .input('NR_PIS', sql.VarChar(11), pis)
        .input('NR_CTPS', sql.VarChar(100), ctps)
        .input('DT_ADMI', sql.Date, admissionDate)
        .input('DT_DEMI', sql.Date, resignationDate)
        .input('IN_STAT', sql.Bit, status)
        .input('CD_HASH', sql.Char(32), hash)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), action_user)
        .execute('[dbo].[PRC_USUA_GRAV]')

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

  async update({
    isJob,
    companyIdErp,
    admissionDate,
    companyUuid,
    cpf,
    ctps,
    email,
    employeeCode,
    name,
    payrollNumber,
    pis,
    position,
    socialName,
    status,
    resignationDate,
    uuid,
    hash,
    action_user
  }: ICreateUserDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('IS_JOB', sql.Bit, isJob ? 1 : 0)
        .input('UUID_USUA', sql.NVarChar(36), uuid)
        .input('NR_CPF', sql.VarChar(11), cpf)
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('DS_MAIL', sql.VarChar(256), email)
        .input('ID_EMPR_REF_ERP', sql.Int, companyIdErp)
        .input('UUID_EMPR', sql.NVarChar(36), companyUuid)
        .input('DS_FUNC', sql.VarChar(64), position)
        .input('NR_FOLH_PAGA', sql.VarChar(100), payrollNumber)
        .input('NR_IDEN_USUA', sql.VarChar(10), employeeCode)
        .input('NR_PIS', sql.VarChar(11), pis)
        .input('NR_CTPS', sql.VarChar(10), ctps)
        .input('DT_ADMI', sql.Date, admissionDate)
        .input('DT_DEMI', sql.Date, resignationDate)
        .input('IN_STAT', sql.Bit, status)
        .input('CD_HASH', sql.Char(32), hash)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), action_user)
        .execute('[dbo].[PRC_USUA_GRAV]')

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

  async list({
    order,
    page,
    records,
    search,
    searchingBy,
    status,
    companyId,
    unitId,
    teamId
  }: IParamsListUsers): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    const in_stat = statusVerify(status)
    const name = searchingBy === 'name' ? search : ''
    const socialName = searchingBy === 'socialName' ? search : ''
    const cpf = searchingBy === 'cpf' ? search : ''
    const pis = searchingBy === 'pis' ? search : ''
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_USUA', sql.VarChar(256), name)
        .input('UUID_EMPR', UniqueIdentifier, companyId)
        .input('UUID_UNID', UniqueIdentifier, unitId)
        .input('UUID_EQUI', UniqueIdentifier, teamId)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('NR_CPF_USUA', sql.VarChar(11), cpf)
        .input('NR_PIS', sql.VarChar(12), pis)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_USUA_CONS]')

      const { recordset: users } = result

      response = {
        success: true,
        data: users
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), uuid)
        .execute('[dbo].[PRC_USUA_CONS]')

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

  async findByEmail(email: string): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('DS_MAIL', sql.VarChar(256), email)
        .execute('[dbo].[PRC_USUA_CONS]')

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

  async findByTeamId(team_id: string): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_EQUI', sql.NVarChar(36), team_id)
        .execute('[dbo].[PRC_USUA_DROP_DOWN]')

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

export { UsersRepository }
