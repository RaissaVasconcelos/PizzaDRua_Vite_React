import { AddressProps, ContextAuthApp } from "../../context/auth-context";
import { ContextCartApp } from "../../context/cart-context";
import { Summary } from "./components/summary";
import { HeaderOrder } from "../../components/HeaderOrder";
import { Card } from "../../components/ui/card";
import { CardProduct } from "./components/card-product";
import { CardDrink } from "./components/card-drink";
import { ShoppingCart } from "lucide-react";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { NavLink } from "react-router-dom";
import { api } from "../../utils/axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";


export default function Cart() {
  const [address, setAddress] = useState<AddressProps | null>(null)

  const { isAuthenticated } = ContextAuthApp()
  const { productToCart } = ContextCartApp()

  const getAddresses = async () => {
    const response = await api.get('/address', {
      headers: {
        Authorization: `Bearer ${parseCookies().accessToken}`
      }
    })
    setAddress(response.data.find((element: AddressProps) => element.standard === true))
  }

  useEffect(() => {
    getAddresses()
  }, [])

  return (

    <div className="w-full flex flex-col items-center justify-center mb-10">
      <div className="w-full flex flex-col items-start justify-center ">
        <HeaderOrder leftLink="/" activeLink='CART' />
      </div>
      {productToCart.length > 0
        ? (
          <>
            <Card className={'divide-y-2 divide-orange-400/50 flex flex-col w-11/12  mt-5 gap-2 bg-white rounded-[8px]'}>

              {productToCart.filter(((item) => item.category.name === 'pizza')).map((item) => (
                <CardProduct
                  key={item.id}
                  id={item.id}
                  product={item.product}
                  price={item.price}
                  quantityProduct={item.quantityProduct}
                  description={item.description}
                  image_url={item.image_url}
                  size={item.size}
                />
              ))}

              {productToCart.filter(((item) => item.category.name === 'drink')).map((item) => (
                <CardDrink
                  key={item.id}
                  id={item.id}
                  product={item.product}
                  price={item.price}
                  quantityProduct={item.quantityProduct}
                  description={item.description}
                  image_url={item.image_url}
                  size={item.size}

                />
              ))}
            </Card>
            <Summary className="my-10" tax={address ? address.neighborhood.tax : '0.00'} />
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