import { useEffect, useState } from "react";
import { AddressProps, ContextApp } from "../../context/context-app";
import { HeaderOrder } from "../../components/HeaderOrder";
import { parseCookies } from "nookies";
import { CardAddress } from "../../components/CardAddress";
import pickupOrange from '../../assets/pickup-orange.png'
import pizza from '../../assets/Vector.svg'
import pixOrange from '../../assets/pix-orange.svg'
import { CreditCard, Banknote, Edit } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Summary } from "../cart/components/summary";
import { Button } from "../../components/ui/button";

interface PaymentProps {
  methodPayment: string
  methodDelivery: string
}

export default function Checkout() {

  const [getPayment, setGetPayment] = useState<PaymentProps>(() => {
    const storaged = parseCookies().payment
    return storaged ? JSON.parse(storaged) : []
  });
  const [tax, setTax] = useState('0.00')

  const { addresses, getAddress } = ContextApp()

  const handleTaxDelivery = () => {
    if (getPayment.methodDelivery === 'PICKUP') {
      setTax('0.00')  
    } else if (getAddress) {
      setTax(getAddress.neighborhood.tax)
    } else {
      setTax(addresses[0].neighborhood.tax)
    }
    
  }


 useEffect(() => {
   handleTaxDelivery()
 })


  return (
    <div className="max-w-[1100px] m-auto  ">
      <HeaderOrder  link="/payment" title="Revisão do Pedido" />
      <div className="w-full bg-white p-3 flex flex-col items-center justify-center my-5">
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 ">Metodo de Entrega</h2>
        {getPayment.methodDelivery === 'DELIVERY'
          ? (

            <div className="w-full bg-white  flex items-center justify-center">
              <CardAddress/>
            </div>
          ) : (

            <div className="w-10/12 flex items-center justify-between">
              <div className=" flex items-center justify-center gap-5">
                <img src={pickupOrange} alt="" className="w-11" />
                <span className="text-gray-500 text-xl font-semibold">Retirada</span>
              </div>
              <NavLink to={"/payment"}>
                <Edit size={25} className="text-gray-500" />
              </NavLink> 
            </div>
          )}
        <div className="w-10/12 h-[2px] bg-gray-400 mt-7" />
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 my-6">Metodo de Pagamento</h2>
        <div className="w-10/12 flex items-center justify-between ">
          <div className="flex items-center justify-start gap-5 text-gray-500 font-bold">
            {getPayment.methodPayment === 'CARD' ? (<CreditCard size={30} className="text-orange-500" />) : getPayment.methodPayment === 'PIX' ? (<img src={pixOrange} className="w-11" alt='' />) : (<Banknote size={30} className="text-orange-500" />)}
            {getPayment.methodPayment === "CARD" ? (<span>CARTAO DE CREDITO</span>) : getPayment.methodPayment === "PIX" ? (<span>PIX</span>) : (<span>DINHEIRO</span>)}
          </div>
          <NavLink to='/payment'>
            <Edit size={25} className="text-gray-500" />
          </NavLink>
        </div>
        <div className="w-10/12 h-[2px] bg-gray-400 mt-6" />
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 my-6">Revisão do Pedido</h2>
        <div className="w-10/12 flex items-center justify-between mb-5">
          <div className="flex items-center justify-start text-xl gap-5 text-gray-500 font-semibold">
            <img src={pizza} className="w-16" alt="" />
            <span>Meu Carrinho</span>
          </div>
          <NavLink to={"/cart"}>
            <Edit size={25} className="text-gray-500" />
          </NavLink>  
        </div>
      </div>
      <div className="w-ful flex flex-col items-center justify-center">
        <Summary  tax={tax}/>
      </div>

      
        <NavLink className="w-full flex items-center justify-center my-10" to={getPayment.methodPayment === 'PIX' ? "/pix" : "/success"} >
          <Button className="bg-orange-500 hover:bg-orange-600 text-lg flex w-11/12 items-center justify-center">Finalizar Compra</Button>  
        </NavLink>
    
    </div>
  )
}