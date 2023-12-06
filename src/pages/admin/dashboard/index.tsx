import { ClipboardCheck, ChefHat, CheckCheck, Truck } from "lucide-react";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { Orders } from "../../../@types/interface";
import socket from "../../../utils/socketIO";
import { HeaderAdmin } from "../../../components/HeaderAdmin";
import ServiceOrder from '../../../infrastructure/services/order'


export default function Dashboard() {
  const [orders, setOrders] = useState<Orders[]>([])
  const serviceOrder = new ServiceOrder()

  useEffect(() => {
    // Adicione o ouvinte do evento 'newOrder' ao montar o componente
    socket.on('OrderRoom', (data: any) => {
      setOrders((prevOrders) => {
        const orderExists = prevOrders.some((order) => order.id === data.id);

        if (!orderExists) {
          return [...prevOrders, data];
        } else {
          // Se o pedido já existe, atualize apenas o status
          return prevOrders.map((order) =>
            order.id === data.id ? { ...order, status: data.status } : order
          );
        }
      });

      socket.emit('statusUpdate', { orderId: data.id, status: data.status });
    });

    // Remova o ouvinte quando o componente for desmontado para evitar vazamento de memória
    return () => {
      socket.off('OrderRoom');
    };
  }, []);

  const onChangeOrderStatus = (orderId: string, status: string) => {
    setOrders((prevState) => prevState.map((order) => (
      order.id === orderId ? { ...order, status } : order
    )))

  }
  const onCancelOrder = (orderId: string) => {
    setOrders((prevState) => prevState.filter((order) => order.id !== orderId))
  }

  const getOrders = async () => {
    const response = await serviceOrder.showOrdersAdmin()
    setOrders(response.body)

  }

  useEffect(() => {
    getOrders()
  }, [])


  return (
    <>
      <HeaderAdmin />
      <div className="w-11/12 mx-3 flex mt-10 items-start justify-center gap-5">
        <div className="border-[1px] rounded w-full border-gray-300 flex flex-col items-center justify-center">
          <header className="flex  items-center justify-center gap-3 py-2">
            <ClipboardCheck className="text-orange-500" />
            <h2 className="text-xl">Aceitar Pedido</h2>
          </header>
          {orders.filter(order => order.status === 'WAITING').map((order) => (
            <Card
              key={order.id}
              order={order}
              onChangeOrderStatus={onChangeOrderStatus}
              onCancelOrder={onCancelOrder}
            />
          ))}
        </div>
        <div className="border-[1px] rounded w-full border-gray-300 flex flex-col items-center justify-center">
          <header className="flex  items-center justify-center gap-3 py-2">
            <CheckCheck className="text-orange-500" />
            <h2 className="text-xl">Pedido Aceito</h2>
          </header>
          {orders.filter(order => order.status === 'ACCEPTED').map((order) => (
            <Card
              key={order.id}
              order={order}
              onChangeOrderStatus={onChangeOrderStatus}
              onCancelOrder={onCancelOrder}
            />
          ))}
        </div>
        <div className="border-[1px] rounded w-full border-gray-300 flex flex-col items-center justify-center">
          <header className="flex  items-center justify-center gap-3 py-2">
            <ChefHat className="text-orange-500" />
            <h2 className="text-xl">Em Preparação</h2>
          </header>
          {orders.filter(order => order.status === 'PREPARING').map((order) => (
            <Card
              key={order.id}
              order={order}
              onChangeOrderStatus={onChangeOrderStatus}
              onCancelOrder={onCancelOrder}
            />
          ))}
        </div>
        <div className="border-[1px] rounded w-full border-gray-300 flex flex-col items-center justify-center">
          <header className="flex  items-center justify-center gap-3 py-2">
            <Truck className="text-orange-500" />
            <h2 className="text-xl">Saiu para Entrega</h2>
          </header>
          {orders.filter(order => order.status === 'DELIVERY').map((order) => (
            <Card
              key={order.id}
              order={order}
              onChangeOrderStatus={onChangeOrderStatus}
              onCancelOrder={onCancelOrder}
            />
          ))}
        </div>
      </div>
    </>
  )
}