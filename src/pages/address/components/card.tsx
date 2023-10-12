import { Building2, Edit, Home, MapPin } from "lucide-react"
import React from "react"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../utils/cn"
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { EditAddressModal } from "./EditAddressModal";


type AddressProps  = {
  type: "HOME" | "WORK" | "OTHER"
  street: string
  number: string
  neighborhood: {
    id: string
    name: string
    tax: string
  }
  standard: boolean
  zipCode: string
  phone: string
  addressId: string
}

type AddressCardProps  = AddressProps & React.HTMLAttributes<HTMLDivElement>  

export const CardAddress: React.FC<AddressCardProps> = ({addressId ,className, type, street, number, neighborhood, standard, zipCode, phone, ...rest}) => {
  
  
  return (
    <Card {...rest} className={cn('flex flex-col w-11/12', className)}>
      <CardHeader className="mb-[-10px]" >
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-start gap-2 text-orange-500">
            {type === "HOME" ? <Home size={20} /> : type === "WORK" ? <Building2 size={18} /> : <MapPin />}
            <CardTitle className="text-md">{type}</CardTitle>
          </div>
          <Dialog.Root >
            <Dialog.Trigger asChild>
              <Button className="bg-transparent hover:bg-transparent text-orange-500 flex gap-2 p-1"><Edit size={18} />  Editar</Button>
            </Dialog.Trigger>
            <EditAddressModal
              number={number}
              street={street}
              phone={phone}
              neighborhood={neighborhood}
              type={type}
              zipCode={zipCode}
              id={addressId}
              standard={standard}  

            />
          </Dialog.Root>
        </div>
      </CardHeader>
      <CardContent className="px-3" >
        <CardDescription className="text-sm w-full flex  flex-col items-start justify-center">
          <div className="flex items-center justify-start gap-2 ">
            <span>{street},</span>
            <span>{number} - </span>
            <span>{neighborhood.name}</span>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span>{phone}</span>
            <span>{zipCode}</span>
          </div>
        </CardDescription>
        { standard &&  
        <div className="mt-2 rounded text-orange-500 flex items-center justify-center border-2 border-orange-500 w-16">
            Padrao
        </div>
        }
      </CardContent>
    </Card>
  )

}
     