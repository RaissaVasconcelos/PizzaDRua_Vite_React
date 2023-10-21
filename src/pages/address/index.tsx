import { Plus } from "lucide-react";
import { CardAddress } from "./components/card";
import { NavLink } from 'react-router-dom'
import {  ContextApp } from "../../context/context-app";
import { HeaderOrder } from "../../components/HeaderOrder";
import { Button } from "../../components/ui/button";


export default function Address() {

  const { addresses } = ContextApp()

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
          {addresses.map((address) => (
            <CardAddress
              address={address}
              key={address.id}
            />
          ))}
      </div>


        <div className=" absolute  rounded-tl py-10 rounded-tr bottom-0 bg-white w-full flex items-center justify-center ">
          <Button type="submit" className="w-11/12 relative h-12 font-semibold  bg-orange-500 text-gray-100 text-xl haver:bg-orange-600 ">
            Continuar
          </Button>
        </div>

      </div>
    </>
  )
}