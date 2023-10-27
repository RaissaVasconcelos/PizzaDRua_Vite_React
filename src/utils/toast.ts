import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notify = (text:string, position: string, timeout?: number) =>
  toast.success(text, {

    autoClose: timeout ? timeout : 1500,
    position: position === 'top' ? 'top-right' : 'bottom-center',
    bodyStyle: {


    }
  });