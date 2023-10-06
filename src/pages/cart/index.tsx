import { ContextApp } from "../../context/context-app";
import { Summary } from "./components/summary";
import { HeaderOrder } from "../../components/HeaderOrder";
import { CardPersonalize } from "./components/card-personalize";
import { Card } from "../../components/ui/card";
import { CardProduct } from "./components/card-product";
import { CardDrink } from "./components/card-drink";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { CardAddress } from "../../components/CardAddress";
import { ShoppingCart } from "lucide-react";

export default function Cart() {

  const { currentAddress, productToCart, productPersonalize } = ContextApp()


  return (
    <div className=" max-w-[1100px] m-auto">
      <div className="w-full flex flex-col items-center justify-center mb-10">
        <div className="w-full flex flex-col items-start justify-center ">
          <HeaderOrder title="Meu Carrinho" link="/" />
        </div>
        {productToCart.length > 0 || productPersonalize.length > 0
          ? (
            <>
              <Card className={'divide-y-2 divide-orange-400/50 flex flex-col w-11/12  mt-5 gap-2 bg-white rounded-[8px]'}>
                {productPersonalize.length > 0 && (
                  <CardPersonalize
                    flavor={productPersonalize[0].flavor?.map((flavor) => ({
                      value: flavor.value
                    }))}
                    price={productPersonalize[0].finalPrice}
                    size={productPersonalize[0].size}
                  />
                )}
                {productToCart.filter(((item) => item.category.name === 'pizza')).map((item) => (
                  <CardProduct
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantityProduct={item.quantityProduct}
                  />
                ))}

                {productToCart.filter(((item) => item.category.name === 'drink')).map((item) => (
                  <CardDrink
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantityProduct={item.quantityProduct}
                    description={item.description}
                  />
                ))}
              </Card>
              <Summary tax={currentAddress  ? currentAddress.neighborhood.tax : '0.00'} />
            </>
          )
          : (
            <div className="mt-10 w-full flex flex-col items-center justify-center gap-5">
              <ShoppingCart size={85} className="text-gray-300"/>
              <p className="text-center text-gray-500 text-xl font-semibold">Seu carrinho esta vazio!</p>
            </div>
          )



        }

        <div className="w-full flex items-center justify-center my-10">
          <CardAddress />
        </div>

        {currentAddress &&
          <div className={'w-full flex items-center justify-center'} >
            <Button disabled={productToCart.length === 0 && productPersonalize.length === 0} className="rounded-[8px]  text-gray-100 text-lg mt-5 w-11/12 bg-orange-500 hover:bg-orange-600 ">
              <NavLink to={"/payment"}>
                Finalizar Compra
              </NavLink>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}