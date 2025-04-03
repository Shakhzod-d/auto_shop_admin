import SuccessIcon from "@/assets/icons/success.svg";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";

export const AuthSuccess = () => {
  const { setAuthType } = useAuthStore();
  const navigate = useNavigate();

  const onClickFun = () => {
    navigate("/");
    setAuthType("form");
  };

  return (
    <div className="w-[550px] h-[395px] bg-primary rounded-[12px] flex flex-col items-center justify-center relative">
      <div className="absolute top-[-55px]">
        <SuccessIcon />
      </div>
      <h4 className="font-bold text-[26px] mb-6">Successfully Created !</h4>
      <p className="w-[226px] text-center font-medium mb-[48px]">
        Congratulations. your account has been successfully created
      </p>
      <Button
        className="w-[337px] h-[40px] bg-[#34C759] text-white cursor-pointer hover:bg-[#34C759] hover:opacity-90"
        onClick={onClickFun}
      >
        Continue
      </Button>
    </div>
  );
};
