import * as Dialog from '@radix-ui/react-dialog'
import { Mail, Phone, MapPin , X, ExternalLink, StickyNote } from 'lucide-react'


export const ModalProfile = () => {
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
            <img
              className="rounded-full bg-black w-12 h-12 object-fill"
              src="https://images.unsplash.com/photo-1693854317580-1f4e46e7f846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
            <span className="text-gray-500 font-light text-xl">
              Hudson felipe
            </span>
          </button>
          <div className='flex items-center justify-start gap-4'>
            <Mail size={24}/>
            <span className='text-gray-500 text-lg'>pZyvZ@example.com</span>
          </div>
          <div className='flex items-center justify-start gap-4'>
            <Phone size={24} />
            <span className='text-gray-500 text-lg'>(11) 99999-9999</span>
        </div>
          <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full pt-4 flex items-center justify-between gap-4'>
            <div className='flex items-center justify-start gap-4'>
              <MapPin  size={24}/>
              <span className=' text-lg'>Enderecos</span>
            </div>
            <ExternalLink />
          </div>
          <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full py-4 flex items-center justify-between gap-4'>
            <div className='flex items-center justify-start gap-4'>
              <StickyNote size={24}/>
              <span className=' text-lg'>Pedidos</span>
            </div>
            <ExternalLink />
          </div>
        </Dialog.Title>
       
      </Dialog.Content>
    </Dialog.Portal>
  )
}
