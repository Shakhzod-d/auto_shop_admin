export interface CommentRes {
  status_code: number;
  message: string;
  data: CommentResData[];
}

export interface CommentResData {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  text: string;
  news: News;
  user: User;
}

export interface News {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
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
}

export interface User {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  role: string;
  password: string;
  hashed_token: string;
  email: string;
  otp: string;
  otp_expiration: string;
  otp_request_count: number;
  otp_blocked_until: any;
  otp_blocked_duration: number;
}
