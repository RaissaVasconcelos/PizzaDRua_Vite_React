import { useState } from "react"
import { DeleteModal } from "../../../../components/ModalDelete"
import { priceFormatter } from "../../../../utils/formatter";
import { Edit, Trash2 } from "lucide-react";
import ModalEditNeighborhood from "./ModalEditNeighborhood";

interface TableProps {
  id: string;
  name: string;
  tax: string;
}

export const TrTable = (neighborhood: TableProps) => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
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
        <Trash2 onClick={() => setIsOpenModalDelete(true)} size={20} className="text-orange-500 cursor-pointer" />
      </td>
      <ModalEditNeighborhood
        neighborhood={neighborhood}
        openModal={isOpenModalEdit}
        setOpenModal={setIsOpenModalEdit}
      />
      <DeleteModal
        id={neighborhood.id}
        url={'neighborhood'}
        text={'Tem certeza que deseja excluir esse Bairro?'}
        openModal={isOpenModalDelete}
        setOpenModal={setIsOpenModalDelete} />
    </tr>
  )
}