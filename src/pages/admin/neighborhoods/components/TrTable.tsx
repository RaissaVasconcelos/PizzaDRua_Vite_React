import { useState } from "react"
import { priceFormatter } from "../../../../utils/formatter";
import { Edit } from "lucide-react";
import ModalEditNeighborhood from "./ModalEditNeighborhood";

interface TableProps {
  id: string;
  name: string;
  tax: string;
  status?: 'ACTIVE' | 'DISABLE';
}

interface NeighborhoodsProps {
  neighborhood: TableProps

}

export const TrTable = ({ neighborhood }: NeighborhoodsProps) => {

  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  return (
    <tr >
      <td className="bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
        {neighborhood.name}
      </td>
      <td
        className={`w-3/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900 `}
      >
        {priceFormatter.format(Number(neighborhood.tax))}
      </td>
      <td className="w-1/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
        <Edit size={20} onClick={() => setIsOpenModalEdit(true)} className="text-orange-500 cursor-pointer" />
      </td>

      <td className="w-1/12 bg-gray-800 p-4 text-xl border-t-4 border-gray-900">
        <span className={`${neighborhood.status === 'ACTIVE' ? 'text-emerald-500 border-emerald-500' : 'text-red-500 border-red-500'} text-sm font-light border-[1px] rounded p-1`}>
          {neighborhood.status}
        </span>
      </td>
      <ModalEditNeighborhood
        neighborhood={neighborhood}
        openModalEdit={isOpenModalEdit}
        setIsOpenModalEdit={setIsOpenModalEdit}
      />

    </tr>
  )
}