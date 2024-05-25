interface ICreateUnitDTO {
  uuid?: string
  unitName: string
  streetName: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  ibgeCode: string
  status: string | number
  user_action: string
}

export { ICreateUnitDTO }
