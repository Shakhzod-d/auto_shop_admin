import CustomTable from "@/components/shared/custom-table";
import { Pagination } from "@/components/shared/Pagination";
import { fetchItemsServ } from "@/services/items-serv";

import { UsersRes } from "@/types/users.type";
import { getLocaleStorage, setLocaleStorage } from "@/utils/locale-storage";
import { useQuery } from "@tanstack/react-query";
import {
  CircleCheck,
  Image,
  LoaderCircleIcon,
  MailIcon,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
const columns = [
  {
    key: "email",
    title: (
      <>
        Email
        <MailIcon />
      </>
    ),
  },
  {
    key: "",
    title: "",
  },
  {
    key: "role",
    title: (
      <>
        Rol
        <User />
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
];

const API = import.meta.env.VITE_API_URL;
export const Users = () => {
  const [count, setCount] = useState(getLocaleStorage("currentPage") ?? 1);

  const { data: file, isPending: isLoading } = useQuery<UsersRes>({
    queryFn: () => fetchItemsServ(`${API}/user?page=${count}&page_size=10`),
    queryKey: ["fetchUsers", count],
    staleTime: 0,
  });

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
      email: item.email,
      role: item.role,
      status: item.is_active ? "Aktiv" : "Aktiv emas",
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
            isPhoto={false}
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
