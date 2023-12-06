import { CheckSquare, ChefHat, ClipboardCheck, Truck, X } from "lucide-react";
import image from '../../../../assets/Vector.png'
import { priceFormatter } from "../../../../utils/formatter";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../../../components/ui/button";
import whatsapp from '../../../../assets/whatsapp-green.svg'
import { OrderData } from "../../../../@types/interface";
import ServiceOrder from "../../../../infrastructure/services/order";

interface ModalOrderProps {
  order: OrderData
  setOpenModal: (value: boolean) => void
  openModal: boolean

}

export const ModalTableHandleChangeStatus = ({ order, setOpenModal, openModal }: ModalOrderProps) => {
  const imprimirPedido = () => {
    window.print()
  }
  const serviceOrder = new ServiceOrder();

  const handleChangeOrderStatus = async () => {

    const newStatus = order.status === 'WAITING'
      ? 'ACCEPTED'
      : order.status === 'ACCEPTED'
        ? 'PREPARING'
        : order.status === 'PREPARING' && order.methodDelivery === 'PICKUP'
          ? 'AWAITING_WITHDRAWAL'
          : order.status === 'PREPARING' && order.methodDelivery === 'DELIVERY'
            ? 'DELIVERY'
            : 'FINISHED'


    await serviceOrder.updateOrderAdmin({
      id: order.orderId,
      status: newStatus
    })
    setOpenModal(false)
  }


  return (
    <Dialog.Root open={openModal} >
      <Dialog.Portal >
        <Dialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
        <Dialog.Content className="md:w-6/12 w-11/12 rounded p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <header className="flex items-center justify-start">
            <div className="flex w-full flex-col items-start justify-center gap-4">
              <div className=" w-full flex items-center justify-between">
                <h2 className="font-semibold">{order.methodDelivery === 'PICKUP' ? order.withdrawalName : order.customerName}</h2>
                <Dialog.Close onClick={() => setOpenModal(false)}>
                  <X className="text-gary-600" />
                </Dialog.Close>

              </div>

            </div>

          </header>
          <Dialog.Title className="text-gray-500 text-center font-semibold text-xl">
            <main className="mt-10 flex flex-col items-start justify-center gap-3">
              {order.itensOrder.map((item: any) => (
                <div className="flex items-start justify-center gap-2">
                  <img src={item.image_url ? item.image_url : image} className="w-12 object-contain rounded" alt="" />
                  <div className="flex items-start justify-center gap-3">
                    <p className="text-lg">{item.quantity}x</p>
                    <div className="text-base flex flex-col items-start justify-center">
                      <div className="flex items-center justify-start gap-2">
                        {item.product.map((item: any) => (
                          <span key={item}> - {item}</span>
                        ))}
                      </div>
                      <p>{priceFormatter.format(Number(item.price))}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full flex flex-col items-start justify-center mt-7">
                {order.methodDelivery === 'PICKUP' ? (
                  <Button
                    className='border-[1px] border-green-500 text-green-500 bg-transparent hover:bg-transparent text-lg flex gap-2'
                    onClick={() => {

                      const whatsappURL = `https://web.whatsapp.com/send?phone=${order.customerPhone}`;
                      window.open(whatsappURL, '_blank');
                    }}
                  >
                    <img src={whatsapp} className='w-6' alt='' />
                    {order.customerPhone}
                  </Button>
                ) : (

                  <Button
                    className='border-[1px] border-green-500 text-green-500 bg-transparent hover:bg-transparent text-lg flex gap-2'
                    onClick={() => {

                      const whatsappURL = `https://web.whatsapp.com/send?phone=${order.address.phone}`;
                      window.open(whatsappURL, '_blank');
                    }}
                  >
                    <img src={whatsapp} className='w-6' alt='' />
                    {order.address.phone}
                  </Button>
                )}
                {order.methodDelivery === 'DELIVERY' && (
                  <div className="w-full flex items-center justify-start gap-2">
                    Endereco: <p>{order.address.street} - {order.address.number} - {order.address.neighborhood}</p>

                  </div>
                )}

                {order.methodDelivery === 'DELIVERY' && (
                  <span>
                    Cep: {order.methodDelivery === "DELIVERY" && order.address.cep}
                  </span>

                )}
                <span>Metado de Entrega: {order.methodDelivery === "DELIVERY" ? 'ENTREGA' : 'RETIRADA'}</span>
                <span>Metado de Pagamento: {order.payment.methodPayment === "Card" ? `Cartão - ${order.payment.typeCard} - ${order.payment.flag}` : order.payment.methodPayment === "Pix" ? 'Pix' : 'Dinheiro'}</span>
                {order.methodDelivery === 'DELIVERY' && (
                  <span>Taxa de Entrega: {priceFormatter.format(Number(order.address.tax))}</span>
                )}
                {/* <p>Observacao: {order.observation}</p> */}
              </div>
              <div className="w-full flex items-center justify-between mt-7">
                <span>Total</span>
                <span>{priceFormatter.format(Number(order.totalPrice))}</span>
              </div>
            </main>
          </Dialog.Title>
          <button id="print" onClick={imprimirPedido} className="mt-5 border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50 flex p-1 rounded ">Imprimir</button>
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-8 font-semibold">
            <Dialog.Trigger id='accept-btn' className="w-full" asChild>
              <button onClick={handleChangeOrderStatus} className=" flex items-center justify-center gap-2 p-2 text-gray-100 rounded bg-gray-700">
                {order.status === 'WAITING'
                  ? (
                    <>
                      <ClipboardCheck className="text-orange-500" />
                      <span>Aceitar Pedido</span>
                    </>

                  )
                  : order.status === 'ACCEPTED' ? (
                    <>
                      <ChefHat className="text-orange-500" />
                      <span>Iniciar Producao</span>
                    </>
                  ) : order.status === 'PREPARING' && order.methodDelivery === 'DELIVERY' ? (
                    <>
                      <Truck className="text-orange-500" />
                      <span>Saiu para Entrega</span>
                    </>
                  ) : order.status === 'PREPARING' && order.methodDelivery === 'PICKUP' ? (
                    <>
                      <CheckSquare className="text-emerald-500" />
                      <span>Pronto</span>
                    </>
                  ) : (
                    <>
                      <CheckSquare className="text-emerald-500" />
                      <span>Finalizar</span>
                    </>
                  )}
              </button>
            </Dialog.Trigger>

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};