import { Card, CardContent } from "../../../../../components/ui/card"
import { InputQuantityProductInCart } from "../input-quantity-product-in-cart"
import { useState } from "react"
import image from "../../../../../assets/Vector.svg"
import { Button } from "../../../../../components/ui/button"
import { ToastContainer } from "react-toastify";
import { notify } from "../../../../../utils/toast"
import { ContextApp } from "../../../../../context/context-app"

interface CardCatalogProps {
    id: number,
    type?: 'TRADITIONAL' | 'SPECIAL',
    name: string,
    price: string,
    image_url: string
    description: string

}

export const CardCatalogDrink = (catalog: CardCatalogProps) => {


    const [quantityProduct, setQuantityProduct] = useState(1);
    const { addDrinkToCart } = ContextApp()

    const handleIncrementProduct = () => {
        setQuantityProduct((state) => state - 1);
    };

    const handleDecrementProduct = () => {
        setQuantityProduct((state) => state + 1);
    };

    const handleAddDrinkToCart = () => {
        const drinkToCart = {
            ...catalog,
            quantityProduct
        }
        addDrinkToCart(drinkToCart)
        notify()
    }


    return (
        <Card className="bg-white border-0 p-2 rounded w-11/12">
            <CardContent className=" w-full flex items-center justify-between gap-3">
                <img src={image} className="w-20 h-20" alt='' />
                <div className="w-full">
                    <p className="font-bold text-lg text-gray-600">{catalog.name}</p>
                    <p className="text-gray-600">{catalog.description}</p>
                    <div className="w-full flex items-center justify-between mt-3 ">
                        <p className="text-gray-500 font-bold text-lg">R${catalog.price}</p>
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