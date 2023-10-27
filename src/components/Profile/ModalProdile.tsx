import * as Dialog from '@radix-ui/react-dialog'
import { Mail, Phone, MapPin , X, ExternalLink, StickyNote, User } from 'lucide-react'
import { ContextApp } from '../../context/context-app'
import order from '../../assets/order.png'


export const ModalProfile = () => {
  const { customer } = ContextApp()
  return (
    <Dialog.Portal>
      <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <Dialog.Content className="w-11/12  rounded py-10 px-12 bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Dialog.Close className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
          <X size={24} />
        </Dialog.Close>
       
        <Dialog.Title className="text-gray-500 font-semibold text-4xl flex flex-col items-start justify-start gap-5">
          <h2 className="text-gray-500 font-semibold text-xl border-b-2 border-gray-200 w-full py-4">
            Perfil
          </h2>
          <button className="flex items-center justify-start gap-4 hover:bg-gray-200 w-full  rounded-md">
            {customer ? (
              <img src={customer.photoURL} className='rounded-full w-14' alt="" />
            ) : (
              <a href='/sign-in' className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-4 rounded-full">
                <User />
              </a>
            )}
            {customer && (
              <span className="text-gray-600 font-semibold text-base">
                {customer.displayName}
              </span>
            )}
          </button>
          <div className='flex items-center justify-start gap-4'>
            <Mail size={24}/>
            {customer && (
              <span className='text-gray-500 text-lg'>{customer.email}</span>
            )}
            
          </div>
          <div className='flex items-center justify-start gap-4'>
            <Phone size={24} />
            <span className='text-gray-500 text-lg'>(11) 99999-9999</span>
        </div>
          <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full pt-4 flex items-center justify-between gap-4'>
            <a href={'/address'} className='flex items-center justify-start gap-4'>
              <MapPin  size={24}/>
              <span className=' text-lg'>Enderecos</span>
            </a>
            <ExternalLink />
          </div>
          <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full py-4 flex items-center justify-between gap-4'>
            <a href={'/orders'} className='flex items-center justify-start gap-4'>
              <img src={order}  alt="" className='w-5'/>
              <span className=' text-lg'>Pedidos</span>
            </a>
            <ExternalLink />
          </div>
        </Dialog.Title>
       
      </Dialog.Content>
    </Dialog.Portal>
  )
}
