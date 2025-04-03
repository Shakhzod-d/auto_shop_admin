import { useTheme } from "@/theme-provider";
import { MoonIcon, Sun } from "lucide-react";

export const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className="h-[55px] bg-primary w-full flex justify-end p-4">
      {theme == "light" ? (
        <MoonIcon className="cursor-pointer" onClick={() => setTheme("dark")} />
      ) : (
        <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
      )}
    </header>
  );
};
