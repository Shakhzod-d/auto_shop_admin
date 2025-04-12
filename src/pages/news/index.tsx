import CustomTable from "@/components/shared/custom-table";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { useNewsStore } from "@/store/news-store";
import { NewsResType } from "@/types/news.type";
import { getLocaleStorage, setLocaleStorage } from "@/utils/locale-storage";
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
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const columns = [
  {
    key: "image",
    title: (
      <div className="flex items-center gap-2">
        Rasm
        <Image size={20} />
      </div>
    ),
  },
  {
    key: "source",
    title: (
      <div className="flex items-center gap-2">
        Manba
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
const API = import.meta.env.VITE_API_URL;
export const News = () => {
  useEffect(() => {
    return () => {
      localStorage.removeItem("currentPage");
    };
  }, []);

  const navigate = useNavigate();
  const pathname = useLocation();
  const [count, setCount] = useState(getLocaleStorage("currentPage") ?? 1);
  const { setDeleteAction } = useStore();

  const { data: news, isPending: isLoading } = useQuery<NewsResType>({
    queryFn: () => fetchItemsServ(`${API}/news?page=${count}&page_size=10`),
    queryKey: ["fetchNewsData", count],
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
      path: `/news/${id}`,
      refetch: handleInvalidate,
    });
  };
  const editFun = (id: string) => {
    setFormVariant({ id, role: "edit" });
    navigate("/news/add-news");
  };

  const onChangePage = (data: number) => {
    setCount(data);
    setLocaleStorage("currentPage", data);
  };

  useEffect(() => {
    if (news) {
      setCount(news?.current_page ?? 1);
    }
  }, [news]);

  const tableData = news?.data.map((item) => {
    return {
      image: item.main_image?.path,
      source: item.source,
      category: item.subcategory?.name,
      status: "Aktiv",
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
    navigate("/news/add-news");
    setFormVariant({ id: "", role: "create" });
  };

  useEffect(() => {
    if (pathname.pathname.endsWith("/add-news")) {
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
            <p className="font-poly">Yangiliklar</p>
            <Newspaper />
          </span>
          <Button
            className="px-10 bg-[#3f3f46] text-[13px]  text-white cursor-pointer hover:bg-[#3F3F46] hover:opacity-90 hover:text-white"
            onClick={addNews}
          >
            <Plus /> Yangilik Qo’shish
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
            <div className="flex justify-end">
              <Pagination
                totalPages={news?.total_pages ?? 0}
                onPageChange={(page: number) => onChangePage(page)}
                activePage={news?.current_page ?? Number(count)}
              />
            </div>
          </>
        )}
      </div>
    ),

    form: <Outlet />,
  };
  return component[newsVariant];
};
