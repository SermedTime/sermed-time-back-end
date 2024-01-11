import { getPool } from '@shared/infra/database/config'
import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO'
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository'

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

    const actionUser = '16F2F093-403E-43FE-A52E-C7502FEB176D'

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
        .input('UUID_USUA_ACAO', sql.NVarChar(36), actionUser)
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
}

export { CompaniesRepository }
