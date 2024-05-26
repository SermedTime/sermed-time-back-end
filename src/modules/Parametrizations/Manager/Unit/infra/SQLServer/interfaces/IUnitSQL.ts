interface IUnitSQL {
  UUID_UNID: string
  NM_UNID: string
  NR_CEP: string
  DS_LOGR: string
  NR_LOGR: string
  DS_COMP: string
  NM_BAIR: string
  UUID_MUNI: string
  NM_MUNI: string
  DS_UF: string
  CD_IBGE: string
  IN_STAT: boolean
  NM_STAT: 'active' | 'inactive'
  UUID_USUA_CRIA: string
  NM_USUA_CRIA: string
  DT_CRIA: string
  UUID_USUA_ATUA: string
  NM_USUA_ATUA: string
  DT_ATUA: string
  TT_REGI: number
}

export { IUnitSQL }
