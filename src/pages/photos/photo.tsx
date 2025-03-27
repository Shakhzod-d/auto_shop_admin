import CustomTable from "@/components/shared/custom-table";
import { Pagination } from "@/components/shared/Pagination";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { FileRes } from "@/types";
import { getLocaleStorage, setLocaleStorage } from "@/utils/locale-storage";
import { useQuery } from "@tanstack/react-query";
import {
  CircleCheck,
  Image,
  LoaderCircleIcon,
  Power,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
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
    key: "",
    title: "",
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
    key: "",
    title: "",
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

const API = import.meta.env.VITE_API_URL;
export const Photo = () => {
  const [count, setCount] = useState(getLocaleStorage("currentPage") ?? 1);
  const { deleteAction, setDeleteAction } = useStore();

  const {
    data: file,
    isPending: isLoading,
    refetch,
  } = useQuery<FileRes>({
    queryFn: () => fetchItemsServ(`${API}/file?page=${count}&page_size=10`),
    queryKey: ["fetchPhoto", count],
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [deleteAction]);

  const deleteFun = (id: string) => {
    setDeleteAction({ openModal: true, path: `/file/${id}` });
  };

  const onChangePage = (data: number) => {
    setCount(data);
    setLocaleStorage("currentPage", data);
  };
  useEffect(() => {
    if (file) {
      setCount(file?.current_page ?? 1);
    }
  }, [file]);
  const tableData = file?.data.map((item) => {
    return {
      image: item.path,
      status: item.is_active ? "Aktiv" : "Aktiv emas",
      actions: (
        <span className="flex items-center gap-2 cursor-pointer">
          {" "}
          <Trash2 onClick={() => deleteFun(item.id)} />
        </span>
      ),
    };
  });

  return (
    <div className="bg-muted px-6 py-8 rounded-[10px]">
      <div className="flex justify-between items-center mb-8">
        <span className="flex gap-2 items-center text-xl font-bold">
          <p>Rasmlar</p>
          <Image />
        </span>
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
              totalPages={file?.total_pages ?? 0}
              onPageChange={(page: number) => onChangePage(page)}
              activePage={file?.current_page ?? Number(count)}
            />
          </div>
        </>
      )}
    </div>
  );
};
