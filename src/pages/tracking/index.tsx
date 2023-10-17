
import { HeaderOrder } from '../../components/HeaderOrder'
import { Button } from '../../components/ui/button'
import pizza from '../../assets/Vector.svg'
import './statusColor.css'
import delivey from '../../assets/delivery.png'
import delivered from '../../assets/delivered.png'
import whatsapp from '../../assets/whatsapp.svg'
import { useEffect, useState } from 'react'
import { api } from '../../utils/axios'
import { ChefHat, Package } from 'lucide-react'
import { ContextApp } from '../../context/context-app'


export default function Tracking() {
  const {cartTotalPrice} = ContextApp()
  const [status, setStatus] = useState('WAITING')
  


  const getStatus = async () => {
    const response = await api.get('/orders')
    const statusData = response.data.filter((item: string) => item !== 'FINISHED')
    setStatus(statusData[0].status)
  }

  useEffect(() => {
    getStatus()
  }, [])

  

  return (
    <div className="mb-10">
      <div className='w-11/12 flex flex-col items-center justify-center'>
        <header className='w-full flex items-center  justify-center mt-6 font-semibold text-2xl text-gray-500'>
          <h2>Statos do pedido</h2>
        </header>
        <div className='w-full'>
          <div className='w-full mt-10 flex items-center justify-start gap-5 p-2 bg-white'>
            <img src={pizza} alt="" />
            <div className='flex flex-col items-start gap-2 text-gray-500 font-semibold text-lg'>
              <span >Seus pedidos</span>
              <span className='font-bold'>R$ {cartTotalPrice}</span>
              <span className='text-orange-500 text-base bg-orange-100 font-semibold rounded-md p-1'>{status}</span>
            </div>
          </div>
          <div className='mt-14 flex flex-col items-start  text-gray-500 font-semibold text-lg'>
            <div className='flex items-center justify-center gap-3'>
              {
                status === 'WAITING'
                  ? (
                    <Package
                      size={38}
                      strokeWidth={1}
                      className={` text-orange-500`}
                    />
                  )
                  : (
                    <Package
                      size={38}
                      strokeWidth={1}
                      className={`text-gray-500`}
                    />
                  )
              }

              <span className={`${status === "WAITING" ? 'text-orange-500' : 'text-gray-500'}`}>Aguadando recebimento</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3'>
              {status === 'ACCEPTED' ? <Package size={38} strokeWidth={1} className='text-orange-500' /> : <Package size={38} strokeWidth={1} />}
              <span className={`${status === 'ACCEPTED' ? 'text-orange-500' : 'text-gray-500'}`} >Pedido em aceito</span>
            </div>
            <div className='ml-4 h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3 my-1'>
              {status === 'PREPARING' ? <ChefHat size={38} strokeWidth={1} className='text-orange-500' /> : <ChefHat size={38} strokeWidth={1} />}
              <span className={`${status === 'PREPARING' ? 'text-orange-500': 'text-gray-500'}`} >Pedido em producao</span>
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
            <Button className='w-full bg-gray-200 text-gray-700 hover:bg-gray-400 text-lg'>Cancelar Pedido</Button>
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