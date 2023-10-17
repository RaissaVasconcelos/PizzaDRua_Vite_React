import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/toast";
import { api } from "../utils/axios";


interface DeleteModalProps {
  setOpenModal: (isOpen: boolean) => void;
  openModal: boolean;
  text: string;
  id: string
  url: string
}

export const DeleteModal = ({ openModal, setOpenModal, text, id, url }: DeleteModalProps) => {

  const handleDelete = async () => {
    await api.delete(`/${url}/${id}`)
    notify('Produto Excluido com sucesso', 'top')
    setOpenModal(false)
  }
  
  return (
    
      <AlertDialog.Root open={openModal} >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
          <AlertDialog.Content className="sm:w-7/12 w-11/12 rounded py-10 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AlertDialog.Title className="text-gray-500 text-center font-semibold text-xl">
              {text}
            </AlertDialog.Title>
            <div className="flex items-center justify-center gap-4 mt-8 font-semibold">
              <AlertDialog.Cancel asChild>
                <button onClick={() => setOpenModal(false)} className=" p-2 text-gray-100 rounded bg-gray-500">
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button onClick={handleDelete} className="bg-red-500 text-red-100 p-2 rounded ">
                  Sim, Excluir
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
        <ToastContainer />
      </AlertDialog.Root>
    
  );
};