import { ContextAuthApp } from "../../context/auth-context";
import { ContextCartApp } from "../../context/cart-context";
import { Summary } from "./components/summary";
import { HeaderOrder } from "../../components/HeaderOrder";
import { Card } from "../../components/ui/card";
import { CardProduct } from "./components/card-product";
import { ShoppingCart } from "lucide-react";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { NavLink } from "react-router-dom";



export default function Cart() {


  const { isAuthenticated } = ContextAuthApp()
  const { productToCart } = ContextCartApp()

  return (

    <div className="w-full flex flex-col items-center justify-center mb-10">
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder leftLink="/" activeLink='CART' />
      </div>
      {productToCart.length > 0
        ? (
          <>
            <Card className={' flex flex-col w-11/12  mt-5 gap-2 bg-white rounded-[8px]'}>

              {productToCart.filter(((item) => item.category.name === 'pizza')).map((item) => (
                <CardProduct
                  key={item.id}
                  products={item}
                />
              ))}

              {productToCart.filter(((item) => item.category.name === 'drink')).map((item) => (
                <CardProduct
                  key={item.id}
                  products={item}
                />
              ))}
            </Card>
            <Summary className="my-10" />
          </>
        )
        : (
          <div className="mt-10 w-full flex flex-col items-center justify-center gap-5">
            <ShoppingCart size={85} className="text-gray-300" />
            <p className="text-center text-gray-500 text-xl font-semibold">Seu carrinho esta vazio!</p>
          </div>
        )

      }
      {productToCart.length > 0 && (
        <ButtonCheckout >
          <NavLink to={isAuthenticated ? '/delivery' : '/sign-in'} >Proximo</NavLink>
        </ButtonCheckout>

      )}

    </div>

  )
}