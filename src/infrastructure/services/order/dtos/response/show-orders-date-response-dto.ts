export interface ShowOrdersDateResponseDTO {
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