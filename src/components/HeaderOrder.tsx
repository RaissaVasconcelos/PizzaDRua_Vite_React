
import { ChevronLeft } from "lucide-react"
import { cn } from "../utils/cn"



type HeaderOrderProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string
    link: string
}
//className = {cn('flex flex-col w-4/5', address.className)
export const HeaderOrder = ({ title, link, className }: HeaderOrderProps) => {
    return (
        <header className={cn("mx-5  mt-10 flex items-center  justify-between", className)}>
            <a href={link}>
                <ChevronLeft className="" />
            </a>
            <h2 className="text-xl font-semibold">{title}</h2>
        </header>
    )
}