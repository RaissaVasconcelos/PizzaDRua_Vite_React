
import { HeaderOrder } from '../../components/HeaderOrder'
import { Button } from '../../components/ui/button'
import pizza from '../../assets/Vector.svg'
import './statusColor.css'
import delivey from '../../assets/delivery.png'
import delivered from '../../assets/delivered.png'
import whatsapp from '../../assets/whatsapp.svg'
import { useEffect, useState } from 'react'
import { api } from '../../utils/axios'
import { CheckCheck, ChefHat, ClipboardCheck, Package } from 'lucide-react'
import { ContextApp } from '../../context/context-app'
import { parseCookies } from 'nookies'
import { Orders } from '../../@types/interface'
import socketIo from 'socket.io-client'
import { priceFormatter } from '../../utils/formatter'

export default function Tracking() {
  const {cartTotalPrice} = ContextApp()
  const [orderStatus, setOrderStatus] = useState<Orders>()
  
    const getOrders = async () => {
      const token = parseCookies().accessToken
      const response = await api.get('/order', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const orderStatus = response.data.filter((order: Orders) => order.status !== 'FINISHED')   
      setOrderStatus(orderStatus[0])
    }

    useEffect(() => {
      getOrders()
    }, [])

  console.log(orderStatus);
  

  return (
    <div className="mb-10 w-full flex items-center justify-center">
      <div className='w-11/12 flex flex-col items-center justify-center'>
        <header className='w-full flex items-center  justify-center mt-6 font-semibold text-2xl text-gray-500'>
          <h2>Status do pedido</h2>
        </header>
        <div className='w-full'>
          <div className='w-full mt-10 flex items-center justify-start gap-5 p-2 bg-white'>
            <img src={pizza} alt="" />
            <div className='flex flex-col items-start gap-2 text-gray-500 font-semibold text-lg'>
              <span >Seus pedidos</span>
              <span className='font-bold'>{priceFormatter.format(Number(orderStatus?.totalPrice))}</span>
              <span className='text-orange-500 text-base bg-orange-100 font-semibold rounded-md p-1'>
                {orderStatus?.status === 'WAITING' && 'Aguardando'}
                {orderStatus?.status === 'ACCEPTED' && 'Aceito'}
                {orderStatus?.status === 'PREPARING' && 'Preparando'}
                {orderStatus?.status === 'DELIVERY' && 'Entrega'}
                {orderStatus?.status === 'FINISHED' && 'Entregue'}
              </span>
            </div>
          </div>
          <div className='mt-14 flex flex-col items-start  text-gray-500 font-semibold text-lg'>
            <div className='flex items-center justify-center gap-3'>
              {
                orderStatus?.status === 'WAITING'
                  ? (
                    <ClipboardCheck size={38} strokeWidth={1} className="text-orange-500" />
                  )
                  : (
                    <ClipboardCheck size={38} strokeWidth={1} className={`text-gray-500`} /> 
                   
                  )
              }

              <span className={`${ orderStatus?.status === "WAITING" ? 'text-orange-500' : 'text-gray-500'}`}>Aguadando recebimento</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3'>
              { orderStatus?.status === 'ACCEPTED' 
                ? <CheckCheck size={38} strokeWidth={1} className="text-orange-500" /> 
                : <CheckCheck size={38} strokeWidth={1} />}
              <span className={`${ orderStatus?.status === 'ACCEPTED' ? 'text-orange-500' : 'text-gray-500'}`} >Pedido em aceito</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3 my-1'>
              { orderStatus?.status === 'PREPARING' 
                ? <ChefHat size={38} strokeWidth={1} className='text-orange-500' /> 
                : <ChefHat size={38} strokeWidth={1} />
              }
              <span className={`${ orderStatus?.status === 'PREPARING' ? 'text-orange-500': 'text-gray-500'}`} >Pedido em producao</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3'>
              <img src={delivey} className='w-10' alt="" />
              <span>Saiu para entrega</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className='mt-1 flex items-center justify-center gap-3'>
              <img src={delivered} className='w-10' alt="" />
              <span>Entrega efetuada</span>
            </div>

          </div>
         
          <div className='w-full flex flex-col items-center justify-center gap-3 mt-10'>
            {orderStatus?.status === 'PREPARING' ? (
              <div>Avaliar Produto</div>  
            ):(
            <Button className='w-full bg-gray-200 text-gray-700 hover:bg-gray-400 text-lg'>Cancelar Pedido</Button>
              
            )}
            <Button className='w-full bg-orange-500 text-gray-100 hover:bg-orange-600 text-lg flex gap-4'>
              <img src={whatsapp} className='w-6' alt="" />
              Pizzaria
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}