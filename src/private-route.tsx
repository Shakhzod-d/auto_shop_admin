import { LoaderCircle } from "lucide-react";
import { JSX } from "react";
import { useAuthStore } from "./store/auth-store";
import { getLocaleStorage } from "./utils/locale-storage";
import { useAuth } from "./hooks/use-auth";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authLoader } = useAuthStore();
  const id = getLocaleStorage("userId");
  const { isLoading } = useAuth(id ?? "");

  return (
    <>
      {isLoading || authLoader ? (
        <div className="w-full h-screen flex justify-center items-center">
          <LoaderCircle className="animate-spin" color="#4DA6FF" size={60} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
