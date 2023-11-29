import { MapPin, MapPinOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AddressProps, ContextAuthApp } from "../context/auth-context";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ServiceAddress from '../infrastructure/services/address'
import { ColorRing } from "react-loader-spinner";
import { cn } from "../utils/cn";

type CardAddressProps = React.HTMLAttributes<HTMLParagraphElement> & {
  textLink?: string;
}

export const CardAddress = ({ textLink, className }: CardAddressProps) => {
  const [address, setAddress] = useState<AddressProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = ContextAuthApp()
  const serviceAddress = new ServiceAddress()
  const getAddresses = async () => {

    try {
      const response = await serviceAddress.showAddress()
      const addresses = response.body
      const standardAddress = addresses.find((element: AddressProps) => element.standard === true && element.neighborhood.status === "ACTIVE");
      if (standardAddress) {
        setAddress(standardAddress);
      }
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
      {loading ? (
        // Mostrar o spinner enquanto os dados são carregados
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
      ) : address ? (
        // Exibir o card do endereço padrão
        <div className={cn("flex bg-white rounded  items-center justify-center", className)}>
          <header className="flex items-center justify-start gap-2 w-full">
            {<MapPin size={50} className="bg-orange-50 text-orange-500 p-3 rounded-full" />}
          <div className="w-full flex items-start justify-start flex-col gap-1">
            <p>{address.street}, {address.number}</p>
            <p className="text-gray-400 text-sm">{address.neighborhood.name}</p>
          </div>
            {
              textLink && (
                <NavLink className='text-red-500 text-sm' to={textLink}>
                  Trocar
                </NavLink>
              )
            }
          </header>
        </div>
      ) : (
        // Exibir o card para ativar um endereço como padrão
        <div className="mt-5 flex flex-col items-center justify-center w-full">
          <MapPinOff className="w-10 h-10 text-gray-300" />
          <p className="text-center text-gray-500 text-lg font-medium">Selecione ou cadastre um endereço para entrega</p>
          <NavLink className='w-full flex items-center justify-center' to={isAuthenticated ? "/address" : "/sign-in"}>
            <Button className="rounded-[8px]  text-gray-100 text-lg mt-5 w-11/12 bg-red-500 hover:bg-red-600 ">Cadastrar Endereço</Button>
          </NavLink>
        </div>
      )}
    </>
  );
};