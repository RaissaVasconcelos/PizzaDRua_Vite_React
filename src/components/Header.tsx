
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { ContextCartApp } from "../context/cart-context";
import { Profile } from "./Profile";
import { NavLink } from "react-router-dom";
export const Header = () => {

  const { totalItemsOnCart } = ContextCartApp()

  return (
    <header className="bg-white flex items-center justify-between py-4 px-8  text-slate-100 fixed w-full z-10">
      <NavLink to="/"><h1 className="text-xl text-gray-700 font-light">Pizza<span className="font-bold">D'Rua</span></h1></NavLink>
      <div className=" flex items-center justify-center gap-4">
        <NavLink className="" to={'/cart'}>
          <div className="flex items-center justify-center">
            <div className="rounded-full text-orange-500 bg-orange-100 p-4">
              <ShoppingCart size={28} />
            </div>

            {totalItemsOnCart && <span className="text-white bg-orange-500 px-2 -ml-5 mb-8 rounded-full">{totalItemsOnCart}</span>}
          </div>
        </NavLink>
        <Profile />      
      </div>
    </header>
  )

}