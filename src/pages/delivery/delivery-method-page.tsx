import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderOrder } from "../../components/HeaderOrder";
import { z } from "zod";
import { useState } from "react";
import { setCookie } from "nookies";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { CardAddress } from "../../components/CardAddress";
import { Controller, useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { Label } from "../../components/ui/label";
import { ContextAuthApp } from "../../context/auth-context";
import { api } from "../../utils/axios";
import { NavLink, useNavigate } from "react-router-dom";

const methodDeliverySchemaBody = z.object({
  withdrawalName: z.string().nonempty('O nome é obrigatorio!').min(3, 'O nome deve ter pelo menos 3 caracteres'),
  phone: z.string()
    .nonempty('O telefone é obrigatório!')
    .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/
      .test(value), {
      message: 'Número de telefone inválido',
    }),
})

type MethodDeliverySchema = z.infer<typeof methodDeliverySchemaBody>


export default function MethodDelivery() {
  const [isCheckedDelivery, setIsCheckedDelivery] = useState('DELIVERY');
  const { customer } = ContextAuthApp()
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MethodDeliverySchema>({
    resolver: zodResolver(methodDeliverySchemaBody)
  });

  const methodDeliveryData = JSON.stringify(isCheckedDelivery)
  const handleSubmitForm = async (data: MethodDeliverySchema) => {
    try {

      setCookie(undefined, 'delivery', methodDeliveryData)

      await api.patch(`/customer`,
        {
          id: customer?.uid,
          withdrawalName: data.withdrawalName,
          phone: data.phone
        }
      )
      navigate('/payment')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <HeaderOrder activeLink="DELIVERY" leftLink="/cart" />
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <h2 className="w-11/12 text-start text-xl font-semibold text-gray-500">Tipo de pedido</h2>
        <div className="w-11/12 flex items-center justify-center font-normal gap-3 text-gray-500 text-xl my-6">
          <h3
            onClick={() => setIsCheckedDelivery('DELIVERY')}
            className={`w-full ${isCheckedDelivery === 'DELIVERY'
              ? "text-gray-100 bg-orange-500 border-[1px] border-orange-500"
              : "text-gray-500 border-[1px] border-gray-400"} flex items-center justify-center p-2 rounded-md`}>
            Entrega
          </h3>
          <h3
            onClick={() => setIsCheckedDelivery('PICKUP')}
            className={`w-full ${isCheckedDelivery === 'PICKUP'
              ? "text-gray-100 bg-orange-500 border-[1px] border-orange-500"
              : "text-gray-500 border-[1px] border-gray-400"} flex items-center justify-center  p-2 rounded-md `}>
            Retirar na loja
          </h3>
        </div>

        {

          isCheckedDelivery === 'DELIVERY' ? (
            <>
              <CardAddress textLink="/address" />
              <ButtonCheckout onClick={() => setCookie(undefined, 'delivery', methodDeliveryData)}>
                <NavLink to={'/payment'}>
                  Proximo
                </NavLink>
              </ButtonCheckout>
            </>
          ) : (
            <>
              <h2 className="w-11/12 text-start text-xl font-semibold text-gray-500">Dados do cliente</h2>
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className=" w-full mt-5 text-gray-600 flex flex-col items-center justify-between py-2 rounded-xl"
              >
                <Label className="w-11/12 mb-2">Nome</Label>
                <input
                  {...register('withdrawalName')}
                  className="bg-transparent w-11/12 p-3  rounded  border-[1px] border-gray-400 text-sm text-gray-600"
                  type="text"

                />
                {errors.withdrawalName && (
                  <span className="text-red-500">{errors.withdrawalName?.message}</span>
                )}
                <Label className="w-11/12 mt-4">Telefone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      className="bg-transparent mt-2 p-3 w-11/12 rounded  border border-gray-400 text-sm text-gray-600 "
                      mask="(99) 99999-9999"
                      maskPlaceholder=""
                      type='tel'
                      onChange={field.onChange}
                      placeholder="(00) 00000-0000"
                      value={field.value}
                    />
                  )}
                />
                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}

                <ButtonCheckout type="submit">
                  Proximo
                </ButtonCheckout>
              </form>
            </>
          )
        }
      </div>
    </>
  )
}