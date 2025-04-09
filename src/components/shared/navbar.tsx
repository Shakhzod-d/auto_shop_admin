import { postItemsServ } from "@/services/items-serv";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "@/theme-provider";
import { calendarFun } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { LogOut, MoonIcon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { setTheme, theme } = useTheme();

  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setAuthLoader } = useAuthStore();

  const calendar = calendarFun();

  const { mutate: logout, isPending: loading } = useMutation({
    mutationFn: () => postItemsServ(`${API}/admin/logout`, {}),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/login");
        localStorage.clear();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    setAuthLoader(loading);
  }, [loading]);
  const logoutFun = async () => {
    logout();
    setAuthLoader(loading);
  };
  return (
    <header className=" bg-primary w-full flex justify-between px-8 py-[25px]">
      <p className="text-[14px]">{calendar}</p>
      <div className="flex items-center gap-4">
        {theme == "light" ? (
          <MoonIcon
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
        )}
        <LogOut className="cursor-pointer " onClick={logoutFun} />
      </div>
    </header>
  );
};
