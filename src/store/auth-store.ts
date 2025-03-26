import { AuthType } from "@/types";
import { UserData } from "@/types/auth.type";
import { create } from "zustand";

type Store = {
  authType: AuthType;
  userData: UserData | null;
  authLoader: boolean;
  setAuthType: (data: AuthType) => void;
  setUserData: (data: UserData) => void;
  setAuthLoader: (data: boolean) => void;
};
export const useAuthStore = create<Store>()((set) => ({
  authType: "form",
  authLoader: false,
  userData: null,

  setAuthType: (data) => {
    set(() => ({ authType: data }));
  },
  setUserData: (data) => {
    set(() => ({ userData: data }));
  },
  setAuthLoader: (data) => {
    set(() => ({ authLoader: data }));
  },
}));
