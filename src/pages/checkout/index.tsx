import { useEffect, useState } from "react";
import { AddressProps, ContextCartApp } from "../../context/cart-context";
import { HeaderOrder } from "../../components/HeaderOrder";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { CardAddress } from "../../components/CardAddress";
import pickupOrange from '../../assets/pickup-orange.png'
import pix from '../../assets/pix.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { Summary } from "../cart/components/summary";
import { CalculatePrice } from "../../utils/calculate-price";
import { ToastContainer } from "react-toastify";
import mc from '../../assets/mc.svg'
import visa from '../../assets/visa.png'
import elo from '../../assets/elo.png'
import money from '../../assets/money.png'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import uuid from "react-uuid";
import { OrderProps } from "../../@types/interface";
import ServiceAddress from '../../infrastructure/services/address'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceOrder from '../../infrastructure/services/order'


const observationSchemaBody = z.object({
  observation: z.string().optional()
})

type ObservationSchema = z.infer<typeof observationSchemaBody>

interface PaymentProps {
  methodPayment: string
  flag?: string
  typeCard?: string
}


export default function Checkout() {

  const [getPayment, setGetPayment] = useState<PaymentProps>({ methodPayment: 'Pix', typeCard: 'Pix' });
  const [methodDelivery, setMethodDelivery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false)
  const { productToCart, clearCart } = ContextCartApp()
  const [currentAddress, setCurrentAddress] = useState<AddressProps>()
  const serviceAddress = new ServiceAddress()
  const totalPrice = CalculatePrice();
  const navigate = useNavigate();
  const serviceOrder = new ServiceOrder();

  const {
    register,
    handleSubmit,
  } = useForm<ObservationSchema>({
    resolver: zodResolver(observationSchemaBody),
  })

  const getAddresses = async () => {
    const response = await serviceAddress.showAddress()
    setCurrentAddress(response.body.find(address => address.standard === true))
  }

  const handleFinishOrder = async (data: ObservationSchema) => {


    try {
      if (methodDelivery === 'DELIVERY' && !currentAddress) {
        toast.error('Por favor, escolha um endereço para entrega!', {
          autoClose: 3000,
          position: 'top-center',
        })
        return
      }
      setIsLoading(true)

      if (getPayment.methodPayment === 'Pix') {
        setCookie(undefined, 'observation', JSON.stringify(data.observation), {
          maxAge: 60 * 60 * 24 * 30,
        });
        navigate(`/pix/${uuid()}`)
      } else {
        const order: OrderProps = {
          payment: {
            methodPayment: getPayment.methodPayment,
            flag: getPayment.flag,
            typeCard: getPayment.typeCard
          },
          address: {
            cep: currentAddress?.zipCode,
            neighborhood: currentAddress?.neighborhood.name,
            number: currentAddress?.number,
            tax: currentAddress?.neighborhood.tax,
            phone: currentAddress?.phone,
            street: currentAddress?.street
          },
          totalPrice: await totalPrice,
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

        const response = await serviceOrder.createOrder(order)

        destroyCookie(null, 'product')
        destroyCookie(null, 'payment')
        destroyCookie(null, 'delivery')
        clearCart()
        navigate(`/success/${response.body.id}`)

      }

    } catch (error) {
      console.error(error);
      setIsLoading(false)

    }
  }

  const getDataCookies = async () => {
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
    getAddresses()
  }, [])

  return (
    <>
      <HeaderOrder activeLink="CHECKOUT" leftLink="/delivery" />
      <div className="w-full bg-white flex flex-col items-center justify-center pt-5">

        <div className="w-11/12">
          <div className="w-full flex items-center justify-between">
            <h2 className="w-full text-start  text-lg font-medium ">Metodo de Entrega</h2>
            <NavLink className='text-red-500 text-sm' to='/delivery'>
              Trocar
            </NavLink>
          </div>
          {methodDelivery === 'DELIVERY'
            ? (
              <div className="w-full bg-white mt-5 flex items-center justify-center">
                <CardAddress className="w-full" />
              </div>
            ) : (
              <div className="w-full flex items-center justify-between mt-5">
                <div className=" flex items-center justify-center gap-5">
                  <div className="rounded-full bg-gray-100 p-2">
                    <img src={pickupOrange} alt="" className="w-8" />
                  </div>
                  <span className="text-gray-500 text-sm  font-semibold">Retirar na loja</span>
                </div>

              </div>
            )}
          <div className="w-full h-[1px] bg-gray-200 mt-6" />
          <div className="w-full flex items-center justify-between">
            <h2 className="w-full text-start  text-lg font-medium my-5">{getPayment.methodPayment === 'Pix' ? 'Pagamento pelo app' : 'Pagamento na entrega'}</h2>
            <NavLink className='text-red-500 text-sm' to='/payment'>
              Trocar
            </NavLink>
          </div>
          <div className="w-full flex items-center justify-between ">
            <div className="flex items-center text-lg justify-start gap-3 text-gray-500 font-semibold">
              {getPayment.methodPayment === 'Card'
                ? <img
                  className="w-11 p-2  bg-gray-100 rounded-full"
                  src={getPayment.flag === 'Visa' ? visa : getPayment.flag === 'Mastercard' ? mc : elo}
                  alt=""
                />
                : getPayment.methodPayment === 'Pix'
                  ? (<img src={pix} className="w-11  p-2 bg-gray-100 rounded-full" alt='' />)
                  : <img src={money} className="w-11 p-2 bg-gray-100 rounded-full" alt="" />}

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

          <button
            disabled={isLoading}
            type="submit"
            className="bg-orange-500 w-full fixed bottom-0 disabled:opacity-50  py-4  text-gray-50 font-medium text-lg   hover:bg-orange-600"
          >
            {isLoading ?
              <div role="status" className="flex items-center justify-center">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>
              : 'Finalizar pedido'}
          </button>

        </form>

      </div>
      <div className="mb-16 w-full flex flex-col items-center justify-center">
        <Summary />
      </div>



      <ToastContainer />
    </>
  )
}