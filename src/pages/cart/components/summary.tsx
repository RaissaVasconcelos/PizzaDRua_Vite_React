import { ContextCartApp } from "../../../context/cart-context"
import { cn } from "../../../utils/cn"
import { priceFormatter } from "../../../utils/formatter"

interface taxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tax: string
}

export const Summary = ({ tax, className }: taxProps) => {


  const { cartProductsTotalPrice } = ContextCartApp()

  const totalPriceProduct = (cartProductsTotalPrice).toFixed(2)
  const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2)

  return (

    <div className={cn(` font-semibold text-xl text-gray-600 border-b-2 border-gray-500 flex flex-col py-3 items-center justify-center gap-5 w-11/12`, className)}>
      <div className="flex items-center text-gray-900 justify-between w-full">
        <span>Subtotal</span>
        <span >{totalPriceProduct ? priceFormatter.format(Number(totalPriceProduct)) : "0,00"}</span>
      </div>
      <div className="flex items-center text-gray-400 justify-between w-full">
        <span>Taxa de entrega</span>
        <span>{tax ? priceFormatter.format(Number(tax)) : priceFormatter.format(Number('0.00'))}</span>
      </div>
      <div className="flex items-center justify-between w-full font-bold">
        <span>Total</span>
        <span className="text-gray-700 font-bold">{totalPrice ? priceFormatter.format(Number(totalPrice)) : priceFormatter.format(Number("0.00"))}</span>
      </div>
    </div>

  )
}