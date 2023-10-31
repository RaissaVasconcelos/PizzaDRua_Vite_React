import { ToastContainer } from "react-toastify";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { priceFormatter } from "../../../../utils/formatter";
import { Edit, Trash2 } from "lucide-react";
import ModalEditProduct from "./ModalEditProduct";
import { ProductProps } from "../../../../context/context-app";
import { useState } from "react";
import { DeleteModal } from "../../../../components/ModalDelete";

interface CardProductsProps {
  product: ProductProps;
}

export const CardProducts = ({product}: CardProductsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

 

  return (
    <div className="bg-white flex flex-col items-center justify-center border-0 rounded w-full py-2">
      <CardContent className="w-full flex flex-col items-center justify-between gap-2">

        <img className="object-cover w-full h-72" src={product.image_url} alt='' />

        <div className="w-full">
          <p className="font-bold text-lg text-gray-600">{product.product.map((product) => product.name)}</p>
          <p className="text-gray-600">{product.description}</p>

          <p className="text-gray-500 font-bold text-lg">{priceFormatter.format(Number(product.price))}</p>
        </div>

      </CardContent>
      <div className="px-2 flex items-center justify-center flex-col w-full text-gray-100  gap-2 ">
       
        <Button onClick={() => setOpenModal(true)} className={"w-full rounded bg-orange-500 hover:bg-orange-600 text-lg flex gap-3"} >Editar Produto <Edit size={20} /></Button>
          
        <ModalEditProduct product={product} openModal={openModal} setOpenModal={setOpenModal} />    
       
        <Button onClick={() => setOpenModalDelete(true)} className={"w-full rounded border-2 border-orange-500 text-lg text-orange-500 bg-white hover:bg-orange-50 flex gap-3"} >Excluir <Trash2 size={20} /> </Button>
        <div className="w-7/12">
          <DeleteModal
            openModalDelete={openModalDelete}
            setOpenModalDelete={setOpenModalDelete}
            notifyText="Produto excluido com sucesso"  
            url="/product"
            text="Tem certeza que deseja excluir esse Produto ?"
            id={product.id} />
        </div>
        <ToastContainer />
      </div>
    </div>

  )
}