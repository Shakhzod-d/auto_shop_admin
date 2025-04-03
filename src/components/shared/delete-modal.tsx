import { useStore } from "@/store";
import { Button } from "../ui/button";
import axios from "axios";
import { getLocaleStorage } from "@/utils/locale-storage";
import toast from "react-hot-toast";
export const DeleteModal = () => {
  const API = import.meta.env.VITE_API_URL;
  const { deleteAction, setDeleteAction } = useStore();
  const token = getLocaleStorage("token");
  const deleteItem = async () => {
    try {
      const res = axios.delete(API + deleteAction.path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteAction({ openModal: false, path: "" });
      if ((await res).status < 400) {
        toast.success("Muvoffaqiyatli o'chirildi");
        deleteAction.refetch?.();
      } else {
        toast.error("xatolik yuz berdi");
      }
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className="w-full h-screen fixed z-10 bg-[#00000092] flex justify-center items-center">
      <div className="w-96  bg-secondary rounded-2xl p-5">
        <p className="text-[20px] font-bold mb-10">
          Rostanham o'chirmoqchimisz
        </p>
        <div className="flex items-center gap-4 justify-end">
          <Button
            className="cursor-pointer text-[var(--form-text)]"
            onClick={() => setDeleteAction({ openModal: false, path: "" })}
          >
            yo'q
          </Button>
          <Button
            className="bg-red-500 cursor-pointer hover:bg-red-400 text-white"
            onClick={deleteItem}
          >
            ha
          </Button>
        </div>
      </div>
    </div>
  );
};
