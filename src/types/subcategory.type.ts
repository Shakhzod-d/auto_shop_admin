// subcategory

export interface GetSubCategory {
  status_code: number;
  data: SubCategory[];
  message: string;
}

export interface SubCategory {
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

export interface SubCategoryFormData {
  name_uz: string;
  name_ru: string;
  name_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  category: Category;
  banner: { id: string };
}

export interface Category {
  id: string;
}

export interface SubCategoryForm {
  title_uz: string;
  title_ru: string;
  title_en: string;
  categoryId: string;
  name_en: string;
  name_uz: string;
  name_ru: string;
}

export interface SubCategoryOneRes {
  status_code: number;
  message: string;
  data: SubCategoryOne;
}

export interface SubCategoryOne {
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
  banner: BannerOne;
}

export interface BannerOne {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  file_name: string;
  path: string;
  size: number;
  mime_type: string;
}
