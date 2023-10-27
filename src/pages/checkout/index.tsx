import { useState } from "react";
import { ContextApp } from "../../context/context-app";
import { HeaderOrder } from "../../components/HeaderOrder";
import { destroyCookie, parseCookies } from "nookies";
import { CardAddress } from "../../components/CardAddress";
import pickupOrange from '../../assets/pickup-orange.png'
import pizza from '../../assets/Vector.svg'
import pixOrange from '../../assets/pix-orange.svg'
import { CreditCard, Banknote, Edit } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Summary } from "../cart/components/summary";
import { Button } from "../../components/ui/button";
import { api } from "../../utils/axios";


interface PaymentProps {
  methodPayment: string
}

interface MethodDeliveryProps {
  deliveryMethod: string
}

interface OrderProps {
  payment: string
  totalPrice: string
  methodDelivery: string
  status: string
  itensOrder: {
    mode?: string,
    size: string,
    price: string
    product: string[]
    quantity: number
  }[]
}

export default function Checkout() {

  const [getPayment, setGetPayment] = useState<PaymentProps>(() => {
    const storaged = parseCookies().payment
    return storaged ? JSON.parse(storaged) : []
  });
  const [methodDelivery, setMethodDelivery] = useState<MethodDeliveryProps>(() => {
    const storaged = parseCookies().delivery
    return storaged ? JSON.parse(storaged) : []
  });

  const { addresses, productToCart, cartProductsTotalPrice } = ContextApp()
  const currentAddress = addresses.find((address) => address.standard === true )
  const totalPriceProduct = parseFloat(String(cartProductsTotalPrice)); // Converta para número
  const tax = currentAddress ? parseFloat(currentAddress.neighborhood.tax) : 0; // Converta para número
  const totalPrice = (totalPriceProduct + (methodDelivery.deliveryMethod === 'DELIVERY' ? tax : 0)).toFixed(2); // Realize os cálculos como números
  console.log(totalPrice, 'cartTotalPrice');

  const navigate = useNavigate();

  const handleFinishOrder = async () => {
    try {
      const token = parseCookies().accessToken;
      if (getPayment.methodPayment === 'PIX') {
        navigate('/pix')
      } else {
        const order: OrderProps = {
          payment: getPayment.methodPayment,
          totalPrice: totalPrice,
          status: 'WAITING',
          methodDelivery: methodDelivery.deliveryMethod,
          itensOrder: productToCart.map((item) => ({
            mode: item.mode,
            size: item.size,
            image_url: item.image_url,
            price: item.price,
            product: item.product.map(item => item.name),
            quantity: item.quantityProduct
          }))
        }

        await api.post('/order', order, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        destroyCookie(null, 'product')
        destroyCookie(null, 'payment')
        destroyCookie(null, 'delivery')
        navigate('/success')
      }

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <>
      <HeaderOrder link="/payment" title="Revisão do Pedido" />
      <div className="w-full bg-white p-3 flex flex-col items-center justify-center my-5">
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 ">Metodo de Entrega</h2>
        {methodDelivery.deliveryMethod === 'DELIVERY'
          ? (
            <div className="w-full bg-white  flex items-center justify-center">
              <CardAddress textLink="/delivery" />
            </div>
          ) : (
            <div className="w-10/12 flex items-center justify-between mt-5">
              <div className=" flex items-center justify-center gap-5">
                <img src={pickupOrange} alt="" className="w-11" />
                <span className="text-gray-500 text-xl font-semibold">Retirada</span>
              </div>
              <NavLink to={"/delivery"}>
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
      <div className="w-full flex flex-col items-center justify-center">
        <Summary tax={methodDelivery.deliveryMethod === 'PICKUP' ? '0.00' : currentAddress ? currentAddress.neighborhood.tax : '0.00'} />
      </div>


      <div className="w-full flex items-center justify-center my-10"  >
        <Button onClick={handleFinishOrder} className="bg-orange-500 hover:bg-orange-600 text-lg flex w-11/12 items-center justify-center">Finalizar Compra</Button>
      </div>

    </>
  )
}