import { LoaderCircle } from "lucide-react";
import { JSX, useEffect } from "react";
import { useAuthStore } from "./store/auth-store";
import { getLocaleStorage } from "./utils/locale-storage";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authLoader } = useAuthStore();
  const user = getLocaleStorage("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoader && !user) {
      navigate("/login");
    }
  }, [authLoader, user]);
  return (
    <>
      {authLoader ? (
        <div className="w-full h-screen flex justify-center items-center">
          <LoaderCircle className="animate-spin" color="#4DA6FF" size={60} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
