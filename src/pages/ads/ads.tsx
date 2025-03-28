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
      <>
        Rasm
        <Image />
      </>
    ),
  },
  {
    key: "source",
    title: (
      <>
        Url
        <FolderKanban />
      </>
    ),
  },
  {
    key: "category",
    title: (
      <>
        Kategoriya
        <ChartColumnStacked />
      </>
    ),
  },
  {
    key: "status",
    title: (
      <>
        Status
        <CircleCheck />
      </>
    ),
  },
  {
    key: "actions",
    title: (
      <>
        Buttonlar
        <Power />
      </>
    ),
  },
];

import { useQueryClient } from "@tanstack/react-query";
import { AdsGetData } from "@/types/ads.type";
const API = import.meta.env.VITE_API_URL;
export const Ads = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const { setDeleteAction } = useStore();

  const { data: ads, isPending: isLoading } = useQuery<AdsGetData>({
    queryFn: () => fetchItemsServ(`${API}/ad/admin?type=banner`),
    queryKey: ["fetchAdsData"],
    staleTime: 0,
  });

  console.log({ ads });

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchAdsData"] as any);
  };
  const { setFormVariant, newsVariant, setNewsVariant, formVariant } =
    useNewsStore();
  useEffect(() => {
    handleInvalidate();
  }, [formVariant]);

  const deleteFun = (id: string) => {
    setDeleteAction({
      openModal: true,
      path: `/ad/${id}`,
      refetch: handleInvalidate,
    });
  };
  const editFun = (id: string) => {
    console.log(id);
    setFormVariant({ id, role: "edit" });
    navigate("/ads/add-ads");
  };

  const tableData = ads?.data.map((item) => {
    return {
      image: item.image.path,
      source: item.url,
      category: item.type,
      status: item.is_active ? "Aktiv" : "Aktiv emas",
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
    navigate("/ads/add-ads");
    setFormVariant({ id: "", role: "create" });
  };

  useEffect(() => {
    if (pathname.pathname.endsWith("/ads/add-ads")) {
      setNewsVariant("form");
    } else {
      setNewsVariant("table");
    }
  }, [pathname]);

  const component = {
    table: (
      <div className="bg-muted px-6 py-8 rounded-[10px]">
        <div className="flex justify-between items-center mb-8">
          <span className="flex gap-2 items-center text-xl font-bold ">
            <p>Reklamalar</p>
            <Newspaper />
          </span>
          div
          <Button
            className="px-10 bg-[#3F3F46] text-[13px] cursor-pointer hover:bg-[#3F3F46] hover:opacity-90"
            onClick={addNews}
          >
            <Plus /> Reklama Qo’shish
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
            <div className="flex justify-end"></div>
          </>
        )}
      </div>
    ),

    form: <Outlet />,
  };
  return component[newsVariant];
};
