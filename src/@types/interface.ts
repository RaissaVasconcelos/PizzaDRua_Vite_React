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

export interface OrderData {
    orderId: string;
    customerId: string;
    status: string;
    methodDelivery: string;
    payment: string;
    totalPrice: string;
    itensOrder: any; // Defina o tipo apropriado para "itensOrder"
    orderCreatedAt: Date;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    addressId: string;
    addressNumber: string;
    addressPhone: string;
    addressStreet: string;
    addressType: string;
    addressZipCode: string;
    neighborhoodName: string;
    neighborhoodTax: string;

}