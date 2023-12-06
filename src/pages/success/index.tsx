import success from '../../assets/success.svg'
import { Button } from '../../components/ui/button'
import { useEffect, useState } from 'react'
import { Orders } from '../../@types/interface'
import { parseCookies } from 'nookies'
import { api } from '../../utils/axios'
import { NavLink, useParams } from 'react-router-dom'
import { ContextCartApp } from '../../context/cart-context'

export default function Success() {
  const [order, setOrder] = useState<Orders | null>(null)
  const { clearCart } = ContextCartApp()
  const { id } = useParams();
  const getOrders = async () => {

    const token = parseCookies().accessToken
    const response = await api.get(`/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setOrder(response.data)

  }
  useEffect(() => {
    getOrders()
    clearCart()
  }, [])

  return (

    <div className='w-full flex flex-col items-center justify-center mt-36'>
      <img src={success} alt="" className='w-60' />
      <div className='w-10/12 flex flex-col items-center justify-center mt-10 gap-5'>
        <h2 className=' text-center text-2xl font-bold text-gray-600'>Seu pedido foi feito com sucesso!</h2>
        <h2 className='text-center text-xl text-gray-600 '>
          Obrigado pelo seu pedido, você pode acompanhar a entrega na seção de acompanhamento</h2>
        <NavLink className={'w-full'} to={`/tracking/${order?.id}`}>
          <Button className='w-full mt-10 text-lg bg-orange-500 hover:bg-orange-600'>Acompanhe seu pedido.</Button>
        </NavLink>
      </div>
    </div>

  )
}