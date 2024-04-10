interface IUnitSQL {
  UUID_UNID: string
  NM_UNID: string
  DT_CRIA: string
  UUID_USUA_CRIA: string
  NM_USUA_CRIA: string
  DT_ATUA: string
  NM_USUA_ATUA: string
  UUID_USUA_ATUA: string
  IN_STAT: boolean
  NM_STAT: 'active' | 'inactive'
  TT_REGI: number
}

export { IUnitSQL }
