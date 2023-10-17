import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ClipboardCheck, X } from "lucide-react";
import image from '../../../../assets/Vector.svg'
import './styles.css'

interface CardProps {
  itemsOrder:{
    id: string  
    image: string
    price: string 
    size: string
    product: string[]
    quantityProduct: number  
  }[] 
  totalPrice: string  
}
const data: CardProps = {
    itemsOrder: [
        {
        id: '1',
        image,
        quantityProduct: 1,
        price: '30.00',
        product: ["Calabresa", "Mussarela"],
        size: 'MEIA',
        },
      {
        id: '2',
        image,
        quantityProduct: 1,
        price: '49.99',
        product: ["Calabresa", "Frango"],
        size: 'G',
      }    
    ],
    totalPrice: '79.99'
  }


export const ModalHandleChangeStatus = () => {

  const imprimirPedido = () => {
    window.print()
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
      <AlertDialog.Content className="w-5/12 rounded p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <AlertDialog.Title className="text-gray-500 text-center font-semibold text-xl">
          <header className="flex items-center justify-start">
            <div className="flex w-full flex-col items-start justify-center gap-4">
              <div className=" w-full flex items-center justify-between">
                <h2>Hudson Felipe</h2>
                <AlertDialog.Cancel>
                  <X className="text-gary-600"/>
                </AlertDialog.Cancel>
              </div>
              <div id='accept' className="flex  items-center justify-center gap-2">
                <ClipboardCheck className="text-orange-500" />
                <span >Aceitar Pedido</span>  
              </div>
            </div>  

          </header>
          <main className="mt-10 flex flex-col items-start justify-center gap-3">
              {data.itemsOrder.map((item) => (
                <div className="flex items-start justify-center gap-2">
                  <img src={item.image} className="w-16" alt="" />
                  <div className="flex items-start justify-center gap-3">
                    <p className="text-lg">{item.quantityProduct}x</p>
                    <div className="text-base flex flex-col items-start justify-center">
                      <div className="flex items-center justify-start gap-2">
                        {item.product.map(item => (
                          <span>{item}</span>
                        ))} 
                      </div>
                      <p>{item.price}</p>
                    </div>  
                  </div>
                </div>
              ))}   
              <div className="w-full flex items-center justify-between mt-7">
                <span>Total</span>
                <span>{data.totalPrice}</span>
              </div>
          </main>
        </AlertDialog.Title>
        <button id="print" onClick={imprimirPedido} className="mt-5 border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50 flex p-1 rounded ">Imprimir</button> 
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-8 font-semibold">
          <AlertDialog.Trigger id='accept-btn' className="w-full" asChild>
            <button className=" flex items-center justify-center gap-2 p-2 text-gray-100 rounded bg-gray-700">
              <ClipboardCheck className="text-orange-500" />
              <span>Aceitar Pedido</span>  
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Action className="w-full" asChild>
            <button className=" text-red-500 p-2 rounded ">
              Cancelar Pedido
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};