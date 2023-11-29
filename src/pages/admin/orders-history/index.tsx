import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../../../utils/axios';
import * as RadioGroup from "@radix-ui/react-radio-group";
import { TrTableOrders } from './components/TrTableOrder';
import { OrderData } from '../../../@types/interface';
import { priceFormatter } from '../../../utils/formatter';
import { HeaderAdmin } from '../../../components/HeaderAdmin';

export default function OrdersHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [typeOrder, setTypeOrder] = useState('finish');

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const totalValueFinished = orders
    .filter((order) => order.status === 'FINISHED') // Filtra apenas as ordens com status "FINISHED"
    .reduce((total, order) => {
      const orderValue = order.totalPrice ? Number(order.totalPrice) : 0;
      return total + orderValue;
    }, 0);

  const handleFilterOrders = async () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString();
      const response = await api.post(`/date-order`, { formattedDate });
      setOrders(response.data)
    }
  };


  return (
    <>
      <HeaderAdmin />
      <div className='w-full flex flex-col items-center justify-center mb-10'>
        <div className='flex items-center gap-2 justify-center mt-10'>
          <DatePicker className='p-2 rounded' selected={selectedDate} onChange={handleDateChange} />
          <button className='bg-gray-600 p-2 text-gray-200 font-semibold rounded' onClick={handleFilterOrders}>Filtrar por Data</button>
        </div>
        <div className="flex items-center justify-center gap-5">
          <RadioGroup.Root
            onValueChange={setTypeOrder}
            className="flex items-center justify-center py-4 gap-5"
          >
            <RadioGroup.Item
              value="progress"
              className={`${typeOrder === 'progress' ? 'bg-gray-600 text-gray-100' : 'bg-gray-300 text-gray-600'}  flex items-center justify-center gap-2 rounded   p-2  font-semibold`}
            >

              Em andamento
            </RadioGroup.Item>
            <RadioGroup.Item
              value="finish"
              className={`${typeOrder === 'finish' ? 'bg-gray-600 text-gray-100' : 'bg-gray-300 text-gray-600'}  flex items-center justify-center gap-2 rounded   p-2  font-semibold`}
            >

              finalizado
            </RadioGroup.Item>
          </RadioGroup.Root>

        </div>
        <div className="w-10/12 overflow-auto mt-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl text-center text-gray-600  mb-8 font-semibold">
            Histórico de  Pedidos
          </h2>

          <table className="w-full ">
            <thead className="w-full ">
              <tr className=''>
                <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-tl">
                  Nome
                </th>
                <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                  Pedido
                </th>
                <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                  Preco
                </th>
                <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-tr">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="flex-col items-center justify-center gap-2 text-gray-200">

              {orders &&
                orders.map((item) => (
                  <TrTableOrders
                    orders={item}
                    key={item.orderId}
                    typeOrder={typeOrder}
                  />
                ))
              }
            </tbody>
          </table>
          {
            typeOrder === 'finish' && (
              <div className="w-full border-t-4 border-gray-900 gap-3 flex items-center justify-end bg-gray-800 p-4 text-xl  text-gray-100 font-semibold ">
                <span>Total</span>
                {priceFormatter.format(totalValueFinished)}
              </div>

            )
          }
        </div>
      </div>
    </>
  );
}
