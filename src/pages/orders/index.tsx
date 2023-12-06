import { useEffect, useState } from "react"
import { Orders } from "../../@types/interface"
import delivery from '../../assets/pickup-orange.png'
import { Check, CheckCheck, CheckCircle, ChefHat, ClipboardCheck, ExternalLink, StickyNote, XCircle } from "lucide-react"
import { dateFormatter } from "../../utils/formatter"
import { NavLink } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import ServiceOrder from '../../infrastructure/services/order'


export default function OrdersCustomer() {
  const [orders, setOrders] = useState<Orders[]>([])
  const [loading, setLoading] = useState(true);
  const serviceOrder = new ServiceOrder()

  const getOrders = async () => {
    try {
      const response = await serviceOrder.showOrdersCustomer();
      setOrders(response.body);
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false); // Defina o estado de carregamento como falso após a conclusão
    }
  }
  useEffect(() => {
    getOrders()
  }, [])


  return (
    <>

      <div className="w-full flex flex-col items-center justify-center mb-10 mt-36">
        <h2 className="text-xl font-semibold text-gray-500 mb-10">Meus pedidos</h2>
        {loading ? ( // Mostra o spinner enquanto os pedidos estão sendo carregados
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b']}
            />
          </div>
        ) : (
          orders.length > 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-5">
              {orders.filter((order) => order.status !== 'CANCELED' && order.status !== 'FINISHED').map((order) => (
                <NavLink to={`/tracking/${order.id}`} className="bg-white w-11/12  rounded ">

                  {order.status === 'ACCEPTED' && (
                    <div className=" flex items-center justify-between  p-4 w-full">
                      <div className=" flex items-center justify-start gap-2  w-full">
                        <CheckCheck size={25} className=" text-orange-500" />
                        <span>Pedido aceito</span>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>

                  )}

                  {order.status === 'WAITING' && (
                    <div className=" flex items-center justify-between  p-4 w-full">
                      <div className=" flex items-center justify-start gap-2  w-full">
                        <ClipboardCheck size={25} className=" text-orange-500" />
                        <span>Aguardando confirmação</span>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>

                  )}
                  {order.status === 'DELIVERY' && (

                    <div className=" flex items-center justify-between  p-4 w-full">
                      <div className=" flex items-center justify-start gap-2  w-full">
                        <img src={delivery} alt="" className="w-9" />
                        <span>Saiu para entrega</span>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>

                  )}

                  {order.status === 'PREPARING' && (
                    <div className=" flex items-center justify-between p-4  w-full">
                      <div className=" flex items-center justify-start gap-2  w-full">
                        <ChefHat size={25} className="text-red-500" />
                        <span>Em preparação</span>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>
                  )}

                  {order.status === 'AWAITING_WITHDRAWAL' && (
                    <div className=" flex items-center justify-between p-4  w-full">
                      <div className=" flex items-center justify-start gap-2  w-full">
                        <CheckCircle size={25} className="text-emerald-500 " />
                        <span>Pronto para retirada</span>
                      </div>
                      <span className="relative flex items-center justify-center h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-start gap-2 px-6 mb-3">
                    {order.itensOrder.length}
                    <span>Pedidos</span>
                  </div>

                  <div className=" flex items-center justify-between gap-2 p-6  border-t-[1px]  border-gray-300">
                    <span>{dateFormatter(order.createdAt)}</span>
                    <ExternalLink size={25} className="text-orange-500" />
                  </div>
                </NavLink>
              ))}
              {orders.filter((order) => order.status === 'CANCELED' || order.status === 'FINISHED').map((order) => (
                <NavLink to={`/tracking/${order.id}`} className="bg-white w-11/12  rounded ">
                  {order.status === 'FINISHED' && (

                    <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                      <Check size={25} className="bg-emerald-500 text-gray-50 rounded-full p-1" />
                      <span>Pedido concluido</span>
                    </div>

                  )}

                  {order.status === 'CANCELED' && (
                    <div className=" flex items-center justify-start gap-2 p-4 w-11/12">
                      <XCircle size={25} className="text-red-500" />
                      <span>Pedido cancelado</span>
                    </div>

                  )}

                  <div className="flex items-center justify-start gap-2 px-6 mb-3">
                    {order.itensOrder.length}
                    <span>Pedidos</span>
                  </div>

                  <div className=" flex items-center justify-between gap-2 p-6  border-t-[1px]  border-gray-300">
                    <span>{dateFormatter(order.createdAt)}</span>
                    <ExternalLink size={25} className="text-orange-500" />
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="mt-36 w-full flex flex-col items-center justify-center gap-5">
              <StickyNote size={85} className="text-gray-300" />
              <p className="text-center text-gray-500 text-xl font-semibold">Sua lista de pedidos está vazia!</p>
            </div>
          )
        )}
      </div>
    </>
  )
}