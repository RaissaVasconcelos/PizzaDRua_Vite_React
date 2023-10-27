import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import { notify } from "../../../utils/toast";
import { api } from "../../../utils/axios";
import { Orders } from "../../../@types/interface";


interface CancelModalOrderProps {
  setOpenModalCancelOrder: (isOpen: boolean) => void;
  openModalCancelOrder: boolean;
  order: Orders

}

export const ModalHandleCancelOrder = ({ openModalCancelOrder, setOpenModalCancelOrder, order }: CancelModalOrderProps) => {

  const handleCancelOrder = async () => {
    await api.put('/order', {
      id: order.id,
      totalPrice: order.totalPrice,
      customerId: order.customer.id,
      payment: order.payment,
      methodDelivery: order.methodDelivery,
      status: 'CANCELED',
      itensOrder: [
        {
          product: order.itensOrder[0].product,
          quantity: order.itensOrder[0].quantity,
          size: order.itensOrder[0].size,
          mode: order.itensOrder[0].mode,
          price: order.itensOrder[0].price
        }
      ]
    },
      {
        headers: {
          Authorization: `Bearer ${parseCookies().accessToken}`
        }
      }
    )
    notify(`Pedido cancelado com sucesso`, 'bottom')
  
    setOpenModalCancelOrder(false)
    
  }

  return (

    <AlertDialog.Root open={openModalCancelOrder} >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <AlertDialog.Content className="sm:w-7/12 w-11/12 rounded py-10 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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