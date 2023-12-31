import { Card, CardContent } from "../../../../../components/ui/card"
import image from "../../../../../assets/lata.png"
import { Button } from "../../../../../components/ui/button"
import { ContextCartApp, ProductProps } from "../../../../../context/cart-context"
import { priceFormatter } from "../../../../../utils/formatter"



export const CardCatalogDrink = (catalog: ProductProps) => {

  const { addProductToCart } = ContextCartApp()


  const handleAddDrinkToCart = () => {
    const drinkToCart = {
      ...catalog,
      mode: 'SIMPLE',
      quantityProduct: 1
    }
    addProductToCart(drinkToCart)
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
          </div>
        </div>
      </CardContent>
      <div className="flex items-center justify-center flex-col w-full text-gray-100  gap-2 ">
        <Button onClick={handleAddDrinkToCart} className={"w-full rounded bg-orange-500 hover:bg-orange-600 text-lg"} >Adicionar ao carrinho</Button>
      </div>

    </Card>

  )
}