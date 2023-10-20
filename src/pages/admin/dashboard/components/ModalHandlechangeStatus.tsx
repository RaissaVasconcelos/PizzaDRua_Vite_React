import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { CheckCheck, CheckSquare, ChefHat, ClipboardCheck, Truck, X } from "lucide-react";
import image from '../../../../assets/Vector.svg'
import './styles.css'
import { Orders } from "../../../../@types/interface";
import { priceFormatter } from "../../../../utils/formatter";
import { api, jsonServer } from "../../../../utils/axios";
import socketIo from 'socket.io-client'
import { useEffect, useState } from "react";

interface ModalOrderProps {
  order: Orders
  onChangeOrderStatus: (orderId: string, status: string) => void
}

export const ModalHandleChangeStatus = ({ order, onChangeOrderStatus }: ModalOrderProps) => {

  const imprimirPedido = () => {
    window.print()
  }


  const handleChangeOrderStatus = async () => {
    const newStatus = order.status === 'WAITING'
      ? 'ACCEPTED'
      : order.status === 'ACCEPTED'
      ? 'PREPARING'
      : order.status === 'PREPARING' 
      ? 'DELIVERY' 
      : 'FINISHED' 

    await api.put('/order', {
      id: order.id,
      totalPrice: order.totalPrice,
      customerId: order.customer.id,
      payment: order.payment,
      methodDelivery: order.methodDelivery,
      status: newStatus,
      itensOrder: [
        {
          product: order.itensOrder[0].product,
          quantity: String(order.itensOrder[0].quantity),
          size: order.itensOrder[0].size,
        }
      ]
    }
    )
    onChangeOrderStatus(order.id, newStatus)
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <AlertDialog.Content className="md:w-6/12 w-11/12 rounded p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <AlertDialog.Title className="text-gray-500 text-center font-semibold text-xl">
          <header className="flex items-center justify-start">
            <div className="flex w-full flex-col items-start justify-center gap-4">
              <div className=" w-full flex items-center justify-between">
                <h2>{order.customer.name}</h2>
                <AlertDialog.Cancel>
                  <X className="text-gary-600" />
                </AlertDialog.Cancel>
              </div>

            </div>

          </header>
          <main className="mt-10 flex flex-col items-start justify-center gap-3">
            {order.itensOrder.map((item) => (
              <div className="flex items-start justify-center gap-2">
                <img src={image} className="w-16" alt="" />
                <div className="flex items-start justify-center gap-3">
                  <p className="text-lg">{item.quantity}x</p>
                  <div className="text-base flex flex-col items-start justify-center">
                    <div className="flex items-center justify-start gap-2">
                      {item.product.map(item => (
                        <span>{item}</span>
                      ))}
                    </div>
                    <p>{priceFormatter.format(Number(item.price))}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex flex-col items-start justify-center mt-7">
              <div className="w-full flex items-center justify-start gap-2">
                Endereco: <span>{order.customer.Address[0].street}</span> -
                <span>{order.customer.Address[0].number}</span> -
                <span>{order.customer.Address[0].neighborhood.name}</span>
              </div>
              <span>
                Telefone: {order.customer.Address[0].phone}
              </span>
              <span>
                Cep: {order.customer.Address[0].zipCode}
              </span>
              <span>Metado de Entrega: {order.methodDelivery}</span>
              <span>Metado de Pagamento: {order.payment}</span>
            </div>
            <div className="w-full flex items-center justify-between mt-7">
              <span>Total</span>
              <span>{order.totalPrice}</span>
            </div>
          </main>
        </AlertDialog.Title>
        <button id="print" onClick={imprimirPedido} className="mt-5 border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50 flex p-1 rounded ">Imprimir</button>
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-8 font-semibold">
          <AlertDialog.Trigger id='accept-btn' className="w-full" asChild>
            <button onClick={handleChangeOrderStatus} className=" flex items-center justify-center gap-2 p-2 text-gray-100 rounded bg-gray-700">
              {order.status === 'WAITING'
                ? (
                  <>
                    <ClipboardCheck className="text-orange-500" />
                    <span>Aceitar Pedido</span>
                  </>

                )
                : order.status === 'ACCEPTED' ? (
                  <>
                    <ChefHat className="text-orange-500" />
                    <span>Iniciar Producao</span>
                  </>
                ) : order.status === 'PREPARING' ? (
                  <>
                    <Truck className="text-orange-500" />
                    <span>Saiu para Entrega</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="text-emerald-500"/>
                    <span>Entregue</span>
                  </>
                )}
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Cancel className="w-full" asChild>
            <button className=" text-red-500 p-2 rounded ">
              Cancelar Pedido
            </button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};