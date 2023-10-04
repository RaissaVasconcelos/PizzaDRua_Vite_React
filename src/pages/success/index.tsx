import { NavLink } from 'react-router-dom'
import success from '../../assets/success.svg'
import { Button } from '../../components/ui/button'

export default function Success() {
  return (
    <div className="h-screen max-w-[1100px] m-auto  flex flex-col items-center justify-start">
      <div className='w-full flex flex-col items-center justify-center mt-36'>
          <img src={success} alt="" className='w-60'/>
          <div className='w-10/12 flex flex-col items-center justify-center mt-10 gap-5'>
            <h2 className=' text-center text-2xl font-bold text-gray-600'>Seu pedido foi feito com sucesso!</h2>
            <h2 className='text-center text-xl text-gray-600 '>
            Obrigado pelo seu pedido, você pode acompanhar a entrega na seção de acompanhamento</h2>
            <NavLink className={'w-full'} to='/tracking'>
              <Button className='w-full mt-10 text-lg bg-orange-500 hover:bg-orange-600'>Acompanhe seu pedido.</Button>
            </NavLink>
          </div>
      </div>
    </div>
  )
}