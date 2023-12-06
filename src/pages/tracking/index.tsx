import { Button } from '../../components/ui/button'
import pizza from '../../assets/caixa.png'
import delivey from '../../assets/delivery-white.png'
import deliveryGray from '../../assets/delivery-gray.png'
import pickup from '../../assets/pickup-white.png'
import pickupGray from '../../assets/pickup-gray.png'
import whatsapp from '../../assets/whatsapp.svg'
import { useEffect, useState } from 'react'
import { api } from '../../utils/axios'
import { Check, CheckCheck, ChefHat, ClipboardCheck } from 'lucide-react'
import { Orders } from '../../@types/interface'
import socket from '../../utils/socketIO'
import { useParams } from 'react-router-dom'
import { notify } from '../../utils/toast'
import { ModalHandleCancelOrder } from '../../components/ModalHandleCancelOrder'
import { priceFormatter } from '../../utils/formatter'
import ServiceOrder from '../../infrastructure/services/order'

export default function Tracking() {
  const [status, setStatus] = useState('WAITING')
  const [order, setOrder] = useState<Orders>()
  const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false)
  const { id } = useParams();
  const serviceOrder = new ServiceOrder()

  useEffect(() => {
    socket.on('statusUpdate', (data) => {
      if (data) {
        setStatus(data.status)
      }
    })
  }, [])

  socket.emit('OrderRoom', {
    roomId: id
  })



  const getOrder = async () => {
    const response = await api.get(`/order/${id}`)

    setOrder(response.data)
    setStatus(response.data.status)

  }

  const handleFinishedOrder = async () => {
    if (!order) {
      return null
    }

    await serviceOrder.updateOrderCustomer({ id: order.id, status: 'FINISHED' })
    notify(`Entrega efetuada com sucesso`, 'bottom')

  }
  useEffect(() => {
    getOrder()
  }, [])

  return (
    <div className="my-10 mt-20 w-full flex items-center justify-center">
      <div className='w-11/12 flex flex-col items-center justify-center'>

        <div className='w-full'>
          <div className='w-full mt-10 flex items-center justify-start gap-7 p-2 bg-white'>
            <img src={pizza} alt="" className='w-20' />
            <div className='flex flex-col items-start gap-2 text-gray-500 font-semibold text-lg'>
              <span >Seus pedidos</span>
              <span className='font-bold'>{priceFormatter.format(Number(order?.totalPrice))}</span>
              <span className={`${status === 'CANCELED' ? 'text-red-500 bg-red-100' : 'text-orange-500 bg-orange-100'}  text-base  font-semibold rounded-md p-1`}>
                {status === 'WAITING' && 'AGUARDE'}
                {status === 'ACCEPTED' && 'ACEITO'}
                {status === 'PREPARING' && 'PREPARANDO'}
                {status === 'DELIVERY' && 'SAIU PARA ENTREGA'}
                {status === 'FINISHED' && 'ENTREGUE'}
                {status === 'CANCELED' && 'CANCELADO'}
                {status === 'AWAITING_WITHDRAWAL' && 'AGUARDANDO RETIRADA'}
              </span>
            </div>
          </div>
          <div className='mt-14 flex flex-col items-start  text-gray-500 font-semibold text-base'>
            <div className='flex items-center justify-center gap-3'>
              {

                status === 'WAITING'
                  ? (
                    <div className="bg-orange-500 text-gray-50 rounded-full p-2">
                      <ClipboardCheck
                        size={25}
                        strokeWidth={1}
                      />
                    </div>
                  )
                  : (
                    <div className='bg-gray-200 text-gray-500 rounded-full p-2'>
                      <ClipboardCheck
                        size={25}
                        strokeWidth={1}
                      />
                    </div>
                  )
              }
              <span className={`${status === "WAITING"
                ? 'text-orange-500'
                : 'text-gray-500'}`}
              >
                AGUARDANDO RECEBIMENTO
              </span>
            </div>
            <div className='ml-[18px] h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3'>
              {status === 'ACCEPTED'
                ?
                <div className="bg-orange-500 text-gray-50 rounded-full p-2">
                  <CheckCheck
                    size={25}
                    strokeWidth={1}

                  />
                </div>
                :
                <div className="bg-gray-200 text-gray-500 rounded-full p-2">
                  <CheckCheck
                    size={25}
                    strokeWidth={1}

                  />
                </div>
              }
              <span className={`${status === 'ACCEPTED'
                ? 'text-orange-500'
                : 'text-gray-500'}`}
              >
                PEDIDO ACEITO
              </span>
            </div>
            <div className='ml-[18px] h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3 '>
              {status === 'PREPARING'
                ?
                <div className="bg-orange-500 text-gray-50 rounded-full p-2">
                  <ChefHat
                    size={25}
                    strokeWidth={1}
                  />
                </div>
                :
                <div className='bg-gray-200 text-gray-500 rounded-full p-2'>
                  <ChefHat
                    size={25}
                    strokeWidth={1}
                  />
                </div>

              }
              <span className={`${status === 'PREPARING' ? 'text-orange-500' : 'text-gray-500'}`} >PEDIDO EM PRODUÇÃO</span>
            </div>
            {order?.methodDelivery === 'DELIVERY' && (
              <>
                <div className='ml-[18px] h-10 w-[2px] bg-gray-600' />
                <div className=' flex items-center justify-center gap-3'>
                  {status === 'DELIVERY'
                    ? <div className='bg-orange-500 text-gray-50 rounded-full p-2'>
                      <img
                        src={delivey}
                        className='w-6' alt=""
                      />
                    </div>
                    : <div className='bg-gray-200 rounded-full p-2' >
                      <img
                        src={deliveryGray}
                        className='w-6'
                        alt=""
                      />
                    </div>
                  }
                  <span className={`${status === 'DELIVERY' ? 'text-orange-500' : 'text-gray-500'}`} >SAIU PARA ENTREGA</span>
                </div>
              </>

            )}
            <div className='ml-[18px] h-10 w-[2px] bg-gray-600' />
            <div className=' flex items-center justify-center gap-3'>
              {order?.methodDelivery === 'PICKUP'
                ? (
                  <>
                    {status === 'AWAITING_WITHDRAWAL' || status === 'FINISHED'
                      ? <div className='flex items-center justify-center gap-3'>
                        < Check className='bg-emerald-500 text-gray-50 rounded-full p-2'
                          size={37}
                        />
                        <span className={`text-gray-500`}>PEDIDO PRONTO</span>
                      </div>
                      : <div className="flex items-center justify-center gap-3 ">
                        < Check className='bg-gray-200 text-gray-500 rounded-full p-2'
                          size={37}
                        />
                        <span className={`text-gray-500`}>PEDIDO PRONTO</span>
                      </div>
                    }
                  </>
                )
                : (
                  <>
                    {status === 'FINISHED'
                      ? <div className='bg-orange-500 text-gray-50 rounded-full p-2'>
                        <img
                          src={pickup}
                          className='w-6 ' alt=""
                        />
                      </div>
                      :
                      <div className='bg-gray-200 rounded-full p-2'>
                        <img
                          src={pickupGray}
                          className='w-6 ' alt="" />
                      </div>
                    }
                    <span className={`${status === 'FINISHED' ? 'text-orange-500' : 'text-gray-500'}`}>ENTREGA EFETUADA</span>
                  </>

                )}
            </div>
          </div>

          <div className='w-full flex flex-col  items-center justify-center gap-2 mt-10'>
            {(status === 'WAITING' || status === 'ACCEPTED') && (
              <Button onClick={() => setOpenModalCancelOrder(true)} className='w-full  bg-gray-200 text-gray-700 hover:bg-gray-400 text-lg'>Cancelar Pedido</Button>
            )}
            {(status === 'DELIVERY') && (
              <Button onClick={handleFinishedOrder} className='w-full  bg-gray-700 text-gray-100 hover:bg-gray-400 text-lg'>Confirmar Entrega</Button>
            )}

            <ModalHandleCancelOrder
              openModalCancelOrder={openModalCancelOrder}
              setOpenModalCancelOrder={setOpenModalCancelOrder}
              order={order!}
            />
            <Button
              className='w-full bg-orange-500 text-gray-100 hover:bg-orange-600 text-lg flex gap-4'
              onClick={() => {
                const phoneNumber = '9992242967'; // Substitua pelo número de telefone que deseja abrir no WhatsApp
                const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
                window.open(whatsappURL, '_blank');
              }}
            >
              <img src={whatsapp} className='w-6' alt='' />
              Pizzaria
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}