
export interface ShowListAddressResponse {
  customerId: string
  type: "HOME" | "WORK" | "OTHER"
  street: string
  number: string
  standard: boolean,
  neighborhood: {
    id: string
    name: string
    tax: string
  }
  zipCode: string
  phone: string
  id: string
}