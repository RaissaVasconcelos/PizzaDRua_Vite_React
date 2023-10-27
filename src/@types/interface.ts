export interface CartProps {
    id: string
    product: { name: string }[]
    price: string
    image_url?: string    
    description: string    
    quantityProduct: number
    size: string    

}

export interface Orders {
    methodDelivery: "DELIVERY" | "PICKUP"
    status: string
    payment: "CARD" | "MONEY" | "PIX",
    id: string
    createdAt: Date
    totalPrice: string
    customer: {
        id: string    
        name: string
        email: string
        phone: string
        Address: {
            id: string
            street: string
            number: string
            type: string
            neighborhood: { name: string, tax: string }
            zipCode: string
            phone: string
        }[],
    }
    itensOrder: {
        mode: "MIXED" | "SIMPLE",
        image_url: string
        product: string[]
        quantity: number,
        price: string
        size: "ENTIRE" | "HALF"
    }[]
}