interface ITeamSQL {
  UUID_EQUI: string
  NM_EQUI: string
  UUID_UNID: string
  NM_UNID: string
  DT_CRIA: string
  UUID_USUA_CRIA: string
  NM_USUA_CRIA: string
  DT_ULTI_ATUA: string
  UUID_USUA_ULTI_ATUA: string
  NM_USUA_ULTI_ATUA: string
  IN_STAT: 'active' | 'inactive'
  TT_REGI: number
}

export { ITeamSQL }
