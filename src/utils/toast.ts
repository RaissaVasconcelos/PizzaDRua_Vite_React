import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notify = (text:string, position: string) =>
  toast.success(text, {

    autoClose: 1500,
    position: position === 'top' ? 'top-right' : 'bottom-center',
    bodyStyle: {


    }
  });