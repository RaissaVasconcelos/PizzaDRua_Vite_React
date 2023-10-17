import { ClipboardCheck } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ModalHandleChangeStatus } from "./ModalHandlechangeStatus";

interface CardProps {
  title: string;
  icon: any;
  payment: string;
  totalPrice: string;
  methodDelivery: string;
  itemsOrder: {
    mode?: string;
    size: string;
    product: string[];
    quantityProduct: number;
  }

}


export const Card = () => {
  return (
    <div className="border-[1px] rounded w-full border-gray-300 flex flex-col items-center justify-center">
      <header className="flex  items-center justify-center gap-3 py-2">
        <ClipboardCheck className="text-orange-500"/>
         <h2 className="text-xl">Aceitar Pedido</h2> 
      </header>
      <AlertDialog.Root >
        <AlertDialog.Trigger asChild>
          <button className="w-11/12 cursor-pointer my-2 h-36 flex bg-white items-center justify-center ">
              <div className=" flex flex-col items-center justify-center ">
                  <span>Hudson Felipe</span>
                  <span className="text-gray-500">Pedidos (2)</span>
              </div>
          </button>
        </AlertDialog.Trigger>
        <ModalHandleChangeStatus />
      </AlertDialog.Root>
    </div>
  )
}