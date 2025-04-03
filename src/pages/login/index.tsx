import { AuthForm } from "./components/form";
import { AuthSuccess } from "./components/success";
import { AuthError } from "./components/error";
import { JSX } from "react";
import { AuthData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { postItemsServ } from "@/services/items-serv";
import { useAuthStore } from "@/store/auth-store";
import { setLocaleStorage } from "@/utils/locale-storage";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
export const Login = () => {
  const { authType, setAuthType, setUserData } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: loginFun, isPending: loading } = useMutation({
    mutationFn: (obj: AuthData) => postItemsServ(`${API}/admin/login`, obj),
    onSuccess: (data: any) => {
      console.log(data);
      const token: any = data?.data?.access_token;
      setLocaleStorage("token", token);
      setLocaleStorage("userId", data.data.id);
      navigate("/");
      // if (data.status_code >= 400) {
      //   setAuthType("error");
      // } else {
      //   setUserData({
      //     fullname: data?.data?.fullname,
      //     role: data?.data?.role,
      //     id: data?.data?.id,
      //   });
      //   setAuthType("success");
      // }
    },
    onError: (err) => {
      console.log({ err });
    },
  });

  const onSubmit = (data: AuthData) => loginFun(data);

  const component: Record<string, JSX.Element> = {
    form: <AuthForm submit={onSubmit} loading={loading} />,
    success: <AuthSuccess />,
    error: <AuthError />,
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {component[authType]}
    </div>
  );
};
