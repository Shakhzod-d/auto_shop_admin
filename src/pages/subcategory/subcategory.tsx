import CustomTable from "@/components/shared/custom-table";

import { Button } from "@/components/ui/button";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { useNewsStore } from "@/store/news-store";

import { useQuery } from "@tanstack/react-query";
import {
  ChartColumnStacked,
  CircleCheck,
  FolderKanban,
  Image,
  LoaderCircleIcon,
  Newspaper,
  Pen,
  Plus,
  Power,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const columns = [
  {
    key: "image",
    title: (
      <div className="flex items-center gap-2">
        Banner
        <Image size={20} />
      </div>
    ),
  },
  {
    key: "name",
    title: (
      <div className="flex items-center gap-2">
        Ism
        <FolderKanban size={20} />
      </div>
    ),
  },
  {
    key: "category",
    title: (
      <div className="flex items-center gap-2">
        Kategoriya
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
import { GetSubCategory } from "@/types/subcategory.type";
const API = import.meta.env.VITE_API_URL;
export const SubCategory = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { setDeleteAction } = useStore();

  const { data: subcategory, isPending: isLoading } = useQuery<GetSubCategory>({
    queryFn: () => fetchItemsServ(`${API}/subcategory`),
    queryKey: ["fetchSubCategoryData"],
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
      path: `/subcategory/${id}`,
      refetch: handleInvalidate,
    });
  };
  const editFun = (id: string) => {
    setFormVariant({ id, role: "edit" });
    navigate("/subcategory/add-subcategory");
  };

  const tableData = subcategory?.data.map((item) => {
    return {
      image: item.banner.path,
      name: item.title,
      category: item.name,
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
    navigate("/news/add-subcategory");
    setFormVariant({ id: "", role: "create" });
  };

  useEffect(() => {
    if (pathname.pathname.endsWith("/add-subcategory")) {
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
            <p className="font-poly">Sub Kategoriya</p>
            <Newspaper />
          </span>
          <Button
            className="px-10 bg-[#3f3f46] text-[13px]  text-white cursor-pointer hover:bg-[#3F3F46] hover:opacity-90 hover:text-white"
            onClick={addNews}
          >
            <Plus /> Qo’shish
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
              isPhoto={true}
            />
          </>
        )}
      </div>
    ),

    form: <Outlet />,
  };
  return component[newsVariant];
};
