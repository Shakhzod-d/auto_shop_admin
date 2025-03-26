import { FormType, newsVariant } from "@/types/news.type";
import { create } from "zustand";

type Store = {
  newsVariant: newsVariant;
  formType: FormType;
  setNewsVariant: (data: newsVariant) => void;
  setFormType: (data: FormType) => void;
};
export const useNewsStore = create<Store>()((set) => ({
  newsVariant: "table",
  formType: "news",
  setNewsVariant: (data: newsVariant) => {
    set(() => ({
      newsVariant: data,
    }));
  },
  setFormType: (data: FormType) => {
    set(() => ({ formType: data }));
  },
}));
