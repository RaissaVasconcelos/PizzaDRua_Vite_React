export interface IAddress {
  id: string,
  type: string,
  customerId: string,
  number: string,
  phone: string,
  standard: boolean,
  street: string,
  zipCode: string,
  neighborhood: {
    id: string,
    name: string,
    tax: string
  }
}

export interface ShowListAddressResponse {
  data: IAddress[]
}