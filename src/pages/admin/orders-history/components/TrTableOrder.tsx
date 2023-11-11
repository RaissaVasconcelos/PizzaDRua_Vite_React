import { priceFormatter } from "../../../../utils/formatter";
import { OrderData } from "../../../../@types/interface";

interface OrdersProps {
  orders: OrderData
  typeOrder: string
}

export const TrTableOrders = ({ orders, typeOrder }: OrdersProps) => {

  return (
    <>
      {typeOrder === 'finish' ? (
        (orders.status === 'FINISHED' || orders.status === 'CANCELED')  && (
          <tr key={orders.orderId} >
            <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
              {orders.customerName}
             
            </td>
            <td
              className={`w-3/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900 `}
            >
              Pedidos({orders.itensOrder.length})
            </td>
            <td className={`w-2/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900 ${orders.status === 'FINISHED' ? 'text-emerald-500 ' : 'text-red-500'}`}>
              {orders.status === 'FINISHED' ? <span>+{priceFormatter.format(Number(orders.totalPrice))}</span> : <span >-{priceFormatter.format(Number(orders.totalPrice))}</span> }
            </td>

            <td className="w-1/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
              <span className={`${orders.status === 'FINISHED' ? 'text-emerald-500 border-emerald-500' : 'text-red-500 border-red-500'} text-sm font-light border-[1px] rounded p-1`}>
                {orders.status === 'FINISHED' ? 'FINALIZADO' : 'CANCELADO'}
              </span>
            </td>
          </tr> 
        )
      
        ): (
          orders.status !== 'FINISHED' && orders.status !== 'CANCELED' && (
            <tr >
              <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
                {orders.customerName}
              </td>
              <td
                className={`w-3/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900 `}
              >
                Pedidos(2)
              </td>
              <td className={`w-1/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900 text-gray-100`}>
                <span>{priceFormatter.format(Number(orders.totalPrice))}</span> 
              </td>

              <td className="w-1/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
                <span className={`text-orange-500 border-orange-500 text-sm font-light border-[1px] rounded p-1`}>
                  {orders.status}
                </span>
              </td>
            </tr>
          )
      )} 
    </>

  )
}