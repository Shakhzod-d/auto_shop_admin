
import { KeyRound, User2Icon } from "lucide-react";

export const AuthInput = ({
  type,
  placeholder,
  variant,
  isError,
  ...props
}: {
  type: string;
  variant: "username" | "password";
  placeholder: string;
  isError: boolean;
}) => {
  const error = isError ? "text-[#EF4444] border border-[#EF4444]" : "";
  return (
    <div
      className={`w-full p-[14px] bg-background rounded-[8px] flex items-center gap-2 ${error}`}
    >
      {variant == "username" ? (
        <User2Icon
          className="siz-[18px]"
          color={!isError ? "#A1A1AA" : "#EF4444"}
        />
      ) : (
        <KeyRound
          className="siz-[18px]"
          color={!isError ? "#A1A1AA" : "#EF4444"}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`h-[18px] w-full outline-none border-none ${
          isError ? "border border-[#EF4444]" : ""
        }`}
      />
    </div>
  );
};
