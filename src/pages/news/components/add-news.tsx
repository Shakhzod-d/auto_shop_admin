import { CategoryReqTypes, NewsFormRes } from "@/types/news.type";
import { AddNewsForm } from "./form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchItemsServ, postItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
export const AddNews = () => {
  const navigate = useNavigate();
  // get Category

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

  //  create news

  const { mutate: createNews, isPending: loading } = useMutation({
    mutationFn: (obj: NewsFormRes) => postItemsServ(`${API}/news`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/news");
      }
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: NewsFormRes) {
    createNews(data);
  }

  return (
    <div className="p-4">
      <AddNewsForm
        submit={onSubmit}
        selectData={selectCategoryData ?? []}
        loading={loading}
      />
    </div>
  );
};
