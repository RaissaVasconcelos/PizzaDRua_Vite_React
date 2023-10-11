import { Trash } from "lucide-react"
import imageUrl from '../../../../public/coca-cola.png'
import { ContextApp, OrdersCartProps } from "../../../context/context-app"
import { CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"


interface CartProps {
    id: number
    name: string
    price: string
    description: string
    quantityProduct: number

}

export const CardDrink = ({ product, price, quantityProduct, id, description }: OrdersCartProps) => {
    const { removeProductFromCart } = ContextApp()
    const priceString = price.replace(',', '.')
    const totalPrice = (parseFloat(priceString) * quantityProduct).toFixed(2)
    return (

        <CardContent className="flex items-center justify-between py-2">
            <div className="flex items-center justify-center gap-2">
                <img
                    className="w-28 rounded"
                    src={imageUrl}
                    width={100}
                    height={100}
                    alt="" />
                <div className="flex flex-col items-start justify-center">
                    <div className="flex  items-center justify-start gap-2 ">

                        <span className="text-gray-600 font-semibold">{product.map((product) => product.name)}</span>

                    </div>
                    <span>{description}</span>
                    <span>Qtd {quantityProduct}x</span>
                    <span className="font-semibold">R$ {totalPrice}</span>
                </div>
            </div>
            <div className="flex items-start justify-center ">
                <Button onClick={() => removeProductFromCart(id)} className="h-[5rem] mt-1 bg-orange-50 text-orange-500 border-2 border-orange-500 hover:bg-orange-300 rounded-[8px]">
                    <Trash size={20} />
                </Button>
            </div>

        </CardContent>

    )

}