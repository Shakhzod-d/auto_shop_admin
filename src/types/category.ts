import { SubmitData } from "@/pages/category/components/form";

export interface CategoryData {
  category_name_uz: string;
  category_name_en: string;
  category_name_ru: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  desc_uz: string;
  desc_ru: string;
  desc_en: string;
}

export interface CategoryRes {
  status_code: number;
  message: string;
  data: CategoryResData;
}

export interface CategoryResData {
  name_uz: string;
  name_ru: string;
  name_en: string;
  deleted_at: any;
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryObj {
  name_en: string;
  name_uz: string;
  name_ru: string;
}

export interface CreateSubCategory extends SubmitData {
  categoryId: string;
}
export interface SubCategoryData {
  name_uz: string;
  name_ru: string;
  name_en: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  category: {
    id: string;
  };
  banner: {
    id: string;
  };
}

export interface CategoryOne {
  status_code: number;
  message: string;
  data: CategoryOneData;
}

export interface CategoryOneData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name_uz: string;
  name_ru: string;
  name_en: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
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
}



