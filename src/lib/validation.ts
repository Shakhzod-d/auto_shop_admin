import { z } from "zod";

export const AuthFormSchema = z.object({
  username: z.string().min(3, { message: "" }),
  password: z.string().min(4, { message: "" }),
});

export const NewsFormSchema = z.object({
  title_uz: z.string().min(3, "Majburiy qator"),
  title_en: z.string().min(3, "Majburiy qator"),
  title_ru: z.string().min(3, "Majburiy qator"),
  content_uz: z.string().min(3, "Majburiy qator"),
  content_en: z.string().min(3, "Majburiy qator"),
  content_ru: z.string().min(3, "Majburiy qator"),
  categoryId: z.string().min(3, "Kategoriya tanlanmagan"),
  source: z.string().min(3, { message: "Manba kirilmagan" }),
});

export const AdsFormScheme = z.object({
  type: z.string().min(2, "type tanlanmagan"),
  description_uz: z.string().min(3, "tavsif kiritilmagan"),
  description_en: z.string().min(3, "tavsif kiritilmagan"),
  description_ru: z.string().min(3, "tavsif kiritilmagan"),
  url: z.string().min(3, "url kiritilmagan"),
});

export const addCategorySchema = z.object({
  category_name_uz: z.string().min(3, "Majburiy qator"),
  category_name_en: z.string().min(3, "Majburiy qator"),
  category_name_ru: z.string().min(3, "Majburiy qator"),
  title_uz: z.string().min(3, "Majburiy qator"),
  title_en: z.string().min(3, "Majburiy qator"),
  title_ru: z.string().min(3, "Majburiy qator"),
  desc_uz: z.string().min(3, "Majburiy qator"),
  desc_ru: z.string().min(3, "Majburiy qator"),
  desc_en: z.string().min(3, "Majburiy qator"),
});

export const AddSubCategorySchema = z.object({
  name_uz: z.string().min(3, "Majburiy qator"),
  name_en: z.string().min(3, "Majburiy qator"),
  name_ru: z.string().min(3, "Majburiy qator"),
  title_uz: z.string().min(3, "Majburiy qator"),
  title_en: z.string().min(3, "Majburiy qator"),
  title_ru: z.string().min(3, "Majburiy qator"),
  categoryId: z.string().min(3, "Kategoriya tanlanmagan"),
});
