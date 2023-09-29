import { Building2, Edit, Home, MapPin, Trash } from "lucide-react"
import React from "react"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../utils/cn"
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { EditAddressModal } from "./EditAddressModal";


type AddressProps  = {
  type: string
  street: string
  number: string
  neighborhood: {
    name: string
    tax: string
  }

  zipCode: string
  phone: string
  addressId: number
}

type AddressCardProps  = AddressProps & React.HTMLAttributes<HTMLDivElement>  

export const CardAddress: React.FC<AddressCardProps> = ({addressId ,className, type, street, number, neighborhood, zipCode, phone, ...rest}) => {
  console.log(neighborhood);
  
  
  return (
    <Card {...rest} className={cn('flex flex-col w-4/5', className)}>
      <CardHeader >
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-start gap-2 text-orange-500">
            {type === "Casa" ? <Home size={20} /> : type === "Trabalho" ? <Building2 size={18} /> : <MapPin />}
            <CardTitle className="text-md">{type}</CardTitle>
          </div>
          
        </div>
      </CardHeader>
      <CardContent >
        <CardDescription className="text-sm">
          <div className="flex items-center justify-start gap-2 mb-4">
            <span>{street},</span>
            <span>{neighborhood.name},</span>
            <span>{number}</span>
          </div>
        </CardDescription>
        <div className="text-white flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
          <Dialog.Root >
            <Dialog.Trigger asChild>
              <Button className="bg-gray-400 hover:bg-gray-500 flex gap-2"><Edit size={18} />  Editar</Button>
            </Dialog.Trigger>
            <EditAddressModal  
              number={number} 
              street={street}
              phone={phone}
              neighborhood={neighborhood}
              type={type}
              zipCode={zipCode}
              id={addressId}

            />
          </Dialog.Root>
          <Button className="bg-red-500 hover:bg-red-600  flex gap-2"><Trash size={18} /> Deletar</Button>
        </div>
      </CardContent>
    </Card>
  )

}