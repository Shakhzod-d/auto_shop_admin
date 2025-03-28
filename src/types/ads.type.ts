export interface AdsForm {
  description_en: string;
  description_ru: string;
  description_uz: string;
  type: string;
  url: string;
}

export interface AdsRes {
  type: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  url: string;
  is_active: boolean;
  image?: Image;
}

export interface Image {
  id: string;
}

export interface AdsGetData {
  data: AdsData[];
  message: string;
  status_code: number;
}

export interface AdsData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  type: string;
  url: string;
  image: AdsImage;
  description: string;
}

export interface AdsImage {
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

export interface AdsOneRes {
  status_code: number;
  message: string;
  data: AdsOneData;
}

export interface AdsOneData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  type: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  url: string;
  image: AdsOneImage;
}

export interface AdsOneImage {
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
