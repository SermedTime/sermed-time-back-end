interface ICreateUserDTO {
  uuid?: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyUuid: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string
  resignationDate?: string
  status: string | number
  action_user: string
  password?: string
}

export { ICreateUserDTO }
