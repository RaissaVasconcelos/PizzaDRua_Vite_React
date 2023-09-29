import { ContextApp } from "../../../context/context-app"

interface CardAddressProps {
  tax: string
}

export const Summary = ({ tax, }: CardAddressProps) => {

  const { cartProductsTotalPrice, cartDrinksTotalPrice, productPersonalize } = ContextApp()

  const priceProductPersonalize = productPersonalize.reduce((acc, product) => {
    const priceString = product.finalPrice.replace(',', '.')
    const price = parseFloat(priceString)
    return acc + price
  }, 0)

  const totalPriceProduct = (cartProductsTotalPrice + cartDrinksTotalPrice + priceProductPersonalize).toFixed(2)
  const totalPrice = (parseFloat(totalPriceProduct) + parseFloat(tax)).toFixed(2)

  return (
    <>
      <div className="border-b-2 border-gray-500 flex flex-col py-3 items-center justify-center gap-5 mt-10 w-10/12">
        <div className="flex items-center justify-between w-full">
          <span>Item total</span>
          <span>R$ {totalPriceProduct ? totalPriceProduct : "0,00"}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span>Entrega</span>
          <span>R$ {tax}</span>
        </div>
        <div className="flex items-center justify-between w-full font-bold">
          <span>Total</span>
          <span>R$ {totalPrice ? totalPrice : "0,00"}</span>
        </div>
      </div>
    </>
  )
}