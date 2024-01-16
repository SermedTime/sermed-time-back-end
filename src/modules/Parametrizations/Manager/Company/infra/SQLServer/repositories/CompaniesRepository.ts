import { getPool } from '@shared/infra/database/config'
import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { statusVerify } from '@utils/statusVerify'
import { ACTION_USER } from '@utils/ActionUser'
import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO'
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository'
import { IParamsListCompanies } from '../../../useCases/ListCompanies/ListCompaniesUseCase'
import { ICompanySQL } from '../interfaces/ICompanySQL'

class CompaniesRepository implements ICompaniesRepository {
  async upsert({
    uuid,
    companyName,
    companyCnpj,
    streetName,
    streetNumber,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    status
  }: ICreateCompanyDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_EMPR', sql.NVarChar(36), uuid)
        .input('NM_EMPR', sql.VarChar(128), companyName)
        .input('NR_CNPJ', sql.VarChar(18), companyCnpj)
        .input('NR_CEP', sql.VarChar(9), zipCode)
        .input('DS_LOGR', sql.VarChar(128), streetName)
        .input('NR_LOGR', sql.VarChar(10), streetNumber)
        .input('DS_COMP', sql.VarChar(16), complement)
        .input('NM_BAIR', sql.VarChar(128), neighborhood)
        .input('NM_MUNI', sql.VarChar(128), city)
        .input('DS_UF', sql.Char(2), state)
        .input('IN_STAT', sql.Bit, status)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), ACTION_USER)
        .execute('[dbo].[PRC_EMPR_GRAV]')

      const { recordset: company } = result

      response = {
        success: true,
        data: company
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
    searchingBy,
    search,
    status,
    records,
    page,
    order
  }: IParamsListCompanies): Promise<IResponseRepository<ICompanySQL>> {
    let response: IResponseRepository<ICompanySQL>

    const companyName = searchingBy === 'companyName' ? search : ''
    const companyCnpj = searchingBy === 'companyCnpj' ? search : ''
    const in_stat = statusVerify(status)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_EMPR', sql.VarChar(128), companyName)
        .input('NR_CNPJ', sql.VarChar(18), companyCnpj)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_EMPR_CONS]')

      const { recordset: companies } = result

      response = {
        success: true,
        data: companies
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<ICompanySQL>> {
    let response: IResponseRepository<ICompanySQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_EMPR', sql.VarChar(128), uuid)
        .execute('[dbo].[PRC_EMPR_CONS]')

      const { recordset: companies } = result

      response = {
        success: true,
        data: companies
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findAll(
    allCompanies?: string
  ): Promise<IResponseRepository<ICompanySQL>> {
    let response: IResponseRepository<ICompanySQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('ALL', sql.Bit, allCompanies === 'true' ? 1 : 0)
        .execute('[dbo].[PRC_EMPR_DROP_DOWN]')

      const { recordset: companies } = result

      response = {
        success: true,
        data: companies
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

export { CompaniesRepository }
