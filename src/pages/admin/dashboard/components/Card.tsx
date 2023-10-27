import { ClipboardCheck } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ModalHandleChangeStatus } from "./ModalHandlechangeStatus";
import { Orders } from "../../../../@types/interface";

interface CardProps {
  order: Orders
  onChangeOrderStatus: (orderId: string, status: string) => void
  onCancelOrder: (orderId: string) => void
}


export const Card = ({order, onChangeOrderStatus, onCancelOrder}: CardProps) => {

  return (
      <AlertDialog.Root >
        <AlertDialog.Trigger asChild>
          <button className="w-11/12 cursor-pointer my-2 h-36 flex bg-white items-center justify-center ">
              <div className=" flex flex-col items-center justify-center ">
                  <span>{order.customer.name}</span>
                  <span className="text-gray-500">Pedidos ({order.itensOrder.length})</span>
              </div>
          </button>
        </AlertDialog.Trigger>
        <ModalHandleChangeStatus 
          onChangeOrderStatus={onChangeOrderStatus}
          onCancelOrder={onCancelOrder}
          order={order} 
        />
      </AlertDialog.Root>
    
  )
}