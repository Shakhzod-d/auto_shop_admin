export interface UsersRes {
  data: USersData[];
  total_elements: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  from: number;
  to: number;
  status_code: number;
  message: string;
}

export interface USersData {
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
  otp_expiration?: string;
  otp_request_count: number;
  otp_blocked_until: any;
  otp_blocked_duration: number;
}
