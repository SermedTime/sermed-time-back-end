interface ICreateCompanyDTO {
  uuid?: string
  companyName: string
  companyCnpj: string
  streetName: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  status: string | number
  user_action: string
}

export { ICreateCompanyDTO }
