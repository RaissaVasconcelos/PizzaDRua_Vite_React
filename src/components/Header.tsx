
import { ShoppingBag } from "lucide-react";
import { ContextApp } from "../context/context-app";
import { Profile } from "./Profile";
export const Header = () => {

  const { totalItemsOnCart } = ContextApp()

  return (
    <header className="bg-white flex items-center justify-between py-4 px-8  text-slate-100">
      <a href="/"><h1 className="text-xl text-gray-700 font-light">Pizza<span className="font-bold">D'Rua</span></h1></a>
      <div className=" flex items-center justify-center gap-4">
        <a className="" href={'/cart'}>
          <div className="flex items-center justify-center">
            <div className="rounded-full text-orange-500 bg-orange-100 p-4">
              <ShoppingBag size={28} />
            </div>

            {totalItemsOnCart && <span className="text-orange-100 bg-orange-500 px-2 -ml-5 mb-8 rounded-full">{totalItemsOnCart}</span>}
          </div>
        </a>
        <Profile />      
      </div>
    </header>
  )

}