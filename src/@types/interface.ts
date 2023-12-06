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

export interface OrderData {
    orderId: string;
    customerId: string;
    status: string;
    methodDelivery: string;
    observation?: string;
    payment: {
        methodPayment: string;
        typeCard?: string;
        flag?: string;
    };
    address: {
        street?: string;
        number?: string;
        neighborhood?: string;
        tax?: string;
        cep?: string;
        phone?: string;
    }
    totalPrice: string;
    itensOrder: any; // Defina o tipo apropriado para "itensOrder"
    orderCreatedAt: Date;
    customerName: string;
    withdrawalName: string;
    customerEmail: string;
    customerPhone: string;


}


export interface OrderProps {
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

