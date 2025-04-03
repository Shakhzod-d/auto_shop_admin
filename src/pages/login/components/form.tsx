import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { AuthInput } from "./auth-input";
import { AuthFormSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { AuthData } from "@/types";
import { Loader2Icon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "@/theme-provider";
interface Props {
  submit: (data: AuthData) => void;
  loading: boolean;
}
export const AuthForm = ({ submit, loading }: Props) => {
  const { setTheme, theme } = useTheme();
  const [isError, setIsError] = useState<{
    username: boolean;
    password: boolean;
  }>({ username: false, password: false });
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    formState: { errors },
    watch,
  } = form;
  const [username, password] = watch(["username", "password"]);
  useEffect(() => {
    setIsError({
      username: Boolean(errors.username),
      password: Boolean(errors.password),
    });
  }, [errors, username, password]);

  function onSubmit(data: z.infer<typeof AuthFormSchema>) {
    submit(data);
  }
  return (
    <div className="w-[550px] h-[464px] bg-primary rounded-[5px] p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-[27px] text-[#4DA6FF] font-bold mb-6">
          // AutoShop
        </h2>
        {theme == "light" ? (
          <MoonIcon
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
        )}
      </div>
      <p className="text-[24px] text-foreground font-bold mb-8">Kirish</p>
      <div className="w-full   border border-[#6B7280] mb-8"></div>
      <p className="mb-6">username bilan davom eting</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex  flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput
                    isError={isError.username}
                    {...field}
                    type="text"
                    variant="username"
                    placeholder="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInput
                    isError={isError.password}
                    {...field}
                    type="password"
                    variant="password"
                    placeholder="Password"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4DA6FF] hover:bg-[#4DA6FF] hover:opacity-90 cursor-pointer p-4 font-semibold"
          >
            {loading && <Loader2Icon className="animate-spin" />}
            Kirish
          </Button>
        </form>
      </Form>
    </div>
  );
};
