import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchItemsServ, postItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/news-store";
import toast from "react-hot-toast";
import { AddCategoryForm, SubmitData } from "./form";
import { useState } from "react";
import {
  CategoryObj,
  CreateSubCategory,
  SubCategoryData,
} from "@/types/category";
const API = import.meta.env.VITE_API_URL;
export const AddCategory = () => {
  const navigate = useNavigate();
  const [formObj, setFormObj] = useState<SubmitData | any>([]);

  // get Category
  const { formVariant, setFormVariant } = useNewsStore();

  //  map category data

  const queryClient = useQueryClient();

  const handleInvalidate = () => {
    queryClient.invalidateQueries(["fetchNewsData"] as any);
  };
  const createSubCategoryFun = (data: CreateSubCategory) => {
    const filterData = {
      name_uz: data.category_name_uz,
      name_ru: data.category_name_ru,
      name_en: data.category_name_en,
      title_uz: data.desc_uz,
      title_ru: data.desc_ru,
      title_en: data.desc_en,
      category: {
        id: data.categoryId,
      },
      banner: {
        id: data.image.id,
      },
    };
    createSubCategory(filterData);
    console.log({ filterData, data });
  };
  //  subCategory Create
  const { mutate: createSubCategory, isPending: SubCategoryLoading } =
    useMutation({
      mutationFn: (obj: SubCategoryData) =>
        postItemsServ(`${API}/subcategory`, obj),
      onSuccess: (data: any) => {
        if (data.status_code < 400) {
          navigate("/category");
          toast.success("Muvoffaqiyatli qo'shildi");
          handleInvalidate();
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });

  //  create news

  const { mutate: createNews, isPending: loading } = useMutation({
    mutationFn: (obj: CategoryObj) => postItemsServ(`${API}/category`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        console.log({ data });

        createSubCategoryFun({ ...formObj, categoryId: data.data.id });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // edit news
  const { mutate: editNews, isPending: editLoading } = useMutation({
    mutationFn: (obj: CategoryObj) =>
      patchItemsServ(`${API}/category/${formVariant.id}`, obj),
    onSuccess: (data: any) => {
      if (data.status_code < 400) {
        navigate("/category");
        toast.success("Muvoffaqiyatli tahrirlandi");
        setFormVariant({ id: "", role: "create" });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(data: SubmitData) {
    setFormObj(data);
    const categoryData = {
      name_uz: data.category_name_uz,
      name_en: data.category_name_en,
      name_ru: data.category_name_ru,
    };
    if (formVariant.role == "edit") {
      editNews(categoryData);
    } else {
      createNews(categoryData);
    }
  }

  return (
    <div className="p-4">
      <AddCategoryForm
        submit={onSubmit}
        loading={loading || editLoading || SubCategoryLoading}
      />
    </div>
  );
};
