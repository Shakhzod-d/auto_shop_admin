import { CategoryReqTypes, NewsFormRes } from "@/types/news.type";
import { AddNewsForm } from "./form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchItemsServ,
  patchItemsServ,
  postItemsServ,
} from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/news-store";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export const AddNews = () => {
  const navigate = useNavigate();
  // get Category
  const { formVariant, setFormVariant } = useNewsStore();

  const { data: categoryData } = useQuery<CategoryReqTypes>({
    queryFn: () => fetchItemsServ(`${API}/subcategory`),
    queryKey: ["fetchCategoryServ"],
    staleTime: 0,
  });

  //  map category data

  const selectCategoryData = categoryData?.data.map((item) => {
    return {
      value: item?.id,
      label: item.name,
    };
  });

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchNewsData"] as any);
  };

  //  create news

  const { mutate: createNews, isPending: loading } = useMutation({
    mutationFn: (obj: NewsFormRes) => postItemsServ(`${API}/news`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/news");
        toast.success("Muvoffaqiyatli qo'shildi");
        handleInvalidate();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // edit news
  const { mutate: editNews, isPending: editLoading } = useMutation({
    mutationFn: (obj: NewsFormRes) =>
      patchItemsServ(`${API}/news/${formVariant.id}`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/news");
        toast.success("Muvoffaqiyatli tahrirlandi");
        setFormVariant({ id: "", role: "create" });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: NewsFormRes) {
    if (formVariant.role == "edit") {
      editNews(data);
    } else {
      createNews(data);
    }
  }

  return (
    <div className="p-4">
      <AddNewsForm
        submit={onSubmit}
        selectData={selectCategoryData ?? []}
        loading={loading || editLoading}
      />
    </div>
  );
};
