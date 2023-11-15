import { Plus } from "lucide-react";
import { CardAddress } from "./components/card";
import { NavLink } from 'react-router-dom'
import { ContextApp } from "../../context/context-app";
import { Button } from "../../components/ui/button";


export default function Address() {

  const { addresses } = ContextApp()


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-32">
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
      </div>
    </>
  )
}