import { useEffect, useState } from "react";
import { ContextAuthApp } from "../../context/auth-context";
import { ContextCartApp } from "../../context/cart-context";
import { HeaderOrder } from "../../components/HeaderOrder";
import { destroyCookie, parseCookies } from "nookies";
import { CardAddress } from "../../components/CardAddress";
import pickupOrange from '../../assets/pickup-orange.png'
import pixOrange from '../../assets/pix-orange.svg'
import { CreditCard, Banknote, Edit, ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Summary } from "../cart/components/summary";
import { api } from "../../utils/axios";
import { CalculatePrice } from "../../utils/calculate-price";
import { ToastContainer } from "react-toastify";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { Oval } from "react-loader-spinner";

interface PaymentProps {
  methodPayment: string
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
  const [methodDelivery, setMethodDelivery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false)

  const { currentAddress } = ContextAuthApp()
  const { productToCart } = ContextCartApp()

  const totalPrice = CalculatePrice();

  const navigate = useNavigate();

  const handleFinishOrder = async () => {
    try {
      setIsLoading(true)
      const token = parseCookies().accessToken;
      if (getPayment.methodPayment === 'PIX') {
        navigate('/pix')
      } else {
        const order: OrderProps = {
          payment: getPayment.methodPayment,
          totalPrice: totalPrice,
          status: 'WAITING',
          methodDelivery: methodDelivery,
          itensOrder: productToCart.map((item) => ({
            mode: item.mode,
            size: item.size,
            image_url: item.image_url ? item.image_url : '',
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
      setIsLoading(false)

    }
  }

  const getDataCookies = () => {
    setGetPayment(() => {
      const storaged = parseCookies().payment
      return storaged ? JSON.parse(storaged) : []
    })

    setMethodDelivery(() => {
      const storaged = parseCookies().delivery
      return storaged ? JSON.parse(storaged) : []
    })
  }
  useEffect(() => {
    getDataCookies()
  }, [])

  return (
    <>
      <HeaderOrder activeLink="CHECKOUT" leftLink="/payment" />
      <div className="w-full bg-white p-3 flex flex-col items-center justify-center my-5">
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 ">Metodo de Entrega</h2>
        {methodDelivery === 'DELIVERY'
          ? (
            <div className="w-full bg-white  flex items-center justify-center">
              <CardAddress textLink="/delivery" />
            </div>
          ) : (
            <div className="w-10/12 flex items-center justify-between mt-5">
              <div className=" flex items-center justify-center gap-5">
                <img src={pickupOrange} alt="" className="w-11" />
                <span className="text-gray-500 text-lg font-bold">RETIRADA</span>
              </div>
              <NavLink to={"/delivery"}>
                <Edit size={25} className="text-gray-500" />
              </NavLink>
            </div>
          )}
        <div className="w-10/12 h-[2px] bg-gray-400 mt-7" />
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500 my-6">Metodo de Pagamento</h2>
        <div className="w-10/12 flex items-center justify-between ">
          <div className="flex items-center text-lg justify-start gap-5 text-gray-500 font-bold">
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
            <ShoppingCart size={30} />
            <span className="text-lg text-gray-500 font-bold">MEU CARRINHO</span>
          </div>
          <NavLink to={"/cart"}>
            <Edit size={25} className="text-gray-500" />
          </NavLink>
        </div>
      </div>
      <div className="mb-16 w-full flex flex-col items-center justify-center">
        <Summary tax={methodDelivery === 'PICKUP' ? '0.00' : currentAddress ? currentAddress.neighborhood.tax : '0.00'} />
      </div>


      <ButtonCheckout disabled={isLoading} onClick={handleFinishOrder}>
        {isLoading ? (
          <Oval
            height={25}
            width={25}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#fff"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
        ) : (
          'Finalizar pedido'
        )}
      </ButtonCheckout>
      <ToastContainer />
    </>
  )
}