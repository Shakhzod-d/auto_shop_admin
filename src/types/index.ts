
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
}
