import { forwardRef } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { RichTextEditorComponent } from "./text-editor";

interface Props {
  form: any;
  name: string;
  label: string;
  activeLang: string;
  type: "input" | "editor";
}

export const LangueInput = forwardRef<HTMLInputElement, Props>(
  ({ form, activeLang, label, name, type }, ref) => {
    const component = {
      input: (
        <>
          {["uz", "en", "ru"].map((lang) => (
            <FormField
              key={lang}
              control={form.control}
              name={`${name}_${lang}`}
              render={({ field }) => (
                <FormItem
                  className={`w-full ${
                    activeLang === lang ? "grid" : "hidden"
                  }`}
                >
                  <label className="text-sm text-[var(--form-text)]">{label}</label>
                  <FormControl>
                    <Input
                      {...field}
                      ref={ref} // Ref qo‘shildi
                      type="text"
                      className="bg-secondary w-full placeholder:text-amber-50 h-[51px] outline-none text-[var(--form-text)] border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </>
      ),
      editor: (
        <>
          {["uz", "en", "ru"].map((lang) => (
            <FormField
              key={lang}
              control={form.control}
              name={`${name}_${lang}`}
              render={({ field }) => (
                <FormItem
                  className={`w-full ${
                    activeLang === lang ? "grid" : "hidden"
                  }`}
                >
                  <label className="text-sm text-[var(--form-text)]">{label}</label>
                  <FormControl>
                    <RichTextEditorComponent
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </>
      ),
    };
    return <>{component[type]}</>;
  }
);

LangueInput.displayName = "LangueInput";
