
import { Building2, Edit, Home, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

interface CardAddressProps {
  street: string
  neighborhood: string
  number: string
  type: string
}

export const CardAddress = ({ type, street, neighborhood, number }: CardAddressProps) => {
  console.log(neighborhood);
  
  return (
    <div className="w-10/12 flex bg-white p-2 rounded flex-col items-center justify-center mt-10">
      <header className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between gap-2 text-orange-500">
          {type === "Casa" ? <Home size={20} /> : type === "Trabalho" ? <Building2 size={18} /> : <MapPin />}
          <span>{type}</span>
        </div>
        <NavLink to="/address">
          <Edit size={18} />
        </NavLink>
      </header>
      <div className=" w-10/12 mt-2 flex gap-2">
        <span>{street},</span>
        <span>{neighborhood}</span>
        <span>{number}</span>
      </div>
    </div>
  )
}