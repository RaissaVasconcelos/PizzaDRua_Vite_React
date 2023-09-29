import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notify = () =>
  toast.success("Adicionado com sucesso", {

    autoClose: 1500,
    position: "bottom-center",
    bodyStyle: {


    }
  });