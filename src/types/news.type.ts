export type newsVariant = "form" | "table";
export type FormType = "news" | "category";

export interface NewsForm {
  title_uz: string;
  title_ru: string;
  title_en: string;
  categoryId: string;
  source: string;
  content_en: string;
  content_uz: string;
  content_ru: string;
}

export interface NewsFormRes {
  title_uz: string;
  title_en: string;
  title_ru: string;
  content_uz: string;
  content_en: string;
  content_ru: string;
  source: string;
  is_draft: boolean;
  is_main: boolean;
  main_image: MainImage;
  subcategory: Subcategory;
}

export interface MainImage {
  id: string;
}

export interface Subcategory {
  id: string;
}

export interface CategoryReqTypes {
  status_code: number;
  data: categoryData[];
  message: string;
}

export interface categoryData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  banner: Banner;
  name: string;
  title: string;
}

export interface Banner {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  file_name: string;
  path: string;
  size: number;
  mime_type: string;
}
