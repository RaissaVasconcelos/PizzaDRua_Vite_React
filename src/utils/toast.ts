import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notify = (text:string) =>
  toast.success(text, {

    autoClose: 1500,
    position: "bottom-center",
    bodyStyle: {


    }
  });