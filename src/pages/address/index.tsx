import { MapPinOff, Plus } from "lucide-react";
import { CardAddress } from "./components/card";
import { NavLink } from 'react-router-dom'
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import ServiceAddress from '../../infrastructure/services/address'
import { ColorRing } from "react-loader-spinner";
import { ButtonCheckout } from "../../components/ButtonCheckout";
import { ContextCartApp } from "../../context/cart-context";


export default function Address() {
  // const [addresses, setAddresses] = useState<AddressProps[] | []>([]);
  const [loading, setLoading] = useState(true);
  const serviceAddress = new ServiceAddress()
  const { setAddresses, addresses } = ContextCartApp();
  const getAddresses = async () => {

    try {
      const response = await serviceAddress.showAddress()
      const addressesArray = response.body
      setAddresses(addressesArray);
    } catch (error) {
      console.error("Erro ao carregar endereços", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);


  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-32">
        <Button disabled={addresses.length >= 3} className="w-4/5 text-orange-500 font-semibold  bg-transparent border-2 border-orange-500 my-4 rounded-md  py-2 px-4 ">
          <NavLink className="flex items-center justify-center gap-2" to="/create-address">
            <Plus />
            <span className="text-base ">Adicionar Endereco</span>
          </NavLink>
        </Button>
        {loading ? (
          <div className="mt-5 flex items-center justify-center w-11/12">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b', '#f59e0b']}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-5">
            {addresses ? (
              addresses.filter(address => address.neighborhood.status === "ACTIVE").map((address) => (
                <CardAddress key={address.id} address={address} />
              ))
            ) : (
              <MapPinOff size={50} className="font-bold mt-32 text-gray-300" />
            )}
          </div>
        )}

      </div>
      <ButtonCheckout link="/cart" title="Voltar" />


    </>
  )
}