import { useAuthStore } from "@/store/auth-store";
import { sidebarData } from "@/utils/constants";
import { getLocaleStorage, removeLocaleStorage } from "@/utils/locale-storage";
import { LogOut, } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const API = import.meta.env.VITE_API_URL;
  const [isProfile, setIsProfile] = useState(false);
  const token = getLocaleStorage("token");
  const navigate = useNavigate();
  const { setAuthLoader } = useAuthStore();
  const logoutFun = async () => {
    try {
      setAuthLoader(true);
      await fetch(API + "/admin/logout", {
        method: "POST", // ✅ POST so‘rov
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), // 🔹 Agar API hech qanday body talab qilmasa, shunchaki bo‘sh obyekt yuborish mumkin
      });

      removeLocaleStorage("token");
      navigate("/login");
    } catch (err: any) {
      console.error("Logout error:", err);
      throw new Error(err);
    } finally {
      setAuthLoader(false);
    }
  };

  return (
    <aside className="w-[310px] border-r h-screen bg-primary p-4 flex flex-col">
      <h1 className="text-center font-bold text-[27px] italic mb-12">
        // AutoShop
      </h1>
      <div className="flex-1">
        {sidebarData.map((item) => {
          return (
            <NavLink
              to={item.path}
              key={item.id}
              className="flex items-center gap-2 font-medium cursor-pointer hover:text-[#E0E0E0] transition-all  rounded-md mb-[25px] text-[14px]"
            >
              <item.icon className="size-[20px] " />
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div
        className={`bg-secondary rounded-[8px] p-5 relative transition-all ease-out duration-75 flex flex-col gap-4  ${
          isProfile ? "max-h-[200px]" : "max-h-[100px]"
        }`}
      >
        <div
          className="flex items-center gap-1   cursor-pointer"
          onClick={() => setIsProfile((c) => !c)}
        >
          <span className="w-2 h-2 rounded-full bg-[#4DA6FF] absolute right-0 top-0"></span>
          <div className="w-[29px] h-[29px] rounded-full bg-foreground"></div>
          <div>
            <h3 className="text-[15px] font-medium">Abrolov Ibrohim</h3>
            <p className="text-[10px]">Admin</p>
          </div>
        </div>
        {isProfile && (
          <div>
            <div
              className="flex gap-2 items-center border-t py-4 cursor-pointer  transition-all  hover:text-white"
              onClick={logoutFun}
            >
              <LogOut size={18} />
              <p className="text-[15px] font-medium">Logout</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
