import { useEffect, useState } from "react";
import { api } from "../../../utils/axios";
import { TrTable } from "./components/TrTable";
import * as Dialog from "@radix-ui/react-dialog";
import ModalRegisterNeighborhood from "./components/ModalRegisterNeighborhood";

interface NeighborhoodsProps {
  id: string;
  name: string;
  tax: string;
}

export default function Neighborhoods() {

  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodsProps[]>([])
  

  const getNeighborhoods = async () => {
    const response = await api.get('/neighborhood')

    setNeighborhoods(response.data)
  }

useEffect(() => {
  getNeighborhoods()
},[])
  return (
   
      <div className="w-11/12 overflow-auto mt-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-center text-gray-600  mb-8 font-semibold">
          Histórico de Bairros
        </h2>
      <div className=" w-full flex items-center justify-end mb-7"> 
        <Dialog.Root  >
          <Dialog.Trigger asChild>
            <button className="bg-orange-500 text-gray-100 p-2 rounded font-medium">
              Cadastrar Bairro
            </button>
          </Dialog.Trigger>
          <ModalRegisterNeighborhood />
        </Dialog.Root>
      </div>
        <table className="w-full min-w-[600px]">
          <thead className="">
            <tr>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-tl">
                Bairro
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                Taxa
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear ">
                Editar
              </th>
              <th className="bg-gray-700 p-4 text-left text-gray-200 text-xl ease-linear rounded-tr">
                Excluir
              </th>
            </tr>
          </thead>
          <tbody className="flex-col items-center justify-center gap-2 text-gray-200">
          {neighborhoods?.map((item) => (
            <TrTable 
              id={item.id} 
              name={item.name} 
              tax={item.tax}/>
            ))}
          </tbody>
        </table>
      </div>
    
  )
}