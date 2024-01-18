import sql from 'mssql'

import { hash } from 'bcrypt'

import { statusVerify } from '@utils/statusVerify'
import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from 'services/Response/interfaces'
import { ACTION_USER } from '@utils/ActionUser'
import { IUserSQL } from '../interfaces'
import { IParamsListUsers } from '../../../useCases/ListUsers/ListUsersUseCase'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  async create({
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
    uuid
  }: ICreateUserDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    const password = await hash('123456', 8)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), uuid)
        .input('NR_CPF', sql.VarChar(11), cpf)
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('DS_MAIL', sql.VarChar(256), email)
        .input('DS_PASS', sql.VarChar(128), password)
        .input('UUID_EMPR', sql.NVarChar(36), companyUuid)
        .input('DS_FUNC', sql.VarChar(64), position)
        .input('NR_FOLH_PAGA', sql.VarChar(10), payrollNumber)
        .input('NR_IDEN_USUA', sql.VarChar(10), employeeCode)
        .input('NR_PIS', sql.VarChar(11), pis)
        .input('NR_CTPS', sql.VarChar(5), ctps)
        .input('DT_ADMI', sql.Date, admissionDate)
        .input('DT_DEMI', sql.Date, resignationDate)
        .input('IN_STAT', sql.Bit, status)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), ACTION_USER)
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
    uuid
  }: ICreateUserDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), uuid)
        .input('NR_CPF', sql.VarChar(11), cpf)
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('DS_MAIL', sql.VarChar(256), email)
        .input('UUID_EMPR', sql.NVarChar(36), companyUuid)
        .input('DS_FUNC', sql.VarChar(64), position)
        .input('NR_FOLH_PAGA', sql.VarChar(10), payrollNumber)
        .input('NR_IDEN_USUA', sql.VarChar(10), employeeCode)
        .input('NR_PIS', sql.VarChar(11), pis)
        .input('NR_CTPS', sql.VarChar(5), ctps)
        .input('DT_ADMI', sql.Date, admissionDate)
        .input('DT_DEMI', sql.Date, resignationDate)
        .input('IN_STAT', sql.Bit, status)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), ACTION_USER)
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
    status
  }: IParamsListUsers): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    const in_stat = statusVerify(status)
    const name = searchingBy === 'name' ? search : ''
    const socialName = searchingBy === 'socialName' ? search : ''
    const cpf = searchingBy === 'cpf' ? search : ''
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('NR_CPF_USUA', sql.VarChar(11), cpf)
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
        .input('UUID_USUA', sql.NVarChar(36), email)
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
}

export { UsersRepository }
