import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { User, UserCircle, XCircle } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalProfile } from './ModalProdile'
import { ContextApp } from '../../context/context-app'
import { destroyCookie } from 'nookies'
import { NavLink, useNavigate } from 'react-router-dom'


export const Profile = () => {
  const { customer } = ContextApp()
  const navigate = useNavigate()
  const signOut = () => {
    destroyCookie(undefined, 'accessToken')
    destroyCookie(undefined, 'customer')
    navigate('/sign-in')
  }
  return (
    <DropdownMenu.Root>
      {customer ? (
        <DropdownMenu.Trigger >
          {customer.photoURL ? (
            <img src={customer.photoURL} className='rounded-full w-14' alt="" />
          ) : (

              <div className='p-4  bg-gray-600 rounded-full'>
                <User size={28} />
              </div>

          )}
        </DropdownMenu.Trigger>
      ) : (
          <NavLink to='/sign-in' className='p-4  bg-gray-600 rounded-full'>
            <User size={28} />
        </NavLink>
      )}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="bg-gray-200 rounded-lg mt-2 text-gray-50 p-6 flex flex-col items-start justify-start gap-6 w-96"
        >
         
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex items-center justify-start gap-4">
                <UserCircle className="text-orange-500 w-8" />
                <span className="text-gray-700 font-semibold text-base hover:text-purple-300">
                  Meu Perfil
                </span>
              </button>
            </Dialog.Trigger>
            <ModalProfile />
          </Dialog.Root>

          <DropdownMenu.Item className="cursor-pointer">
            <div className="flex items-center justify-start gap-4  ">
              <XCircle className="text-orange-500 w-8" />
              <button onClick={() => signOut()} className="text-gray-700 font-semibold text-base0">
                Sair da plataforma
              </button>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="cursor-pointer">
            <span className="text-gray-500 font-extralight hover:text-purple-300">
              PizzaD'Rua
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
