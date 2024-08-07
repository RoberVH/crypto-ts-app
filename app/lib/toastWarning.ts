



import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

export const toastWarning = (msg:string) => {
    toast.warning(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        });
}