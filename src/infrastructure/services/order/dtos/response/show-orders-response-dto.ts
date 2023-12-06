export interface ShowOrdersResponseDTO {
    methodDelivery: "DELIVERY" | "PICKUP"
    status: string
    payment: {
        methodPayment: string
        typeCard?: string
        flag?: string
    },
    observation?: string
    id: string
    createdAt: Date
    totalPrice: string
    customer: {
        id: string
        name: string
        withdrawalName: string
        email: string
        phone: string
    },
    address: {
        street?: string
        number?: string
        neighborhood?: string,
        tax?: string
        cep?: string
        phone?: string
    },
    itensOrder: {
        mode: "MIXED" | "SIMPLE",
        image_url: string
        product: string[]
        quantity: number,
        price: string
        size: "ENTIRE" | "HALF"
    }[]
}