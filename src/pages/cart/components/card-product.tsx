
import { Trash } from "lucide-react"
import imageUrl from '../../../assets/pizza.svg'
import { ContextApp } from "../../../context/context-app"
import { CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"


interface CartProps {
    id: number
    name: string
    price: string
    quantityProduct: number

}

export const CardProduct = ({ name, price, quantityProduct, id }: CartProps) => {
    const { removeProductFromCart } = ContextApp()
    const priceString = price.replace(',', '.')
    const totalPrice = (parseFloat(priceString) * quantityProduct)
    return (

        <CardContent className="flex items-center justify-between ">
            <div className="flex items-center justify-center gap-2">
                <img
                    className="w-28 rounded h-28"
                    src={imageUrl}
                    width={100}
                    height={150}
                    alt="" />
                <div className="flex flex-col items-start justify-center">
                    <div className="flex  items-center justify-start gap-2 ">

                        <span className="text-gray-600 font-semibold">{name}</span>

                    </div>
                    <span>Tamanho M</span>
                    <span>Qtd {quantityProduct}x</span>
                    <span className="font-semibold">R$ {totalPrice}</span>
                </div>
            </div>
            <div className="flex items-start justify-center ">
                <Button onClick={() => removeProductFromCart(id)} className="h-[5rem] mt-2 bg-orange-50 text-orange-500 border-2 border-orange-500 hover:bg-orange-300 rounded-[8px]">
                    <Trash size={20} />
                </Button>
            </div>

        </CardContent>

    )

}