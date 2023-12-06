import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ToastContainer } from "react-toastify";
import { Orders } from "../@types/interface";
import { notify } from "../utils/toast";
import socket from "../utils/socketIO";
import ServiceOrder from "../infrastructure/services/order";


interface CancelModalOrderProps {
  setOpenModalCancelOrder: (isOpen: boolean) => void;
  onCancelOrder?: (orderId: string) => void
  openModalCancelOrder: boolean;
  order: Orders

}

export const ModalHandleCancelOrder = ({ onCancelOrder, openModalCancelOrder, setOpenModalCancelOrder, order }: CancelModalOrderProps) => {
  const serviceOrder = new ServiceOrder();
  const handleCancelOrder = async () => {
    await serviceOrder.updateOrderCustomer({ id: order.id, status: 'CANCELED' })
    onCancelOrder && onCancelOrder(order.id)
    notify(`Pedido cancelado com sucesso`, 'top-center')
    setOpenModalCancelOrder(false)
    socket.emit('orderCanceled', { orderId: order.id, status: 'CANCELED' });
  }

  return (

    <AlertDialog.Root open={openModalCancelOrder} >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <AlertDialog.Content className="sm:w-4/12 w-11/12 rounded py-10 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-gray-500 text-center font-semibold text-xl">
            Tem Certeza que deseja cancelar este pedido?
          </AlertDialog.Title>
          <div className="flex items-center justify-center gap-4 mt-8 font-semibold">
            <AlertDialog.Cancel asChild>
              <button onClick={() => setOpenModalCancelOrder(false)} className=" p-2 text-gray-100 rounded bg-gray-500">
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={handleCancelOrder} className="bg-red-500 text-red-100 p-2 rounded ">
                Sim, Cancelar
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
      <ToastContainer />
    </AlertDialog.Root>

  );
};