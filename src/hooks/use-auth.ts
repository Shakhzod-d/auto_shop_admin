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

  const { data, isLoading, isError } = useQuery<AuthUserRes>({
    queryFn: () => fetchItemsServ(`${API}/admin/one/${id}`),
    queryKey: ["fetchAuthUser", id], // Added 'id' to avoid cache issues
    staleTime: 0,
    retry: 1, // Retry once before failing
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isError || (data && data.status_code >= 400)) {
      timeout = setTimeout(() => navigate("/login"), 1000);
    } else if (data?.data) {
      setUserData({
        fullname: data.data.fullname ?? "",
        id: data.data.id ?? "",
        role: data.data.role ?? "",
      });

      timeout = setTimeout(() => {
        // Revalidate user after a delay
        if (!data.data.id) {
          navigate("/login");
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [data, isError, navigate, setUserData]);

  return { isLoading };
}
