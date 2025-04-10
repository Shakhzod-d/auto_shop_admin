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
import { AdsFormScheme } from "@/lib/validation";

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
import { AdsForm, AdsOneRes, AdsRes } from "@/types/ads.type";

const langBtn = [
  { id: 1, value: "uz", label: "Uzbek" },
  { id: 2, value: "en", label: "English" },
  { id: 3, value: "ru", label: "Русский" },
];
interface Props {
  submit: (data: AdsRes) => void;

  loading: boolean;
}

const selectData = [
  { value: "grid", label: "Grid" },
  { value: "banner", label: "Banner" },
  { value: "carousel", label: "Carousel" },
];
const API = import.meta.env.VITE_API_URL;
export const AddAdsForm = ({ submit, loading }: Props) => {
  const navigate = useNavigate();

  const [activeLang, setActiveLang] = useState("uz");
  const [image, setImage] = useState({ id: "", path: "" });
  const { formVariant } = useNewsStore();

  const [imgError, setImgError] = useState(false);

  const { data: adsOne } = useQuery<AdsOneRes>({
    queryFn: () => fetchItemsServ(`${API}/ad/admin/${formVariant.id}`),
    queryKey: ["adsOne"],
    enabled: formVariant.role === "edit", // Faqat "edit" rejimida so‘rov yuboriladi
    staleTime: 0,
  });

  const form = useForm({
    resolver: zodResolver(AdsFormScheme),
    defaultValues: {
      description_en: "",
      description_uz: "",
      description_ru: "",
      type: "",
      url: "",
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
      errors.description_en ||
      errors.description_uz ||
      errors.description_ru
    ) {
      toast.error("Malimotlar 3 ta tilga kiritilishi shart !!");
    }
  }, [errors]);
  useEffect(() => {
    if (formVariant.role == "edit") {
      reset({
        description_en: adsOne?.data.description_en || "",
        description_uz: adsOne?.data.description_uz || "",
        description_ru: adsOne?.data.description_ru || "",
        type: adsOne?.data.type || "",
      });
      setImage({
        id: "",
        path: adsOne?.data.image.path ?? "",
      });
    }
  }, [adsOne]);

  function onSubmit(data: AdsForm) {
    if (image.id == "" && formVariant.role !== "edit") {
      return setImgError(true);
    }
    const result: AdsRes = {
      type: data.type,
      description_en: data.description_en,
      description_ru: data.description_ru,
      description_uz: data.description_uz,
      url: data.url,
      is_active: true,
    };
    if (image.id !== "") {
      result.image = { id: image.id };
    }
    submit(result);
  }

  const clearForm = () => {
    reset(); // Formani tozalaydi
    setValue("type", " ");

    setImage({ id: "", path: "" });
  };
  const cancelBtn = () => {
    reset();
    clearForm();
    navigate("/ads");
  };

  return (
    <div className="bg-muted w-full p-8 rounded-[10px]">
      <div className="flex justify-between items-center mb-10">
        <span className="flex items-center gap-2">
          <p className="text-xl font-bold font-poly text-[var(--text)]">
            {"Reklama Qo’shish"}
          </p>
          <PlusIcon />
        </span>
        <div className="flex gap-4">
          {langBtn.map((item) => {
            return (
              <Button
                className={`${
                  item.value == activeLang ? "bg-[#4DA6FF]" : "bg-[#3F3F46]"
                } cursor-pointer hover:bg-[#3F3F46] hover:opacity-90 py-2 text-sm  font-medium px-[14px] text-white`}
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
          <div className="flex gap-10">
            <LangueInput
              activeLang={activeLang}
              label="Tavsif"
              name="description"
              form={form}
              type="input"
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <label className="text-sm text-[#E9E9E9]">Type</label>
                  <FormControl>
                    <CustomSelect
                      value={watch("type") ?? ""}
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
            name="url"
            render={({ field }) => (
              <FormItem className="w-full max-w-[49%]">
                <label className="text-sm text-[#E9E9E9]">Url</label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="bg-secondary w-full placeholder:text-amber-50 h-[50px]   outline-none "
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

          <div className="flex gap-10 mt-5">
            <Button
              type="submit"
              disabled={loading}
              className="w-[200px] h-[50px] bg-[#4DA6FF] hover:bg-blue-500 p-4 font-semibold flex items-center gap-4 text-white cursor-pointer"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Qo'shish
            </Button>
            <Button
              type="reset"
              onClick={cancelBtn}
              className="w-[120px] h-[50px]  hover:opacity-90 p-4 font-semibold bg-red-500 text-white cursor-pointer hover:bg-red-400"
            >
              Orqaga
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
