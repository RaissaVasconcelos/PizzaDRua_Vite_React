import { Plus } from "lucide-react";
import { CardAddress } from "./components/card";
import { NavLink } from 'react-router-dom'
import { HeaderOrder } from "../../components/HeaderOrder";
import { Button } from "../../components/ui/button";
import Service from '../../infrastructure/services/address'
import { useEffect, useState } from "react";
import { IAddress } from '../../infrastructure/services/address/dtos/response/ShowAddressResponseDTO'


export default function Address() {
  const service = new Service()
  const [addresses, setAddresses] = useState<IAddress[]>([])

  const getAddress = async () => {
    const { data, statusCode } = await service.showAddress()
    console.log('address', data)
    console.log(statusCode)
    setAddresses(data)
  }
  
  useEffect(() => {
    getAddress()
  }, [])

  return (
    <>
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder title="Selecione um Endereço" link="/cart" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <Button disabled={addresses.length >= 3} className="w-4/5 text-orange-500 font-semibold  bg-transparent border-2 border-orange-500 my-4 rounded-md  py-2 px-4 ">
          <NavLink className="flex items-center justify-center gap-2" to="/create-address">
            <Plus />
            <span className="text-base ">Adicionar Endereco</span>
          </NavLink>
        </Button>
      <div className="w-full flex flex-col items-center justify-center gap-5">
          {addresses.map((address: any) => (
            <CardAddress
              address={address}
              key={address.id}
            />
          ))}
      </div>

      </div>
    </>
  )
}