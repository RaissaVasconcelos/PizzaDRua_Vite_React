
import { Building2, Edit, Home, MapPin, MapPinOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AddressProps, ContextApp } from "../context/context-app";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";



export const CardAddress = () => {
  const {addresses, getAddress} = ContextApp()
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null)

  const handleAddress = () => {
    if (getAddress) {
      setCurrentAddress(getAddress)
    } else {
      setCurrentAddress(addresses[0])
    }
  }

  useEffect(() => {
    handleAddress()
  }, [addresses])

  

  return (
    <>
     {currentAddress  ? (
        <div className="w-11/12 mt-10 flex bg-white  rounded flex-col items-center justify-center p-4">
          <header className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between gap-2 text-orange-500">
              {getAddress ? (
                getAddress.type === "Casa" ? <Home size={20} /> : getAddress.type === "Trabalho" ? <Building2 size={18} /> : <MapPin />
              ) : (
                addresses[0].type === "Casa" ? <Home size={20} /> : addresses[0].type === "Trabalho" ? <Building2 size={18} /> : <MapPin />
              )}
              <span>{getAddress ? getAddress.type : addresses[0].type}</span>
            </div>
            <NavLink to="/address">
              <Edit size={24} className="text-gray-500" />
            </NavLink>
          </header>
          <div className="w-full flex items-start justify-center flex-col">
            <div className=" w-11/12 mt-2 flex gap-2">
              <span>{getAddress ? getAddress.street : addresses[0].street},</span>
              <span>{getAddress ? getAddress.number : addresses[0].number} - </span>
              <span>{ getAddress ? getAddress.neighborhood.name : addresses[0].neighborhood.name}</span>
            </div>
            <span>{getAddress ? getAddress.phone : addresses[0].phone}</span>
            <span>{getAddress ? getAddress.zipCode : addresses[0].zipCode}</span>
          </div>
      </div>
     ):(
      
      <div className="mt-5 flex flex-col items-center justify-center w-11/12">
        <MapPinOff className="w-10 h-10 text-gray-300" />
        <p className="text-center text-gray-500 text-lg font-medium">Selecione ou cadastre um endereço para entrega</p>
        <NavLink className='w-full flex items-center justify-center' to={"/address"}>
          <Button className="rounded-[8px]  text-gray-100 text-lg mt-5 w-11/12 bg-red-500 hover:bg-red-600 ">Cadastrar Endereço</Button>
        </NavLink>
      </div> 
        )}
    </>
    
  )
}
