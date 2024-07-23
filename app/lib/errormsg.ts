import { toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { errorMessages } from './errorMessages';



export const toastError = (msg: string) => {
  const errorMsgDecoded = errorMessages[msg] || 'Error Indeterminado';
  toast.error(errorMsgDecoded, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  });
};
