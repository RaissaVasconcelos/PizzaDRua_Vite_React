import { useEffect, useState } from "react";
import { api } from "../../utils/axios";
import { NavLink } from 'react-router-dom'
import { parseCookies } from "nookies";
import { Plus } from "lucide-react";

import { CardAddress } from "./components/card";
import { ContextApp } from "../../context/context-app";
import { HeaderOrder } from "../../components/HeaderOrder";
import { Button } from "../../components/ui/button";

export interface AddressProps {
  id: string
  type: "HOME" | "WORK" | "OTHER"
  street: string
  number: string
  zipCode: string
  phone: string
  standard: boolean,
  neighborhood: {
    id: string
    name: string
    tax: string
  }
}

export default function Address() {
  const [addresses, setAddresses] = useState<AddressProps[]>([])
  const { setCurrentAddress } = ContextApp()

  const getAddresses = async () => {
    const token = parseCookies().accessToken    
    const response = await api.get('/address', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const standardAddress = response.data.find((element: AddressProps) => element.standard === true)
    setCurrentAddress(standardAddress)
    setAddresses(response.data)
  }

  useEffect(() => {
    getAddresses()
  }, []) 

  return (
    <div className="h-screen max-w-[1100px] m-auto  flex flex-col items-center justify-start">
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder title="Selecione um Endereço" link="/cart" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <Button
          disabled={addresses.length >= 3}
          className="w-4/5 text-orange-500 font-semibold  bg-transparent border-2 border-orange-500 my-4 rounded-md  py-2 px-4 ">
          <NavLink className="flex items-center justify-center gap-2" to="/create-address">
            <Plus />
            <span className="text-base ">Adicionar Endereco</span>
          </NavLink>
        </Button>
      <div className="w-full flex flex-col items-center justify-center gap-5">
          {addresses.map((address) => (
            <CardAddress
              neighborhood={address.neighborhood}
              number={address.number}
              street={address.street}
              type={address.type}
              phone={address.phone}
              zipCode={address.zipCode}
              addressId={address.id}
              standard={address.standard}
            />
          ))}
      </div>


        <div className="my-10 w-full flex items-center justify-center ">
          <Button type="submit" className="w-11/12 font-semibold  bg-orange-500 text-gray-100 text-lg haver:bg-orange-600 ">
            Continuar
          </Button>
        </div>

      </div>
    </div>
  )
}