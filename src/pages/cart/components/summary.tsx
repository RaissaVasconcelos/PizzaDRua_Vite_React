import { useEffect, useState } from "react"
import { AddressProps, ContextCartApp } from "../../../context/cart-context"
import { cn } from "../../../utils/cn"
import { priceFormatter } from "../../../utils/formatter"
import ServiceAddress from '../../../infrastructure/services/address'
import { parseCookies } from "nookies"

type taxProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Summary = ({ className }: taxProps) => {
  const [address, setAddress] = useState<AddressProps | null>(null)
  const [methodDelivery, setMethodDelivery] = useState<string>('')
  const serviceAddress = new ServiceAddress()
  const { cartProductsTotalPrice } = ContextCartApp()

  const getAddresses = async () => {
    try {
      const response = await serviceAddress.showAddress()
      const addresses = response.body
      const standardAddress = addresses.find((element: AddressProps) => element.standard === true && element.neighborhood.status === "ACTIVE");
      if (standardAddress) {
        setAddress(standardAddress);
      }
    } catch (error) {
      console.error("Erro ao carregar endereços", error);
    }
  };

  const tax = methodDelivery === 'PICKUP' ? '0.00' : address ? address.neighborhood.tax : '0.00'


  const totalPriceProduct = (cartProductsTotalPrice).toFixed(2)
  const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2)

  useEffect(() => {
    getAddresses()
    setMethodDelivery(() => {
      const storaged = parseCookies().delivery
      return storaged ? JSON.parse(storaged) : []
    })
  }, [])


  return (

    <div className={cn(` font-medium text-gray-900 text-base flex flex-col py-3 items-center justify-center gap-2 w-11/12`, className)}>
      <h2 className="w-full text-start text-lg font-medium">Resumo de valores</h2>
      <div className="flex items-center  justify-between w-full">
        <span>Subtotal</span>
        <span >{totalPriceProduct ? priceFormatter.format(Number(totalPriceProduct)) : "0,00"}</span>
      </div>
      <div className="flex items-center text-gray-400 justify-between w-full">
        <span>Taxa de entrega</span>
        <span>{tax ? priceFormatter.format(Number(tax)) : priceFormatter.format(Number('0.00'))}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <span>Total</span>
        <span className="text-gray-700 ">{totalPrice ? priceFormatter.format(Number(totalPrice)) : priceFormatter.format(Number("0.00"))}</span>
      </div>
    </div>

  )
}