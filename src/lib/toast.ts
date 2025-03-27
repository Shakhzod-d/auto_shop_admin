import { Bounce, toast } from "react-toastify";

const toastObj: any = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const errorToast = (msg: string) => {
  toast.error(msg, toastObj);
};

export const successToast = (msg: string) => {
  toast.success(msg, toastObj);
};
