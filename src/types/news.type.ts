export type newsVariant = "form" | "table";
export type FormType = "news" | "category";

export interface NewsResType {
  data: NewsRes[];
  total_elements: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  from: number;
  to: number;
  status_code: number;
  message: string;
}
export interface NewsRes {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title: string;
  content: string;
  slug: string;
  source: string;
  is_draft: boolean;
  is_main: boolean;
  main_image: MainImage;
  category: Category;
  subcategory: Subcategory;
  comment_count: number;
}

export interface Category {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name: string;
  subcategories: Subcategory;
}
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
  main_image?: MainImage;
  subcategory: Subcategory;
}

export interface MainImage {
  id: string;
  path?: string;
}

export interface Subcategory {
  id: string;
  name?: string;
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
export interface FormVariant {
  id: string;
  role: "create" | "edit";
}

export interface Category {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name: string;
}

export interface NewsOneRes {
  status_code: number;
  message: string;
  data: NewsOneData;
}

export interface NewsOneData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title_uz: string;
  title_en: string;
  title_ru: string;
  content_uz: string;
  content_en: string;
  content_ru: string;
  slug: string;
  source: string;
  is_draft: boolean;
  is_main: boolean;
  main_image: newsOneMainImage;
  category: NewsOneCategory;
  subcategory: NewsOneSubcategory;
  comments: any[];
}

export interface newsOneMainImage {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  file_name: string;
  path: string;
  size: number;
  mime_type: string;
}

export interface NewsOneCategory {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name_uz: string;
  name_ru: string;
  name_en: string;
}

export interface NewsOneSubcategory {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name_uz: string;
  name_ru: string;
  name_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  banner: newsOneBanner;
}

export interface newsOneBanner {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  file_name: string;
  path: string;
  size: number;
  mime_type: string;
}
