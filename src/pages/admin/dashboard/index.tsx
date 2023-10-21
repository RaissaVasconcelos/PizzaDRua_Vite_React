import { ClipboardCheck, ChefHat, CheckCheck, Truck  } from "lucide-react";
import delivery from '../../../assets/delivery-orange.png'
import { Card } from "./components/Card";
import { api, jsonServer } from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Orders } from "../../../@types/interface";
import { parseCookies } from "nookies";
// import WebSocket from 'robust-websocket';
export default function Dashboard() {
  const [orders, setOrders] = useState<Orders[]>([])

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3001/hello-ws')
  //   ws.addEventListener('open',  function message(event) {
  //     console.log('received: %s', event.data);
  //   });
  // }, [])

  const getOrders = async () => {
    const token = parseCookies().accessToken 
    const response = await api.get('/order', {
      headers: {
        Authorization: `Bearer ${token}`
      }  
  }) 
    setOrders(response.data) 
   
  }

  const onChangeOrderStatus = (orderId:string, status:string) => {
   setOrders((prevState) => prevState.map((order) =>(
    order.id === orderId ? {...order, status} : order
  )))
 }
  useEffect(() => {
    getOrders()
  }, [])

  return (
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
          />
        ))}
      </div>
    </div>
  )
}