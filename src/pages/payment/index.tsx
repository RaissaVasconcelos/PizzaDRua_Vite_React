import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderOrder } from "../../components/HeaderOrder";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import pix from '../../assets/pix.svg'
import pixOrange from '../../assets/pix-orange.svg'
import delivery from '../../assets/delivery.png'
import deliveryOrange from '../../assets/delivery-orange.png'
import pickup from '../../assets/pickup.png'
import pickupOrange from '../../assets/pickup-orange.png'
import { Banknote, CreditCard } from "lucide-react";
import { Button } from "../../components/ui/button";
import { setCookie } from "nookies";
import { useNavigate } from 'react-router-dom';

const paymentSchemaBody = z.object({
  methodPayment: z.enum(['CARD', 'MONEY', 'PIX']),
  methodDelivery: z.enum(['PICKUP', 'DELIVERY']),
})
type PaymentSchema = z.infer<typeof paymentSchemaBody>


export default function Payment() {
  const [isCheckedPayment, setIsCheckedPayment] = useState('PIX');
  const [isCheckedDelivery, setIsCheckedDelivery] = useState('DELIVERY');
  const {
    control,
    handleSubmit,
  } = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchemaBody),
    defaultValues: {
      methodPayment: 'PIX',
      methodDelivery: 'DELIVERY',
    }
  });

    const navigate = useNavigate();
  const handleSubmitForm = (data: PaymentSchema) => {
    const paymentData = JSON.stringify(data)
    setCookie(undefined, 'payment', paymentData, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    navigate('/checkout')
  }

  return (
    <div className="max-w-[1100px] m-auto">
      <HeaderOrder title="Pagamento" link="/cart" />
      <div className="w-full flex flex-col items-center justify-center my-10">
        <h2 className="w-10/12 text-start text-xl font-semibold text-gray-500">Metodo de pagamento</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)} className='w-full ' action="">
          <div className='w-11/12 flex flex-col items-center justify-center m-5'>

            <Controller
              control={control}
              name="methodPayment"
              render={({ field }) => {
                return (
                  <RadioGroup.Root
                    onValueChange={field.onChange}
                    value={field.value}
                    className="w-9/12  flex flex-col items-start justify-center gap-5 mt-10 font-semibold"
                  >
                    <RadioGroup.Item
                      value="PIX"
                      onClick={() => { setIsCheckedPayment('PIX') }}
                      className={`${isCheckedPayment === 'PIX' ? 'bg-orange-50 border-2 border-orange-500 text-orange-500 rounded-md' : 'text-gray-500'} w-10/12 p-2 flex items-center justify-start gap-5 `}
                    >
                      {isCheckedPayment === 'PIX' ? <img src={pixOrange} width={38} height={38} alt='' /> : <img src={pix} width={38} height={38} alt='' />}
                      <h3>PIX</h3>
                    </RadioGroup.Item>
                    <div className="w-10/12 h-[2px] bg-gray-400" />
                    <RadioGroup.Item
                      value="CARD"
                      onClick={() => { setIsCheckedPayment('CARD') }}
                      className={`
                        ${isCheckedPayment === 'CARD'
                          ? 'bg-orange-50 border-2 border-orange-500 text-orange-500 rounded-md'
                          : 'text-gray-500'}  w-10/12 p-2 flex items-center justify-start gap-5`}
                    >
                      <CreditCard size={38} strokeWidth={1} className="font-light" />
                      <h3>CARTAO DE CREDITO</h3>
                    </RadioGroup.Item>
                    <div className="w-10/12 h-[2px] bg-gray-400" />
                    <RadioGroup.Item
                      value="MONEY"
                      onClick={() => { setIsCheckedPayment('MONEY') }}
                      className={`${isCheckedPayment === 'MONEY' ? 'bg-orange-50 border-2 border-orange-500 text-orange-500 rounded-md' : 'text-gray-500'} w-10/12 px-2 flex items-center justify-start gap-5 py-2`}
                    >
                      <Banknote size={38} strokeWidth={1} />
                      <h3>DINHEIRO</h3>
                    </RadioGroup.Item>

                  </RadioGroup.Root>
                )
              }}
            />
            <h2 className="w-10/12 text-start font-semibold text-xl text-gray-500 mt-10">Metodo de Entrega</h2>
            <Controller
              control={control}
              name="methodDelivery"
              render={({ field }) => {
                return (
                  <RadioGroup.Root
                    onValueChange={field.onChange}
                    value={field.value}
                    className="w-9/12 bg-white flex flex-col items-start justify-center p-5  rounded-md gap-10 mt-10 font-semibold"
                  >
                    <RadioGroup.Item
                      value="DELIVERY"
                      onClick={() => { setIsCheckedDelivery('DELIVERY') }}
                      className="flex items-center justify-start gap-5 text-gray-500 text-xl"
                    >
                      {isCheckedDelivery === 'DELIVERY' ? <img src={deliveryOrange} width={38} height={38} alt='' /> : <img src={delivery} width={38} height={38} alt='' />}
                      <h3 className={`${isCheckedDelivery === 'DELIVERY' ? 'text-orange-500' : 'text-gray-500'}`}>Entrega</h3>
                    </RadioGroup.Item>
                    <div className="w-full h-[2px] bg-gray-400" />
                    <RadioGroup.Item
                      value="PICKUP"
                      onClick={() => { setIsCheckedDelivery('PICKUP') }}
                      className="flex items-center justify-start gap-5 text-gray-500 text-xl"
                    >
                      {isCheckedDelivery === 'PICKUP' ? <img src={pickupOrange} width={38} height={38} alt='' /> : <img src={pickup} width={38} height={38} alt='' />}
                      <h3 className={`${isCheckedDelivery === 'PICKUP' ? 'text-orange-500' : 'text-gray-500'}`}>Retirada</h3>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )
              }}
            />

          </div>
          <div className="w-full flex  items-center justify-center">
            <Button className="w-10/12 bg-orange-500 hover:bg-orange-600 text-lg mt-10" type="submit">
              Prossiga para o pagamento
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}