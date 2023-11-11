import { Building2, Edit, Home, MapPin, MapPinOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AddressProps, ContextApp } from "../context/context-app";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { parseCookies } from "nookies";
import { ColorRing } from "react-loader-spinner";

interface CardAddressProps {
  textLink: string;
}

export const CardAddress = ({ textLink }: CardAddressProps) => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = ContextApp()

  const getAddresses = async () => {
    const token = parseCookies().accessToken;

    try {
      const response = await api.get('/address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error("Erro ao carregar endereços", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const address = addresses.find((address) => address.standard === true);

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
        <div className="w-11/12 flex bg-white rounded flex-col items-center justify-center p-4">
          <header className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between gap-2 text-orange-500">
              {address.type === "HOME" ? <Home size={20} /> : address.type === "WORK" ? <Building2 size={18} /> : <MapPin />}
              <span>{address.type}</span>
            </div>
            <NavLink to={textLink}>
              <Edit size={24} className="text-gray-500" />
            </NavLink>
          </header>
          <div className="w-full flex items-start justify-center flex-col">
            <div className="w-11/12 mt-2 flex gap-2">
              <span>{address.street},</span>
              <span>{address.number} - </span>
              <span>{address.neighborhood.name}</span>
            </div>
            <span>{address.phone}</span>
            <span>{address.zipCode}</span>
          </div>
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