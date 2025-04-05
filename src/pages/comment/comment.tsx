import CustomTable from "@/components/shared/custom-table";
// import { Pagination } from "@/components/shared/Pagination";
import { fetchItemsServ } from "@/services/items-serv";
import { useStore } from "@/store";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LoaderCircleIcon,
  LucideFileSignature,
  MailIcon,
  MailsIcon,
  Power,
  Trash2,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { CommentRes } from "@/types/comment.type";
const columns = [
  {
    key: "user",
    title: (
      <div className="flex items-center gap-2">
        User
        <User />
      </div>
    ),
  },
  {
    key: "news",
    title: (
      <div className="flex items-center gap-2">
        Yangilik
        <LucideFileSignature />
      </div>
    ),
  },
  {
    key: "comment",
    title: (
      <div className="flex items-center gap-2">
        Izoh
        <MailIcon />
      </div>
    ),
  },

  {
    key: "",
    title: "",
  },
  {
    key: "actions",
    title: (
      <div className="flex items-center gap-2">
        Buttonlar
        <Power />
      </div>
    ),
  },
];
// test comment to push new repo
const API = import.meta.env.VITE_API_URL;
export const Comment = () => {
  // const [count, setCount] = useState(getLocaleStorage("currentPage") ?? 1);
  const { deleteAction, setDeleteAction } = useStore();

  const {
    data: file,
    isPending: isLoading,
    refetch,
  } = useQuery<CommentRes>({
    queryFn: () => fetchItemsServ(`${API}/comment?page=${1}&page_size=10`),
    queryKey: ["fetchComment"],
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchComment"] as any);
  };

  useEffect(() => {
    refetch();
  }, [deleteAction]);

  const deleteFun = (id: string) => {
    setDeleteAction({
      openModal: true,
      path: `/comment/${id}`,
      refetch: handleInvalidate,
    });
  };

  // const onChangePage = (data: number) => {
  //   setCount(data);
  //   setLocaleStorage("currentPage", data);
  // };
  // useEffect(() => {
  //   if (file) {
  //     setCount(file?.current_page ?? 1);
  //   }
  // }, [file]);
  const tableData = file?.data.map((item) => {
    return {
      user: item.user?.email,
      news: item?.news?.title_uz,
      comment: item?.text,
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
          <p>Izohlar va Sharhlar</p>
          <MailsIcon />
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
            {/* <Pagination
              totalPages={file?.total_pages ?? 0}
              onPageChange={(page: number) => onChangePage(page)}
              activePage={file?.current_page ?? Number(count)}
            /> */}
          </div>
        </>
      )}
    </div>
  );
};
