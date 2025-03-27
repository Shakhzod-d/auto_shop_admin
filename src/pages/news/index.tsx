import CustomTable from "@/components/shared/custom-table";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { useNewsStore } from "@/store/news-store";
import { NewsResType } from "@/types/news.type";
import { getLocaleStorage, setLocaleStorage } from "@/utils/locale-storage";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, Pen, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const columns = [
  { key: "image", title: "Rasm" },
  { key: "source", title: "Manba" },
  { key: "category", title: "Kategoriya" },
  { key: "status", title: "Status" },
  { key: "actions", title: "Buttonlar" },
];

const API = import.meta.env.VITE_API_URL;
export const News = () => {
  const navigate = useNavigate();

  const pathname = useLocation();
  const [count, setCount] = useState(getLocaleStorage("currentPage") ?? 1);
  const { deleteAction, setDeleteAction } = useStore();
  const {
    data: news,
    isPending: newsBarLoading,
    refetch,
  } = useQuery<NewsResType>({
    queryFn: () => fetchItemsServ(`${API}/news?page=${count}&page_size=10`),
    queryKey: ["fetchItemsServAll", count],
    staleTime: 0,
  });

  useEffect(() => {
    if (deleteAction.openModal == false && deleteAction.path == "") {
      refetch();
    }
  }, [deleteAction]);

  const { setFormVariant, newsVariant, setNewsVariant } = useNewsStore();

  const deleteFun = (id: string) => {
    setDeleteAction({ openModal: true, path: `/news/${id}` });
  };
  const editFun = (id: string) => {
    console.log(id);
    alert("soon :)");
    // setFormVariant({ id, role: "edit" });
    // navigate("/news/add-news");
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
        <span className="flex items-center gap-2 cursor-pointer">
          {" "}
          <Trash2 onClick={() => deleteFun(item.id)} />
          <Pen onClick={() => editFun(item.id)} />
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
          <span className="flex gap-2 items-center text-xl font-bold">
            <p>Yangiliklar</p>
            <Newspaper />
          </span>
          <Button
            className="px-10 bg-[#3F3F46] text-[13px] cursor-pointer hover:bg-[#3F3F46] hover:opacity-90"
            onClick={addNews}
          >
            <Plus /> Yangilik Qo’shish
          </Button>
        </div>
        <CustomTable columns={columns} data={tableData ?? []} />
        <div className="flex justify-end">
          <Pagination
            totalPages={news?.total_pages ?? 0}
            onPageChange={(page: number) => onChangePage(page)}
            activePage={news?.current_page ?? Number(count)}
          />
        </div>
      </div>
    ),
    form: <Outlet />,
  };
  return component[newsVariant];
};
