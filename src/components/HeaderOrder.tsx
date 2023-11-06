
import { ChevronLeft } from "lucide-react"
import { cn } from "../utils/cn"
import { NavLink } from "react-router-dom"



type HeaderOrderProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string
    link: string
}
//className = {cn('flex flex-col w-4/5', address.className)
export const HeaderOrder = ({ title, link, className }: HeaderOrderProps) => {
    return (
        <header className={cn("w-11/12 mx-4  mt-32  flex items-center justify-between", className)}>
            <NavLink to={link}>
                <ChevronLeft className="" />
            </NavLink>
            <h2 className="text-2xl text-gray-600 font-semibold">{title}</h2>
            <div/>
        </header>
    )
}