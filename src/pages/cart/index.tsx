import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { AddressProps, ContextApp } from "../../context/context-app";
import { Summary } from "./components/summary";
import { MapPinOff } from "lucide-react";
import { HeaderOrder } from "../../components/HeaderOrder";
import { CardPersonalize } from "./components/card-personalize";
import { Card } from "../../components/ui/card";
import { CardProduct } from "./components/card-product";
import { CardDrink } from "./components/card-drink";
import { CardAddress } from "./components/card-address";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";


export default function CartPage() {
  
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [addressesLoaded, setAddressesLoaded] = useState(false);
 
  const { "address": address } = parseCookies();


  const { productToCart, drinkToCart, addresses, productPersonalize } = ContextApp()

  const getDataCookies = async () => {
    if (address) {
      setCurrentAddress(JSON.parse(address))
      setAddressesLoaded(true)
    } else if (addresses && addresses.length > 0) {
      setCurrentAddress(addresses[0])
      setAddressesLoaded(true)
    }

  }

  useEffect(() => {
    getDataCookies()
  }, [addresses])

  return (
    <div className=" max-w-[1100px] m-auto">
      <div className="w-full flex flex-col items-center justify-center mb-10">
        <div className="w-full flex flex-col items-start justify-center ">
          <HeaderOrder className="w-7/12" title="Meu pedido" link="/" />
        </div>

        {productPersonalize.length > 0 &&
          <CardPersonalize
            flavor={productPersonalize[0].flavor?.map((flavor) => ({
              value: flavor.value
            }))}
            price={productPersonalize[0].finalPrice}
            size={productPersonalize[0].size}
          />
        }
        {productToCart.length > 0 &&
          <Card className={'divide-y-2 divide-orange-400/50 flex flex-col w-10/12 py-2 mt-5 gap-2 bg-white rounded-[8px]'}>
            {productToCart.map((item) => (
              <CardProduct
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantityProduct={item.quantityProduct}
              />
            ))}
          </Card>
        }
        {drinkToCart.length > 0 &&
          <Card className={'flex flex-col w-10/12 py-2 mt-5 gap-3 bg-white rounded-[8px]'}>
            {drinkToCart.map((item) => (
              <CardDrink
                key={item.id}
                description={item.description}
                id={item.id}
                name={item.name}
                price={item.price}
                quantityProduct={item.quantityProduct}
              />
            ))}
          </Card>
        }

        <Summary
          tax={currentAddress ? currentAddress.neighborhood.tax : "5.00"}
        />


        {
          currentAddress !== null ? (
            <CardAddress
              type={currentAddress.type}
              neighborhood={currentAddress.neighborhood.name}
              street={currentAddress.street}
              number={currentAddress.number}
            />

          ) : (
            <div className="mt-5 flex flex-col items-center justify-center w-11/12">
              <MapPinOff className="w-10 h-10 text-gray-300" />
              <p className="text-center text-gray-500 text-lg font-medium">Selecione ou cadastre um endereço para entrega</p>
              <NavLink className='w-full flex items-center justify-center' to={"/address"}>
                <Button className="rounded-[8px]  text-gray-100 text-lg mt-5 w-11/12 bg-red-500 hover:bg-red-600 ">Cadastrar Endereço</Button>
              </NavLink>
            </div>

          )

        }
        {currentAddress &&
          <Button  className="rounded-[8px]  text-gray-100 text-lg mt-5 w-10/12 bg-orange-500 hover:bg-orange-600 ">
            Finalizar Compra
          </Button>
        }
      </div>
    </div>
  )
}