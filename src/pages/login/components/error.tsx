import ErrorIcon from "@/assets/icons/error.svg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
export const AuthError = () => {
  const { setAuthType } = useAuthStore();
  return (
    <div className="w-[550px] h-[395px] bg-card rounded-[12px] flex flex-col items-center justify-center relative">
      <div className="absolute top-[-55px]">
        <ErrorIcon />
      </div>
      <h4 className="font-bold text-[26px] mb-6">Failed to Create Account !</h4>
      <p className="w-[226px] text-center font-medium mb-[48px]">
        Sorry. your account has been failed to create{" "}
      </p>
      <Button
        className="w-[337px] h-[40px] bg-[#EF4444] text-white cursor-pointer hover:bg-[#EF4444] hover:opacity-90"
        onClick={() => setAuthType("form")}
      >
        Ok
      </Button>
    </div>
  );
};
