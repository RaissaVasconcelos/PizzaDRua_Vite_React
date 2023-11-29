import { OrdersCartProps } from "../../../context/cart-context"
import { CardContent } from "../../../components/ui/card"
import { priceFormatter } from "../../../utils/formatter"
import image from "../../../assets/Vector.png"
import { InputQuantityProductInCart } from "./input-quantity-product-in-cart"
import { useState } from "react"

interface ProductsInCartProps {
  products: OrdersCartProps
}

export const CardProduct = ({ products }: ProductsInCartProps) => {

  const priceString = products.price.replace(',', '.')
  const totalPrice = (parseFloat(priceString) * products.quantityProduct)

  const [quantityProduct, setQuantityProduct] = useState(1);

  const handleIncrementProduct = () => {
    setQuantityProduct((state) => state + 1);
  };

  const handleDecrementProduct = () => {
    setQuantityProduct((state) => state - 1);
  };



  return (

    <CardContent className="flex items-center justify-between ">
      <div className="w-full flex items-center justify-center gap-2">
        <img
          className="w-20 rounded object-contain "
          src={products.image_url ? products.image_url : image}

          alt="" />
        <div className="w-full flex flex-col items-start justify-center text-sm">
          <div className="flex  items-center justify-start gap-2 ">

            {products.product.map(item => (<span key={item.name} className="text-gray-600 font-medium">{item.name}</span>))}

          </div>
          <span className="text-gray-400  ">quantidade {products.quantityProduct}x</span>
          <div className="w-full flex items-center justify-between">
            <span className="font-semibold">{priceFormatter.format(Number(totalPrice))}</span>
            <InputQuantityProductInCart
              products={products}
              onDecrease={handleDecrementProduct}
              onIncrease={handleIncrementProduct}
              quantityProduct={quantityProduct}
            />
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center ">
      </div>

    </CardContent>

  )

}