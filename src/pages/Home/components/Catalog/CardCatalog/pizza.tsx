import { Card, CardContent } from "../../../../../components/ui/card"
import { InputQuantityProductInCart } from "../input-quantity-product-in-cart"
import { useState } from "react"
import image from "../../../../../assets/Vector.svg"
import { Button } from "../../../../../components/ui/button"
import { ToastContainer } from "react-toastify";
import { notify } from "../../../../../utils/toast"
import { ContextApp } from "../../../../../context/context-app"
import { priceFormatter } from "../../../../../utils/formatter"

interface CardCatalogProps {
  id: number,
  type?: 'TRADITIONAL' | 'SPECIAL',
  product: {name: string}[],
  category: {
    name: string
  }
  price: string,
  image_url: string
  description: string

}

export const CardCatalogPizza = (catalog: CardCatalogProps) => {


  const [quantityProduct, setQuantityProduct] = useState(1);
  const { addProductToCart } = ContextApp()


  const handleIncrementProduct = () => {
    setQuantityProduct((state) => state - 1);
  };

  const handleDecrementProduct = () => {
    setQuantityProduct((state) => state + 1);
  };

  const handleAddProductToCart = () => {
    const productToCart = {
      ...catalog,
      quantityProduct
    }
    addProductToCart(productToCart)
    notify()
  }


  return (
    <Card className="bg-white border-0  rounded w-11/12 py-2 box-border">
      <CardContent className="w-full flex items-center justify-between gap-2">
        <div className="w-80">
          <img className="object-fit w-full" src={image} alt='' />
        </div>
        <div className="w-full">
          {catalog.product.map((item) => (<p key={item.name} className="font-bold text-lg text-gray-600">{item.name}</p>))}
          <p className="text-gray-600">{catalog.description}</p>
          <div className="w-full flex items-center justify-between mt-3 ">
            <p className="text-gray-500 font-bold text-lg">{priceFormatter.format(Number(catalog.price))}</p>
            <InputQuantityProductInCart
              onDecrease={handleDecrementProduct}
              onIncrease={handleIncrementProduct}
              quantityCoffee={quantityProduct}
            />
          </div>
        </div>
      </CardContent>
      <div className="px-2 flex items-center justify-center flex-col w-full text-gray-100  gap-2 ">
        <Button disabled={!quantityProduct} onClick={handleAddProductToCart} className={"w-full rounded bg-orange-500 hover:bg-orange-600 text-lg"} >Adicionar ao carrinho</Button>
        <a className="w-full" href="/personalize">
          <Button className={"w-full rounded border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50"} >Personalizar</Button>
        </a>
        <ToastContainer />
      </div>
    </Card>

  )
}