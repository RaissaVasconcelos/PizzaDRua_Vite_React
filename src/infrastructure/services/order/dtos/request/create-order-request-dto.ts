export interface CreateOrderRequestDTO {
    id?: string
    payment: {
        methodPayment: string
        flag?: string
        typeCard?: string
    },
    address?: {
        street?: string
        number?: string
        neighborhood?: string,
        tax?: string
        cep?: string
        phone?: string
    },
    totalPrice: string
    methodDelivery: string
    status: string
    observation?: string
    itensOrder: {
        mode?: string,
        size: string,
        price: string
        product: string[]
        quantity: number
    }[]
}