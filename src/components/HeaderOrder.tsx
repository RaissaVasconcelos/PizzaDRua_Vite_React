
import { Banknote, CheckCircle, ChevronLeft, ShoppingBag, ShoppingCart } from "lucide-react"
import { NavLink } from "react-router-dom"
import delivery from '../assets/delivery.png'
import deliveryOrange from '../assets/delivery-orange.png'


type HeaderOrderProps = React.HTMLAttributes<HTMLDivElement> & {
  leftLink: string
  activeLink: 'CART' | 'PAYMENT' | 'CHECKOUT' | 'DELIVERY'
}
//className = {cn('flex flex-col w-4/5', address.className)
export const HeaderOrder = ({ leftLink, activeLink }: HeaderOrderProps) => {
  return (
    <header className={"w-full flex text-gray-400  mt-[94px]  items-center justify-center "}>
      <NavLink to={leftLink} className={"w-2/12 text-gray-50 py-[17.5px] bg-orange-500 flex items-center justify-center"}>
        <ChevronLeft size={35} strokeWidth={4} />
      </NavLink>
      <div className={`w-4/12 border-[1px] ${activeLink === 'CART' ? 'border-orange-300 bg-orange-50 text-orange-500' : 'border-gray-300'}  py-2 flex flex-col items-center justify-center`}>
        <ShoppingCart size={28} strokeWidth={1} className={`${activeLink === 'CART' ? 'text-orange-500' : 'text-gray-400'}}`} />
        Carrinho
      </div>
      <div className={`w-4/12 border-[1px] ${activeLink === 'DELIVERY' ? 'border-orange-300 bg-orange-50 text-orange-500' : 'border-gray-300'}  py-2 flex flex-col items-center justify-center`}>
        {activeLink === 'DELIVERY'
          ? (<img src={deliveryOrange} className={` w-7`} />)
          : (<img src={delivery} className={` w-7`} />)}
        Entrega
      </div>
      
      <div className={`w-4/12 border-[1px] ${activeLink === 'CHECKOUT' ? 'border-orange-300 bg-orange-50 text-orange-500' : 'border-gray-300'}  py-2 flex flex-col items-center justify-center`}>
        <CheckCircle size={28} strokeWidth={1} className={`${activeLink === 'CART' ? 'text-orange-500' : 'text-gray-400'}}`} />
        Finalizar
      </div>
      {/* <NavLink to={rightLink} className={"w-2/12 text-gray-50 py-[30px]  bg-orange-500 flex items-center justify-center"}>
        <ChevronRight size={35} strokeWidth={4} />
      </NavLink> */}
    </header>
  )
}