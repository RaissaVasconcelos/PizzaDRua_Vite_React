import { CardProducts } from "./components/Card";
import * as Dialog from "@radix-ui/react-dialog";
import ModalRegisterProduct from "./components/ModalRegisterProduct";
import { ContextCartApp } from "../../../context/cart-context";
import { HeaderAdmin } from "../../../components/HeaderAdmin";


export default function Products() {
  const {products} = ContextCartApp()
  return (
      <>
      <HeaderAdmin />
        <div className="w-11/12 mt-10 flex items-center justify-end">
        <Dialog.Root >
          <Dialog.Trigger asChild >
            <button className="bg-orange-500 text-gray-100 p-2 rounded font-medium">
              Cadastrar Produto
            </button>
        </Dialog.Trigger>
          <ModalRegisterProduct/>
        </Dialog.Root>
      
        </div>
        <div className="w-11/12 mt-10   gap-5 grid grid-flow-row  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <CardProducts product={product} key={product.id} />
          ))}
        </div>
      </>
  
  )
}