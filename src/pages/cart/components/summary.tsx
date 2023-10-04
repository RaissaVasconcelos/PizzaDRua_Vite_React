import { ContextApp } from "../../../context/context-app"
import { priceFormatter } from "../../../utils/formatter"

interface taxProps {
  tax: string
}

export const Summary = ({ tax }: taxProps) => {

  const { cartProductsTotalPrice, productPersonalize } = ContextApp()

  const priceProductPersonalize = productPersonalize.reduce((acc, product) => {
    const priceString = product.finalPrice.replace(',', '.')
    const price = parseFloat(priceString)
    return acc + price
  }, 0)

 

  const totalPriceProduct = (cartProductsTotalPrice  + priceProductPersonalize).toFixed(2)
  const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2)
  

  return (
    <>
      <div className="font-semibold text-xl text-gray-600 border-b-2 border-gray-500 flex flex-col py-3 items-center justify-center gap-5 mt-10 w-11/12">
        <div className="flex items-center justify-between w-full">
          <span>Pedidos</span>
          <span >{totalPriceProduct ? priceFormatter.format(Number(totalPriceProduct)) : "0,00"}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span>Entrega</span>
          <span>{tax ? priceFormatter.format(Number(tax)) : priceFormatter.format(Number("0,00"))}</span>
        </div>
        <div className="flex items-center justify-between w-full font-bold">
          <span>Total</span>
          <span className="text-gray-700 font-bold">{totalPrice ? priceFormatter.format(Number(totalPrice)) : "0,00"}</span>
        </div>
      </div>
    </>
  )
}