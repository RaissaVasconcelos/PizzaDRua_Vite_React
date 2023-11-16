
import { useState } from 'react';
import { ModalProfile } from './ModalProdile'
import { ContextAuthApp } from '../../context/auth-context';
import { User } from 'lucide-react';
import { NavLink } from 'react-router-dom';


export const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { customer } = ContextAuthApp()
  return (
    <>
      <div className='flex items-center justify-center'>
        {
          customer ? (
            <button onClick={() => setOpenModal(true)} >
              {customer.photoURL ? (
                <img src={customer.photoURL} className='rounded-full w-[58px]' alt="" />
              ) : (

                <div className='p-4  bg-gray-600 rounded-full'>
                  <User size={28} />
                </div>

              )}
            </button>
          ) : (
            <div className='p-4  bg-gray-600 rounded-full '>
              <NavLink to="/sign-in">
                <User size={28}/>
              </NavLink>
            </div>
          )
        }
      </div>
      <ModalProfile
        openModal={openModal}
        setOpenModal={setOpenModal}
       />
    </>
  )
}
