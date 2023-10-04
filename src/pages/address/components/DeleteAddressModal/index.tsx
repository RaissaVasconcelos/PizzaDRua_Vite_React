import * as AlertDialog from "@radix-ui/react-alert-dialog";


export const DeleteAddressModal = () => {
   
    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className=" fixed w-screen h-screen inset-0 bg-gray-900/[.6]" />
            <AlertDialog.Content className="w-11/12 rounded p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AlertDialog.Title className="text-gray-500 text-center font-semibold text-xl">
                    Tem certeza que deseja excluir esse endereço ?
                </AlertDialog.Title>
                <div className="flex items-center justify-center gap-4 mt-8 font-semibold">
                    <AlertDialog.Cancel asChild>
                        <button className=" p-2 text-gray-100 rounded bg-gray-500">
                            Cancelar
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button  className="bg-red-500 text-red-100 p-2 rounded ">
                            Sim, Excluir 
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};