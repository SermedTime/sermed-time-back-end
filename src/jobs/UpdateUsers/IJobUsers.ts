import { IRecordSet } from 'mssql'

interface IUserSage {
  NR_CPF: string
  NM_COMP: string
  NM_SOCI: string
  DS_MAIL: string
  ID_EMPR_REF_ERP: string
  DS_FUNCA: string
  NR_FOLH_PAGA: string
  NR_IDEN_FUNC: string
  NR_PIS: string
  NR_CTPS: string
  DT_ADMI: string
  DT_DEMI: string
}

interface ISysUser {
  UUID_USUA: string
  NR_IDEN_USUA: string
  CD_HASH: string
}

interface IJobUsers {
  executeJob(): Promise<void>
  getUsers(): Promise<IRecordSet<IUserSage>>
  getSysUsers(): Promise<IRecordSet<ISysUser>>
}

export { IJobUsers, IUserSage, ISysUser }
