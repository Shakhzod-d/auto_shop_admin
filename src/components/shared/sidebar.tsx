import { sidebarData } from "@/utils/constants";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
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
      <div className=" bg-secondary rounded-[8px] p-5 flex items-center gap-1 relative">
        <span className="w-2 h-2 rounded-full bg-[#4DA6FF] absolute right-0 top-0"></span>
        <div className="w-[29px] h-[29px] rounded-full bg-foreground"></div>
        <div>
          <h3 className="text-[15px] font-medium">Abrolov Ibrohim</h3>
          <p className="text-[10px]">Admin</p>
        </div>
      </div>
    </aside>
  );
};
