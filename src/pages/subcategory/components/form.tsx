import { CustomSelect } from "@/components/shared/custom-select";
import { LangueInput } from "@/components/shared/langue-input";
import { UploadButton } from "@/components/shared/upload-btn";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AddSubCategorySchema } from "@/lib/validation";
import { SelectData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlusIcon from "@/assets/icons/plus.svg";
import { useQuery } from "@tanstack/react-query";
import { useNewsStore } from "@/store/news-store";
import { fetchItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import {
  SubCategoryForm,
  SubCategoryFormData,
  SubCategoryOneRes,
} from "@/types/subcategory.type";

interface Props {
  submit: (data: SubCategoryFormData) => void;
  selectData: SelectData[] | [];
  loading: boolean;
}
const API = import.meta.env.VITE_API_URL;
export const AddSubCategoryForm = ({ submit, selectData, loading }: Props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState({ id: "", path: "" });
  const { formVariant } = useNewsStore();

  const [imgError, setImgError] = useState(false);

  const { data: subcategory } = useQuery<SubCategoryOneRes>({
    queryFn: () => fetchItemsServ(`${API}/subcategory/admin/${formVariant.id}`),
    queryKey: ["newsOne"],
    enabled: formVariant.role === "edit", // Faqat "edit" rejimida so‘rov yuboriladi
    staleTime: 0,
  });

  const form = useForm({
    resolver: zodResolver(AddSubCategorySchema),
    defaultValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      name_en: "",
      name_ru: "",
      name_uz: "",
      categoryId: "",
    },
  });

  const { reset, watch } = form;

  useEffect(() => {
    if (formVariant.role == "edit") {
      reset({
        categoryId: "sasas",
        name_en: subcategory?.data.name_en,
        name_ru: subcategory?.data.name_ru,
        name_uz: subcategory?.data.name_uz,
        title_en: subcategory?.data.title_en,
        title_uz: subcategory?.data.title_uz,
        title_ru: subcategory?.data.title_ru,
      });
      setImage({
        id: "",
        path: subcategory?.data.banner.path ?? "",
      });
    }
  }, [subcategory]);

  function onSubmit(data: SubCategoryForm) {
    if (image.id == "" && formVariant.role !== "edit") {
      return setImgError(true);
    }
    const result: SubCategoryFormData = {
      name_uz: data.name_uz,
      name_ru: data.name_ru,
      name_en: data.name_en,
      title_uz: data.title_uz,
      title_ru: data.title_ru,
      title_en: data.title_en,
      category: {
        id: data.categoryId,
      },
      banner: {
        id: image.id,
      },
    };

    submit(result);
  }

  const clearForm = () => {
    reset(); // Formani tozalaydi

    setImage({ id: "", path: "" });
  };
  const cancelBtn = () => {
    reset();
    clearForm();
    navigate("/news");
  };

  return (
    <div className="bg-muted w-full p-8 rounded-[10px]">
      <div className="flex justify-between items-center mb-10">
        <span className="flex items-center gap-2">
          <p className="text-xl text-[var(--form-text)] font-bold font-poly">
            {"Yangilik Qo’shish"}
          </p>
          <PlusIcon />
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex gap-10 items-start">
            <LangueInput
              activeLang={"uz"}
              label="Category name Uz"
              name="name"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"en"}
              label="Category name En"
              name="name"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"ru"}
              label="Category name Ru"
              name="name"
              form={form}
              type="input"
            />
            {formVariant.role === "create" && (
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <label className="text-sm text-[var(--form-text)]">
                      Kategoriya
                    </label>
                    <FormControl>
                      <CustomSelect
                        value={watch("categoryId") ?? ""}
                        onChange={field.onChange}
                        data={selectData}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex gap-10 items-start">
            <LangueInput
              activeLang={"uz"}
              label="Banner text Uz"
              name="title"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"en"}
              label="Banner text  En"
              name="title"
              form={form}
              type="input"
            />
            <LangueInput
              activeLang={"ru"}
              label="Banner text Ru"
              name="title"
              form={form}
              type="input"
            />
          </div>

          <UploadButton
            setImageFun={setImage}
            defaultImage={image.path}
            isError={imgError}
          />
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
