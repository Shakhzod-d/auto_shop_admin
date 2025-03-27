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
import { NewsForm, NewsFormRes } from "@/types/news.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PlusIcon from "@/assets/icons/plus.svg";
// import { useNewsStore } from "@/store/news-store";
// import { fetchItemsServ } from "@/services/items-serv";
// import { useQuery } from "@tanstack/react-query";
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
// const API = import.meta.env.VITE_API_URL;
export const AddNewsForm = ({ submit, selectData, loading }: Props) => {
  const [activeLang, setActiveLang] = useState("uz");
  const [image, setImage] = useState({ id: "", path: "" });
  // const { formVariant } = useNewsStore();

  // const { data: newsData } = useQuery<NewsOneRes>({
  //   queryFn: () => fetchItemsServ(`${API}/news/one/${formVariant.id}`),
  //   queryKey: ["newsOne"],
  //   enabled: formVariant.role === "edit", // Faqat "edit" rejimida so‘rov yuboriladi
  //   staleTime: 0,
  // });

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

  // const { reset } = form;
  // useEffect(() => {
  //   reset({
  //     title_uz: newsData?.data.t || "",
  //     title_ru: newsData?.data.title_ru || "",
  //     title_en: newsData.title_en || "",
  //     content_en: newsData.content_en || "",
  //     content_ru: newsData.content_ru || "",
  //     content_uz: newsData.content_uz || "",
  //     categoryId: newsData.categoryId || "",
  //     source: newsData.source || "",
  //   });
  // }, [newsData]);

  function onSubmit(data: NewsForm) {
    const result: NewsFormRes = {
      title_uz: data.title_uz,
      title_en: data.content_en,
      title_ru: data.title_ru,
      content_uz: data.content_uz,
      content_en: data.content_en,
      content_ru: data.content_ru,
      source: data.source,
      is_draft: false,
      is_main: false,
      main_image: {
        id: image.id,
      },
      subcategory: {
        id: data.categoryId,
      },
    };
    submit(result);
  }

  return (
    <div className="bg-muted w-full p-8 rounded-[10px]">
      <div className="flex justify-between items-center mb-10">
        <span className="flex items-center gap-2">
          <p className="text-xl text-[#E9E9E9] font-bold">Yangilik Qo’shish</p>
          <PlusIcon />
        </span>
        <div className="flex gap-4">
          {langBtn.map((item) => {
            return (
              <Button
                className={`${
                  item.value == activeLang ? "bg-[#4DA6FF]" : ""
                } cursor-pointer bg-[#3F3F46] hover:bg-[#3F3F46] hover:opacity-90 py-2 text-sm  font-medium px-[14px]`}
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
          onSubmit={(form.handleSubmit(onSubmit))}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex gap-10">
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
                  <label className="text-sm text-[#E9E9E9]">Kategoriya</label>
                  <FormControl>
                    <CustomSelect
                      value={field.value}
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
              <FormItem className="w-full max-w-[49%]">
                <label className="text-sm text-[#E9E9E9]">Manba</label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="bg-secondary w-full placeholder:text-amber-50 h-[50px]  border border-border outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UploadButton setImageFun={setImage} />
          <LangueInput
            activeLang={activeLang}
            label="Kontent"
            name="content"
            form={form}
            type="editor"
          />

          <div className="flex gap-10 mt-5">
            <Button
              type="reset"
              className="w-[200px] h-[50px] bg-secondary hover:opacity-90 p-4 font-semibold"
            >
              Orqaga
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-[200px] h-[50px] bg-[#4DA6FF] hover:opacity-90 p-4 font-semibold flex items-center gap-4"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Qo'shish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
