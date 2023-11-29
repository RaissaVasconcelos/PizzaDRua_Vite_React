export interface UpdateAddressRequest {
  neighborhood?: string
  id: string
  number: string
  customerId: string
  standard?: boolean
  street: string
  type?: string
  zipCode: string
  phone: string
}