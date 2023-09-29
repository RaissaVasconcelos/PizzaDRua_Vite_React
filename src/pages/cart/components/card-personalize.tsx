import { Trash } from "lucide-react"
import React from "react"
import imageUrl from '../../../assets/pizza.svg'
import { ContextApp } from "../../../context/context-app"
import { cn } from "../../../utils/cn"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"


type CartProps = React.HTMLAttributes<HTMLDivElement> & {
    flavor: {
        value?: string | undefined
    }[] | undefined
    price?: string
    size: string
}

export const CardPersonalize = ({ flavor, price, size, className }: CartProps) => {
    console.log(flavor, 'flavor');

    const { removeProductPersonalizeFromCart } = ContextApp()
    return (
        <Card className={cn('flex flex-col w-10/12 py-2 mt-5 bg-white rounded-[8px]', className)}>
            <CardContent className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <img
                        className="w-28 rounded"
                        src={imageUrl}
                        width={100}
                        height={100}
                        alt="" />
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex  items-center justify-center gap-2 ">

                            {flavor?.map((item) => (
                                <span key={item.value}>{item.value}</span>
                            ))}
                        </div>
                        <span>Tamanho {size === 'MEDIUM' ? 'M' : 'MEIA'}</span>
                        <span className="font-semibold">R$ {price}</span>
                    </div>
                </div>
                <div className="h-full">
                    <Button onClick={() => removeProductPersonalizeFromCart(size)} className="h-[5rem] mt-2 bg-orange-50 text-orange-500 border-2 border-orange-500 hover:bg-orange-300 rounded-[8px]"><Trash size={20} /></Button>
                </div>

            </CardContent>
        </Card>
    )

}