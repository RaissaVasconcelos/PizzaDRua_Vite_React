import { useEffect, useState } from "react";
import { ContextAuthApp } from "../../context/auth-context";
import { ContextCartApp } from "../../context/cart-context";
import { HeaderOrder } from "../../components/HeaderOrder";
import { destroyCookie, parseCookies } from "nookies";
import { CardAddress } from "../../components/CardAddress";
import pickupOrange from '../../assets/pickup-orange.png'
import pix from '../../assets/pix.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { Summary } from "../cart/components/summary";
import { api } from "../../utils/axios";
import { CalculatePrice } from "../../utils/calculate-price";
import { ToastContainer } from "react-toastify";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { Oval } from "react-loader-spinner";
import mc from '../../assets/mc.svg'
import visa from '../../assets/visa.png'
import elo from '../../assets/elo.png'
import money from '../../assets/money.png'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const observationSchemaBody = z.object({
  observation: z.string().optional()
})

type ObservationSchema = z.infer<typeof observationSchemaBody>

interface PaymentProps {
  methodPayment: string
  flag?: string
  typeCard?: string
}

interface OrderProps {
  payment: string
  totalPrice: string
  methodDelivery: string
  status: string
  observation?:string
  itensOrder: {
    mode?: string,
    size: string,
    price: string
    product: string[]
    quantity: number
  }[]
}

export default function Checkout() {

  const [getPayment, setGetPayment] = useState<PaymentProps>({ methodPayment: 'Pix', typeCard: 'Pix' });
  const [methodDelivery, setMethodDelivery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false)
  const { currentAddress } = ContextAuthApp()
  const { productToCart } = ContextCartApp()
  const totalPrice = CalculatePrice();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<ObservationSchema>({
    resolver: zodResolver(observationSchemaBody),
  })

  const handleFinishOrder = async (data: ObservationSchema) => {
    try {
      console.log(data);
      
      setIsLoading(true)
      const token = parseCookies().accessToken;
      if (getPayment.methodPayment === 'Pix') {
        navigate('/pix')
      } else {
        const order: OrderProps = {
          payment: getPayment.methodPayment,
          totalPrice: totalPrice,
          status: 'WAITING',
          methodDelivery: methodDelivery,
          observation: data.observation,  
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
      return storaged ? JSON.parse(storaged) : { methodPayment: 'Pix', typeCard: 'Pix' }
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
      <HeaderOrder activeLink="CHECKOUT" leftLink="/delivery" />
      <div className="w-full bg-white flex flex-col items-center justify-center pt-6">

        <div className="w-11/12">
            <div className="w-full flex items-center justify-between">
              <h2 className="w-full text-start text-xl font-normal text-gray-500 ">Metodo de Entrega</h2>
              <NavLink className='text-red-500 text-sm' to='/delivery'>
                Trocar
              </NavLink>
            </div>
            {methodDelivery === 'DELIVERY'
              ? (
                <div className="w-full bg-white mt-5 flex items-center justify-center">
                  <CardAddress className="w-full"/>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between mt-5">
                  <div className=" flex items-center justify-center gap-5">
                    <img src={pickupOrange} alt="" className="w-11" />
                    <span className="text-gray-500 text-lg font-normal">Ritirar na loja</span>
                  </div>
                  
                </div>
              )}
            <div className="w-full h-[1px] bg-gray-200 mt-6" />
            <div className="w-full flex items-center justify-between">
              <h2 className="w-full text-start text-xl font-normal text-gray-500 my-5">{getPayment.methodPayment === 'Pix' ? 'Pagamento pelo app' :  'Pagamento na entrega'}</h2>
              <NavLink className='text-red-500 text-sm' to='/payment'>
                Trocar
              </NavLink>
            </div>
            <div className="w-full flex items-center justify-between ">
              <div className="flex items-center text-lg justify-start gap-3 text-gray-500 font-semibold">
                {getPayment.methodPayment === 'Card' 
                  ? <img 
                      className="w-11 p-2 bg-gray-100 rounded-full" 
                      src={getPayment.flag === 'Visa' ? visa : getPayment.flag === 'Mastercard' ? mc : elo} 
                      alt="" 
                    /> 
                  : getPayment.methodPayment === 'Pix' 
                  ? (<img src={pix} className="w-11  p-2 bg-gray-100 rounded-full" alt='' />) 
                  : <img src={money} className="w-11 p-2 bg-gray-100 rounded-full" alt="" /> }
                 
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-600">{getPayment.typeCard}</span>
                    <span className="text-gray-400 text-xs font-light">{getPayment.flag}</span>
                  </div>  
              </div>
            
            </div>
          </div>
            <div className="w-11/12 h-[1px] bg-gray-200 mt-6" />
            <form
              onSubmit={handleSubmit(handleFinishOrder)}
              className="mt-4 w-full"
            >
              <div className="px-4 mb-2 flex flex-col items-start justify-center gap-2">
                <Label className='text-gray-500'>Observação</Label>
                <Textarea className="flex items-center justify-center" {...register('observation')} maxLength={60} minLength={5} />
              </div>
              <ButtonCheckout type="submit" className="w-full" disabled={isLoading}>
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
            </form>

          </div>
      <div className="mb-16 w-full flex flex-col items-center justify-center">
        <Summary tax={methodDelivery === 'PICKUP' ? '0.00' : currentAddress ? currentAddress.neighborhood.tax : '0.00'} />
      </div>


     
      <ToastContainer />
    </>
  )
}