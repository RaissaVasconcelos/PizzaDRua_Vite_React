import { Plus } from "lucide-react";
import { CardAddress } from "./components/card";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { setCookie } from "nookies";
import { AddressProps, ContextApp } from "../../context/context-app";
import { HeaderOrder } from "../../components/HeaderOrder";
import { Button } from "../../components/ui/button";

const addressSChemaBody = z.object({
  type: z.enum(['Casa', 'Trabalho', 'Outros'])

})

type AddressSchema = z.infer<typeof addressSChemaBody>

export default function Address() {
  const [isChecked, setIsChecked] = useState<AddressProps | null>(null);

  const { addresses } = ContextApp()
 
  const {
    control,
    handleSubmit,
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSChemaBody)

  });
  const handleCheckboxChange = (address: AddressProps) => {

    setIsChecked(address)

  };

  const handleSubmitForm = () => {

    setCookie(undefined, 'address', JSON.stringify(isChecked), {
      maxAge: 60 * 60 * 24 * 30,
    })
    console.log('isChecked');
    
  }
console.log(isChecked, 'isChecked');

  return (
    <div className="h-screen max-w-[1100px] m-auto  flex flex-col items-center justify-start">
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder title="Selecione um Endereço" link="/cart" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <Button disabled={addresses.length >= 3} className="w-4/5 text-orange-500 font-semibold  bg-transparent border-2 border-orange-500 my-4 rounded-md  py-2 px-4 ">
          <NavLink className="flex items-center justify-center gap-2" to="/create-address">
            <Plus />
            <span className="text-base ">Adicionar Endereco</span>
          </NavLink>
        </Button>
        <form className="w-full" onSubmit={handleSubmit(handleSubmitForm)}>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col items-center justify-center gap-5 w-full "
                >
                  {addresses.map((address) => {
                    return (
                      <RadioGroup.Item
                        {...field}
                        value={address.type}
                        checked={isChecked?.id === address.id} // Marque o checkbox se este endereço estiver selecionado
                        onClick={() => handleCheckboxChange(address)} // Chama a função handleCheckboxChange
                        key={address.id}
                        className="w-full flex items-center justify-center "


                      >
                        <CardAddress
                          className={isChecked?.id === address.id ? "bg-orange-50 border-[3px] border-orange-500" : " bg-white"}
                          neighborhood={address.neighborhood}
                          number={address.number}
                          street={address.street}
                          type={address.type}
                          phone={address.phone}
                          zipCode={address.zipCode}
                          addressId={address.id}
                        />
                      </RadioGroup.Item>
                    )
                  })}

                </RadioGroup.Root>
              )
            }}
          />
          {!isChecked && (
            <div className="text-red-500 text-center mt-5">Selecione um endereço</div>
          )}
          <div className="my-10 w-full flex items-center justify-center ">
            <Button type="submit" className="w-4/5 font-semibold  bg-orange-500 text-gray-100 text-lg haver:bg-orange-600 ">
              <NavLink to={"/cart"}>
                 Continuar
              </NavLink>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}