interface ICreateUserDTO {
  uuid?: string
  isJob?: boolean
  cpf: string
  name: string
  socialName: string
  email: string
  companyIdErp?: number
  companyUuid?: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string
  resignationDate?: string
  status: string | number
  action_user: string
  hash?: string
  password?: string
}

export { ICreateUserDTO }
