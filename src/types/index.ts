export type AuthType = "success" | "error" | "form";

export type AuthData = {
  username: string;
  password: string;
};

export type SelectData = {
  value: string;
  label: string;
};

export interface DeleteActionType {
  openModal: boolean;
  path: string;
  refetch?: () => void;
}

export interface FileRes {
  data: FileData[];
  total_elements: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  from: number;
  to: number;
  status_code: number;
  message: string;
}

export interface FileData {
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

export interface DashboardRes {
  data: DashboardData;
  status_code: number;
  message: string;
}

export interface DashboardData {
  total_news: number;
  latest_comments: number;
  total_users: number;
  total_views: number;
}
