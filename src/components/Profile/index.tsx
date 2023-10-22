import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { User, UserCircle, XCircle } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalProfile } from './ModalProdile'
import { ContextApp } from '../../context/context-app'
import { destroyCookie } from 'nookies'
import { useNavigate } from 'react-router-dom' 


export const Profile = () => {
  const { isAuthenticated, customer } = ContextApp()
  const navigate = useNavigate()
  const signOut = () => {
    destroyCookie(undefined, 'accessToken')
    destroyCookie(undefined, 'customer')
    navigate('/')
  }

  return (
    <DropdownMenu.Root>
      {isAuthenticated ? (
        <DropdownMenu.Trigger >
          {customer ? (
            <img src={customer.photoURL} className='rounded-full w-14' alt="" />
          ) : (
            <a href='/sign-in' className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-4 rounded-full">
              <User />
            </a>
          )}
        </DropdownMenu.Trigger>
      ) : (
        <a href='/sign-in' className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-4 rounded-full">
          <User />
        </a>
      )}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="bg-white rounded-lg mt-2 text-purple-300 p-6 flex flex-col items-start justify-start gap-6 w-96"
        >
          <DropdownMenu.Item className="cursor-pointer ">
            <div className="flex items-center justify-start gap-4">
              {customer ? (
                <img src={customer.photoURL} className='rounded-full w-14' alt="" />
              ) : (
                <a href='/sign-in' className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-4 rounded-full">
                  <User />
                </a>
              )}
              {customer && (
                <span className="text-gray-600 font-semibold text-base hover:text-purple-300">
                  {customer.displayName}
                </span>
              )}
              
            </div>
          </DropdownMenu.Item>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex items-center justify-start gap-4">
                <UserCircle className="text-orange-500 w-8" />
                <span className="text-gray-600 font-semibold text-base hover:text-purple-300">
                  Meu Perfil
                </span>
              </button>
            </Dialog.Trigger>
            <ModalProfile />
          </Dialog.Root>

          <DropdownMenu.Item className="cursor-pointer">
            <div className="flex items-center justify-start gap-4  ">
              <XCircle className="text-orange-500 w-8" />
              <button onClick={() => signOut()} className="text-gray-600 font-semibold text-base hover:text-purple-300">
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
