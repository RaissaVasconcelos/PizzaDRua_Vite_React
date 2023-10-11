import { Card, CardContent } from "../../../../../components/ui/card"
import { InputQuantityProductInCart } from "../input-quantity-product-in-cart"
import { useState } from "react"
import image from "../../../../../assets/lata.png"
import { Button } from "../../../../../components/ui/button"
import { ToastContainer } from "react-toastify";
import { notify } from "../../../../../utils/toast"
import { ContextApp, ProductProps } from "../../../../../context/context-app"
import { priceFormatter } from "../../../../../utils/formatter"



export const CardCatalogDrink = (catalog: ProductProps) => {

console.log(catalog, 'catalog');

  const [quantityProduct, setQuantityProduct] = useState(1);
  const { addProductToCart } = ContextApp()

  const handleIncrementProduct = () => {
    setQuantityProduct((state) => state - 1);
  };

  const handleDecrementProduct = () => {
    setQuantityProduct((state) => state + 1);
  };

  const handleAddDrinkToCart = () => {
    const drinkToCart = {
      ...catalog,
      mode: 'SIMPLE',
      quantityProduct
    }
    addProductToCart(drinkToCart)
    notify()
  }


  return (
    <Card className="bg-white border-0 p-2 rounded w-11/12">
      <CardContent className=" w-full flex items-center justify-between gap-3">
        <div className="w-40">
          <img className="object-fit w-full rounded" src={image} alt='' />
        </div>
        <div className="w-full">
          {catalog.product.map((item) => (<p key={item.name} className="font-bold text-lg text-gray-600">{item.name}</p>))}
          <p className="text-gray-600">{catalog.description}</p>
          <div className="w-full flex items-center justify-between mt-3 ">
            <p className="text-gray-500 font-bold text-lg">{priceFormatter.format(parseFloat(catalog.price))}</p>
            <InputQuantityProductInCart
              onDecrease={handleDecrementProduct}
              onIncrease={handleIncrementProduct}
              quantityCoffee={quantityProduct}
            />
          </div>
        </div>
      </CardContent>
      <div className="flex items-center justify-center flex-col w-full text-gray-100  gap-2 ">
        <Button disabled={!quantityProduct} onClick={handleAddDrinkToCart} className={"w-full rounded bg-orange-500 hover:bg-orange-600 text-lg"} >Adicionar ao carrinho</Button>
      </div>
      <ToastContainer />
    </Card>

  )
}