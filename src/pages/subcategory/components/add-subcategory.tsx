import { CategoryReqTypes } from "@/types/news.type";
import { AddSubCategoryForm } from "./form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchItemsServ,
  patchItemsServ,
  postItemsServ,
} from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/news-store";
import toast from "react-hot-toast";
import { SubCategoryFormData } from "@/types/subcategory.type";
const API = import.meta.env.VITE_API_URL;
export const AddSubCategory = () => {
  const navigate = useNavigate();
  // get Category
  const { formVariant, setFormVariant } = useNewsStore();

  const { data: categoryData } = useQuery<CategoryReqTypes>({
    queryFn: () => fetchItemsServ(`${API}/category`),
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
    mutationFn: (obj: SubCategoryFormData) =>
      postItemsServ(`${API}/subcategory`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/subcategory");
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
    mutationFn: (obj: SubCategoryFormData) =>
      patchItemsServ(`${API}/subcategory/${formVariant.id}`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/subcategory");
        toast.success("Muvoffaqiyatli tahrirlandi");
        setFormVariant({ id: "", role: "create" });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: SubCategoryFormData) {
    if (formVariant.role == "edit") {
      // @ts-ignore
      delete data.category;
      editNews(data);
    } else {
      createNews(data);
    }
  }

  return (
    <div className="p-4">
      <AddSubCategoryForm
        submit={onSubmit}
        selectData={selectCategoryData ?? []}
        loading={loading || editLoading}
      />
    </div>
  );
};
