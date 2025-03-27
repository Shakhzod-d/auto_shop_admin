export interface UserData {
  fullname: string;
  role: string;
  id: string;
}

export interface AuthUserRes {
  status_code: number;
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  fullname: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  hashed_token: string;
  role: string;
}
