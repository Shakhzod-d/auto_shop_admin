import { fetchItemsServ } from "@/services/items-serv";
import { useAuthStore } from "@/store/auth-store";
import { AuthUserRes } from "@/types/auth.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
export function useAuth(id: string) {
  const navigate = useNavigate();
  const { setUserData } = useAuthStore();
  const { data, isLoading } = useQuery<AuthUserRes>({
    queryFn: () => fetchItemsServ(`${API}/admin/one/${id}`),
    queryKey: ["fetchAuthUser"],
    staleTime: 0,
  });

  useEffect(() => {
    if (data && data.status_code >= 400) {
      navigate("/login");
    } else {
      setUserData({
        fullname: data?.data.fullname ?? "",
        id: data?.data.id ?? "",
        role: data?.data.role ?? "",
      });
    }
  }, [data]);
  return { isLoading };
}
