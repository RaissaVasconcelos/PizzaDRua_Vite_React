import * as Dialog from '@radix-ui/react-dialog'
import { Mail, Phone, MapPin, X, ExternalLink, User, XCircle } from 'lucide-react'
import { ContextAuthApp } from '../../context/auth-context'
import order from '../../assets/order.png'
import { destroyCookie } from 'nookies'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";


interface ModalProfileProps {
  setOpenModal: (value: boolean) => void
  openModal: boolean
}

export const ModalProfile = ({ openModal, setOpenModal }: ModalProfileProps) => {

  const { customer } = ContextAuthApp()
  const auth = getAuth();
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      destroyCookie(undefined, 'accessToken')
      destroyCookie(undefined, 'customer')
      navigate('/sign-in')
      setOpenModal(false)
      window.location.reload()
    } catch (error) {
      console.log("Erro ao deslogar", error);

    }
  }
  return (
    <Dialog.Root open={openModal}>

      <Dialog.Portal>
        <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6] " />
        <Dialog.Content className="w-11/12  rounded py-10 px-12 bg-gray-100 z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close onClick={() => setOpenModal(false)} className="absolute bg-transparent border-spacing-0 top-5 right-5 text-gray-300 line-through ">
            <X size={24} className='text-gray-500' />
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
              <Mail size={24} />
              {customer && (
                <span className='text-gray-500 text-lg'>{customer.email}</span>
              )}

            </div>
            <div className='flex items-center justify-start gap-4'>
              <Phone size={24} />
              <span className='text-gray-500 text-lg'>(11) 99999-9999</span>
            </div>
            <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full pt-4 flex items-center justify-between gap-4'>
              <NavLink onClick={() => setOpenModal(false)} to={'/address'} className='flex items-center justify-start gap-4'>
                <MapPin size={24} />
                <span className=' text-lg'>Endereços</span>
              </NavLink>
              <ExternalLink />
            </div>
            <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full py-4 flex items-center justify-between gap-4'>
              <NavLink onClick={() => setOpenModal(false)} to={'/orders'} className='flex items-center justify-start gap-4'>
                <img src={order} alt="" className='w-5' />
                <span className=' text-lg'>Pedidos</span>
              </NavLink>
              <ExternalLink />
            </div>
            <div className='border-t-2 cursor-pointer text-orange-500 border-gray-200 w-full py-4 flex items-center justify-between gap-4'>
              <button onClick={handleSignOut} className='flex items-center justify-start gap-4'>
                <XCircle size={24} />
                <span className=' text-lg'>Sair</span>
              </button>
            </div>
          </Dialog.Title>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
