import { Card, CardContent } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import { ContextCartApp, ProductProps } from "../../../../../context/cart-context"
import { priceFormatter } from "../../../../../utils/formatter"
import { NavLink } from "react-router-dom";


export const CardCatalogPizza = (catalog: ProductProps) => {

  const { addProductToCart } = ContextCartApp()



  const handleAddProductToCart = () => {
    const productToCart = {
      ...catalog,
      mode: 'SIMPLE',
      quantityProduct: 1
    }
    addProductToCart(productToCart)
  }


  return (
    <Card className="bg-white border-0  rounded w-11/12 py-2 box-border">
      <CardContent className="w-full flex items-center justify-between gap-2">
        <div className="">
          <img className="w-72 object-fit  rounded" src={catalog.image_url} alt='' />
        </div>
        <div className="w-full flex flex-col items-start justify-start">
          {catalog.product.map((item) => (<p key={item.name} className="font-bold text-lg text-gray-600">{item.name}</p>))}
          <p className="text-gray-600">{catalog.description}</p>
          <div className="w-full flex items-center justify-between mt-3 ">
            <p className="text-gray-500 font-bold text-lg">{priceFormatter.format(Number(catalog.price))}</p>

          </div>
        </div>
      </CardContent>
      <div className="px-2 flex items-center justify-center flex-col w-full text-gray-100  gap-2 ">
        <Button onClick={handleAddProductToCart} className={"w-full rounded bg-orange-500 hover:bg-orange-600 text-lg"} >Adicionar ao carrinho</Button>
        <NavLink className="w-full" to="/personalize">
          <Button className={"w-full rounded border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50"} >Personalizar</Button>
        </NavLink>
      </div>
    </Card>

  )
}