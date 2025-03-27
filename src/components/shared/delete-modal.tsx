import { useStore } from "@/store";
import { Button } from "../ui/button";
import axios from "axios";
import { getLocaleStorage } from "@/utils/locale-storage";
export const DeleteModal = () => {
  const API = import.meta.env.VITE_API_URL;
  const { deleteAction, setDeleteAction } = useStore();
  const token = getLocaleStorage("token");
  const deleteItem = async () => {
    try {
      axios.delete(API + deleteAction.path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteAction({ openModal: false, path: "" });
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
            className="cursor-pointer"
            onClick={() => setDeleteAction({ openModal: false, path: "" })}
          >
            yo'q
          </Button>
          <Button
            className="bg-red-500 cursor-pointer hover:bg-red-400"
            onClick={deleteItem}
          >
            ha
          </Button>
        </div>
      </div>
    </div>
  );
};
