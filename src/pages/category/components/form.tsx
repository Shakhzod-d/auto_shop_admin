import { LangueInput } from "@/components/shared/langue-input";
import { UploadButton } from "@/components/shared/upload-btn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addCategorySchema } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlusIcon from "@/assets/icons/plus.svg";
import { useQuery } from "@tanstack/react-query";
import { useNewsStore } from "@/store/news-store";
import { fetchItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";

import { CategoryData, CategoryOne } from "@/types/category";

export interface SubmitData extends CategoryData {
  image: {
    id: string;
    path: string;
  };
}

interface Props {
  submit: (data: SubmitData) => void;
  loading: boolean;
}
const API = import.meta.env.VITE_API_URL;
export const AddCategoryForm = ({ submit, loading }: Props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState({ id: "", path: "" });
  const { formVariant } = useNewsStore();

  const [imgError, setImgError] = useState(false);

  const { data: categoryData } = useQuery<CategoryOne>({
    queryFn: () => fetchItemsServ(`${API}/category/admin/${formVariant.id}`),
    queryKey: ["newsOne"],
    enabled: formVariant.role === "edit", // Faqat "edit" rejimida so‘rov yuboriladi
    staleTime: 0,
  });

  const form = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      category_name_en: "",
      category_name_uz: "",
      category_name_ru: "",
      desc_en: "",
      desc_uz: "",
      desc_ru: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (formVariant.role == "edit") {
      reset({
        category_name_en: categoryData?.data.name_en,
        category_name_ru: categoryData?.data.name_ru,
        category_name_uz: categoryData?.data.name_uz,
        desc_en: "edit",
        desc_ru: "edit",
        desc_uz: "edit",
        title_en: "edit",
        title_ru: "edit",
        title_uz: "edit",
      });
    }
  }, [categoryData]);

  function onSubmit(data: CategoryData) {
    if (image.id == "" && formVariant.role !== "edit") {
      return setImgError(true);
    }
    submit({ ...data, image });
  }

  const clearForm = () => {
    reset(); // Formani tozalaydi

    setImage({ id: "", path: "" });
  };
  const cancelBtn = () => {
    reset();
    clearForm();
    navigate("/category");
  };

  return (
    <div className="bg-muted w-full p-8 rounded-[10px]">
      <div className="flex justify-between items-center mb-10">
        <span className="flex items-center gap-2">
          <p className="text-xl text-[var(--form-text)] font-bold font-poly">
            {"Kategoriya Qo’shish"}
          </p>
          <PlusIcon />
        </span>
        <div className="flex gap-4"></div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex gap-10 items-start">
            <LangueInput
              activeLang={"uz"}
              label="Category Uz"
              name="category_name"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"en"}
              label="Category En"
              name="category_name"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"ru"}
              label="Category Ru"
              name="category_name"
              form={form}
              type="input"
            />
            {/* <LangueInput
              activeLang={activeLang}
              label="SubCategory name"
              name="title"
              form={form}
              type="input"
            /> */}
          </div>
          {formVariant.role == "create" && (
            <>
              <div className="flex gap-10 items-start">
                <LangueInput
                  activeLang={"uz"}
                  label="SubCategory Uz"
                  name="title"
                  form={form}
                  type="input"
                />

                <LangueInput
                  activeLang={"en"}
                  label="SubCategory En"
                  name="title"
                  form={form}
                  type="input"
                />
                <LangueInput
                  activeLang={"ru"}
                  label="SubCategory Ru"
                  name="title"
                  form={form}
                  type="input"
                />
              </div>

              <div className="flex gap-10 items-start">
                <LangueInput
                  activeLang={"uz"}
                  label="Banner text Uz"
                  name="desc"
                  form={form}
                  type="input"
                />

                <LangueInput
                  activeLang={"en"}
                  label="Banner text en"
                  name="desc"
                  form={form}
                  type="input"
                />
                <LangueInput
                  activeLang={"ru"}
                  label="Banner text  Ru"
                  name="desc"
                  form={form}
                  type="input"
                />
              </div>
            </>
          )}
          {formVariant.role == "create" && (
            <UploadButton
              setImageFun={setImage}
              defaultImage={image.path}
              isError={imgError}
              title="Banner"
            />
          )}

          <div className="flex gap-10 mt-5">
            <Button
              type="submit"
              disabled={loading}
              className="w-[200px] h-[50px] bg-[#4DA6FF] hover:opacity-90 p-4 font-semibold flex items-center gap-4 text-white hover:bg-blue-400 cursor-pointer"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Qo'shish
            </Button>
            <Button
              type="reset"
              onClick={cancelBtn}
              className="w-[200px] h-[50px] bg-red-500 hover:opacity-90 p-4 font-semibold text-white hover:bg-red-400 cursor-pointer"
            >
              Orqaga
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
