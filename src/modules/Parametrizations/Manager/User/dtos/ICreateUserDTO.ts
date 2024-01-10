interface ICreateUserDTO {
  uuid?: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyName: string
  companyCnpj: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string
  resignationDate?: string
  status: string | number
}

export { ICreateUserDTO }
