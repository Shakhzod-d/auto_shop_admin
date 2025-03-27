import { DeleteActionType } from "@/types";
import { create } from "zustand";

type Store = {
  deleteAction: DeleteActionType;
  setDeleteAction: (data: DeleteActionType) => void;
};
export const useStore = create<Store>()((set) => ({
  deleteAction: {
    openModal: false,
    path: "",
  },
  setDeleteAction: (data: DeleteActionType) => {
    set(() => ({
      deleteAction: data,
    }));
  },
}));
