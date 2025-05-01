import CustomTable from "@/components/shared/custom-table";
import { Button } from "@/components/ui/button";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { useNewsStore } from "@/store/news-store";
import { useQuery } from "@tanstack/react-query";
import {
  ChartBarStacked,
  ChartColumnStacked,
  CircleCheck,
    LoaderCircleIcon,
  Pen,
  Plus,
  Power,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const columns = [
  {
    key: "name",
    title: <div className="flex items-center gap-2">Name</div>,
  },
  {
    key: "source",
    title: <div className="flex items-center gap-2"></div>,
  },
  {
    key: "category",
    title: (
      <div className="flex items-center gap-2">
        Subcategory
        <ChartColumnStacked size={20} />
      </div>
    ),
  },
  {
    key: "status",
    title: (
      <div className="flex items-center gap-2">
        Status
        <CircleCheck size={20} />
      </div>
    ),
  },
  {
    key: "actions",
    title: (
      <div className="flex items-center gap-2">
        Buttonlar
        <Power size={20} />
      </div>
    ),
  },
];

import { useQueryClient } from "@tanstack/react-query";
import { CategoryRes } from "@/types";
const API = import.meta.env.VITE_API_URL;
export const Category = () => {
  useEffect(() => {
    return () => {
      localStorage.removeItem("currentPage");
    };
  }, []);

  const navigate = useNavigate();
  const pathname = useLocation();
  const { setDeleteAction } = useStore();

  const { data: news, isPending: isLoading } = useQuery<CategoryRes>({
    queryFn: () => fetchItemsServ(`${API}/category`),
    queryKey: ["category"],
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchNewsData"] as any);
  };
  const { setFormVariant, newsVariant, setNewsVariant, formVariant } =
    useNewsStore();
  useEffect(() => {
    handleInvalidate();
  }, [formVariant]);

  const deleteFun = (id: string) => {
    setDeleteAction({
      openModal: true,
      path: `/category/${id}`,
      refetch: handleInvalidate,
    });
  };
  const editFun = (id: string) => {
    setFormVariant({ id, role: "edit" });
    navigate("/category/add-category");
  };

  const tableData = news?.data.map((item) => {
    return {
      name: item.name,
      category: item.subcategories.length,
      status: item.is_active ? "Aktiv" : "Aktiv emas",
      actions: (
        <span className="flex items-center gap-4 cursor-pointer">
          {" "}
          <Trash2 onClick={() => deleteFun(item.id)} size={20} />
          <Pen onClick={() => editFun(item.id)} size={20} />
        </span>
      ),
    };
  });

  const addNews = () => {
    navigate("/category/add-category");
    setFormVariant({ id: "", role: "create" });
  };

  useEffect(() => {
    if (pathname.pathname.endsWith("/add-category")) {
      setNewsVariant("form");
    } else {
      setNewsVariant("table");
    }
  }, [pathname]);

  const component = {
    table: (
      <div className="bg-muted px-6 py-8 rounded-[10px]">
        <div className="flex justify-between items-center mb-8">
          <span className="flex gap-2 items-center text-xl font-bold text-[var(--text)]">
            <p className="font-poly">Kategoriya</p>
            <ChartBarStacked />
          </span>
          <Button
            className="px-10 bg-[#3f3f46] text-[13px]  text-white cursor-pointer hover:bg-[#3F3F46] hover:opacity-90 hover:text-white"
            onClick={addNews}
          >
            <Plus />
            kategoriya Qo'shish
          </Button>
        </div>
        {isLoading ? (
          <div className="h-[70vh]  flex justify-center items-center">
            <LoaderCircleIcon className="animate-spin" size={60} />
          </div>
        ) : (
          <>
            <CustomTable
              columns={columns}
              data={tableData ?? []}
              isPhoto={false}
            />
          </>
        )}
      </div>
    ),

    form: <Outlet />,
  };
  return component[newsVariant];
};
