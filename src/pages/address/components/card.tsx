import { Building2, Edit, Home, MapPin } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { cn } from "../../../utils/cn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { EditAddressModal } from "./EditAddressModal";
import { useState } from "react";

type AddressProps = {
  type: "HOME" | "WORK" | "OTHER"
  customerId: string
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
  id: string
}
interface AddressCardProps {
  address: AddressProps
}

export const CardAddress = ({ address }: AddressCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card className={cn('flex flex-col w-11/12')}>
      <CardHeader className="mb-[-10px]" >
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-start gap-2 text-orange-500">
            {address.type === "HOME" ? <Home size={20} /> : address.type === "WORK" ? <Building2 size={18} /> : <MapPin />}
            <CardTitle className="text-md">{address.type}</CardTitle>
          </div>

          <Button onClick={() => setOpenModal(true)} className="bg-transparent hover:bg-transparent text-orange-500 flex gap-2 p-1"><Edit size={18} />  Editar</Button>
        </div>
        <EditAddressModal
          address={address}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      </CardHeader>
      <CardContent className="px-3" >
        <CardDescription className="text-sm w-full flex  flex-col items-start justify-center">
          <div className="flex items-center justify-start gap-2 ">
            <span>{address.street},</span>
            <span>{address.number} - </span>
            <span>{address.neighborhood.name}</span>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span>{address.phone}</span>
            <span>{address.zipCode}</span>
          </div>
        </CardDescription>
        {address.standard &&
          <div className="mt-2 rounded text-orange-500 flex items-center justify-center border-2 border-orange-500 w-16">
            Padrao
          </div>
        }
      </CardContent>
    </Card>
  )

}
