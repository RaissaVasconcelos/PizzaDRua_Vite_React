import { useEffect, useState } from "react"
import { Orders } from "../../@types/interface"
import { api } from "../../utils/axios"
import { parseCookies } from "nookies"
import { HeaderOrder } from "../../components/HeaderOrder"
import delivery from '../../assets/delivery-orange.png'
import { Check, CheckCheck, ChefHat, ClipboardCheck, ExternalLink, StickyNote, XCircle } from "lucide-react"
import { dateFormatter } from "../../utils/formatter"
import { NavLink } from "react-router-dom"

export default function OrdersCustomer() {
  const [orders, setOrders] = useState<Orders[]>([])
  const getOrders = async () => {
    const token = parseCookies().accessToken
    const response = await api.get('/order', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setOrders(response.data)

  }
  useEffect(() => {
    getOrders()
  }, [])

  console.log(orders);


  return (
    <>
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder title="Meus Pedidos " link="/orders" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mb-10">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="bg-white w-11/12 mt-5 rounded">
              {order.status === 'FINISHED' && (

                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <Check size={25} className="bg-emerald-500 text-gray-50 rounded-full p-1" />
                  <span>Pedido concluido</span>
                </div>

              )}
              {order.status === 'ACCEPTED' && (
                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <CheckCheck size={28} className=" text-orange-500" />
                  <span>Pedido aceito</span>
                </div>

              )}

              {order.status === 'WAITING' && (
                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <ClipboardCheck
                    size={28}
                    className={` text-orange-500`}
                  />
                  <span>Aguardando</span>
                </div>

              )}
              {order.status === 'DELIVERY' && (
                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <img src={delivery} alt="" className="w-9" />
                  <span>Saiu para entrega</span>
                </div>

              )}
              {order.status === 'CANCELED' && (
                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <XCircle size={28} className="text-red-500" />
                  <span>Pedido cancelado</span>
                </div>

              )}
              {order.status === 'PREPARING' && (
                <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                  <ChefHat size={28} className="text-red-500" />
                  <span>Em preparação</span>
                </div>

              )}
              <div className="flex items-center justify-start gap-2 px-6 mb-3">
                {order.itensOrder.length}
                <span>Pedidos</span>
              </div>

              <NavLink to={`/tracking/${order.id}`} className="flex items-center justify-between gap-2 p-6  border-t-[1px]  border-gray-300">
                <span>{dateFormatter(order.createdAt)}</span>
                <ExternalLink size={25} className="text-orange-500" />
              </NavLink>
            </div>
          ))

        ) : (
          <div className="mt-36 w-full flex flex-col items-center justify-center gap-5">
            <StickyNote size={85} className="text-gray-300" />
            <p className="text-center text-gray-500 text-xl font-semibold">Sua lista de pedidos esta vazio!</p>
          </div>
        )}
      </div>
    </>
  )
}