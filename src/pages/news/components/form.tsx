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
import { Input } from "@/components/ui/input";
import { NewsFormSchema } from "@/lib/validation";
import { SelectData } from "@/types";
import { NewsForm, NewsFormRes, NewsOneRes } from "@/types/news.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlusIcon from "@/assets/icons/plus.svg";
import { useQuery } from "@tanstack/react-query";
import { useNewsStore } from "@/store/news-store";
import { fetchItemsServ } from "@/services/items-serv";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const langBtn = [
  { id: 1, value: "uz", label: "Uzbek" },
  { id: 2, value: "en", label: "English" },
  { id: 3, value: "ru", label: "Русский" },
];
interface Props {
  submit: (data: NewsFormRes) => void;
  selectData: SelectData[] | [];
  loading: boolean;
}
const API = import.meta.env.VITE_API_URL;
export const AddNewsForm = ({ submit, selectData, loading }: Props) => {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("uz");
  const [image, setImage] = useState({ id: "", path: "" });
  const { formVariant } = useNewsStore();

  const [imgError, setImgError] = useState(false);

  const { data: newsData } = useQuery<NewsOneRes>({
    queryFn: () => fetchItemsServ(`${API}/news/admin/${formVariant.id}`),
    queryKey: ["newsOne"],
    enabled: formVariant.role === "edit", // Faqat "edit" rejimida so‘rov yuboriladi
    staleTime: 0,
  });

  const form = useForm({
    resolver: zodResolver(NewsFormSchema),
    defaultValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      content_en: "",
      content_ru: "",
      content_uz: "",
      categoryId: "",
      source: "",
    },
  });

  const {
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (
      errors.content_en ||
      errors.content_uz ||
      errors.content_ru ||
      errors.title_en ||
      errors.title_ru ||
      errors.title_uz
    ) {
      toast.error("Malimotlar 3 ta tilga kiritilishi shart !!");
    }
  }, [errors]);
  useEffect(() => {
    if (formVariant.role == "edit") {
      reset({
        title_uz: newsData?.data.title_uz || "",
        title_ru: newsData?.data.title_ru || "",
        title_en: newsData?.data.title_en || "",
        content_en: newsData?.data.content_en || "",
        content_ru: newsData?.data.content_ru || "",
        content_uz: newsData?.data.content_uz || "",
        categoryId: newsData?.data.subcategory.id,
        source: newsData?.data.source || "",
      });
      setImage({
        id: "",
        path: newsData?.data.main_image.path ?? "",
      });
    }
  }, [newsData]);

  function onSubmit(data: NewsForm) {
    if (image.id == "" && formVariant.role !== "edit") {
      return setImgError(true);
    }
    const result: NewsFormRes = {
      title_uz: data.title_uz,
      title_en: data.title_en,
      title_ru: data.title_ru,
      content_uz: data.content_uz,
      content_en: data.content_en,
      content_ru: data.content_ru,
      source: data.source,
      is_draft: false,
      is_main: false,
      subcategory: {
        id: data.categoryId,
      },
    };
    if (image.id !== "") {
      result.main_image = { id: image.id };
    }
    submit(result);
  }

  const clearForm = () => {
    reset(); // Formani tozalaydi
    setValue("categoryId", " ");
    setValue("content_uz", " ");
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
          <p className="text-xl text-[var(--form-text)] font-bold">
            {"Yangilik Qo’shish"}
          </p>
          <PlusIcon />
        </span>
        <div className="flex gap-4">
          {langBtn.map((item) => {
            return (
              <Button
                className={`${
                  item.value == activeLang ? "bg-[#4DA6FF] text-white" : "bg-[var(--btn)] text-[var(--form-text)]"
                } cursor-pointer hover:bg-[var(--btn)] hover:opacity-70 py-2 text-sm  font-medium px-[14px] `}
                key={item.id}
                onClick={() => setActiveLang(item.value)}
              >
                {" "}
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex gap-10 items-start">
            <LangueInput
              activeLang={activeLang}
              label="Sarlavha"
              name="title"
              form={form}
              type="input"
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <label className="text-sm text-[var(--form-text)]">Kategoriya</label>
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
          </div>
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem className="w-full max-w-[49%] ">
                <label className="text-sm text-[var(--form-text)]">Manba</label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="bg-secondary w-full placeholder:text-amber-50 h-[50px]   outline-none border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UploadButton
            setImageFun={setImage}
            defaultImage={image.path}
            isError={imgError}
          />
          <LangueInput
            activeLang={activeLang}
            label="Kontent"
            name="content"
            form={form}
            type="editor"
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
