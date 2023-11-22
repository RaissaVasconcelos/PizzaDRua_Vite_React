import { NavLink } from "react-router-dom";
import { ContextCartApp } from "../../context/cart-context";
import { priceFormatter } from "../../utils/formatter";
import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";
import { Navigate } from "./components/Navigate";

export default function Home() {
  const { totalItemsOnCart, cartProductsTotalPrice } = ContextCartApp();
  const totalPriceProduct = (cartProductsTotalPrice).toFixed(2)
  return (
    <div className="mt-20">
      <Hero />
      <Navigate />
      <Catalog />
      {
        totalItemsOnCart > 0 && (
          <div className={`border-t-[1px] border-gray-200  bg-white max-w-[1100px] m-auto flex items-center justify-between p-5 h-24 bottom-0 left-0 right-0  fixed`}>
            <div>
              <span className="text-gray-500 text-sm">Total sem a entrega</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 font-bold">{totalPriceProduct ? priceFormatter.format(Number(totalPriceProduct)) : "0,00"}</span>
                <span className="text-gray-400 text-xs">/ {totalItemsOnCart} item</span>
              </div>
            </div>
            <NavLink className='w-6/12 bg-red-500 text-gray-100 p-2 rounded flex items-center justify-center' to="/cart">Ver carrinho</NavLink>
          </div>
      )
      }
     
    </div>
  )
}

