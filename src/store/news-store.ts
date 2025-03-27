import { FormType, FormVariant, newsVariant } from "@/types/news.type";
import { create } from "zustand";

type Store = {
  newsVariant: newsVariant;
  formType: FormType;
  setNewsVariant: (data: newsVariant) => void;
  setFormType: (data: FormType) => void;
  formVariant: FormVariant;
  setFormVariant: (data: FormVariant) => void;
};
export const useNewsStore = create<Store>()((set) => ({
  formVariant: {
    id: "",
    role: "create",
  },
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
  setFormVariant: (data: FormVariant) => {
    set(() => ({ formVariant: data }));
  },
}));
