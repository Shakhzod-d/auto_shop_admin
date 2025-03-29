import { KeyRound, User2Icon } from "lucide-react";
import React from "react";

export const AuthInput = React.forwardRef<
  HTMLInputElement,
  {
    type: string;
    variant: "username" | "password";
    placeholder: string;
    isError: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement> // ✅ Input elementiga kerakli atributlarni qo‘shish
>(({ type, placeholder, variant, isError, ...props }, ref) => {
  const error = isError ? "text-[#EF4444] border border-[#EF4444]" : "";

  return (
    <div
      className={`w-full p-[14px] bg-background rounded-[8px] flex items-center gap-2 ${error}`}
    >
      {variant === "username" ? (
        <User2Icon
          className="size-[18px]"
          color={!isError ? "#A1A1AA" : "#EF4444"}
        />
      ) : (
        <KeyRound
          className="size-[18px]"
          color={!isError ? "#A1A1AA" : "#EF4444"}
        />
      )}
      <input
        ref={ref} // ✅ forwardRef orqali uzatilgan ref qo‘shildi
        type={type}
        placeholder={placeholder}
        {...props}
        className={`h-[18px] w-full outline-none border-none ${
          isError ? "border border-[#EF4444]" : ""
        }`}
      />
    </div>
  );
});

AuthInput.displayName = "AuthInput"; // ✅ React DevTools uchun nom qo‘shish
