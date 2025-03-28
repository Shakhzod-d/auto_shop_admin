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
export const LangueInput = ({ form, activeLang, label, name, type }: Props) => {
  const component = {
    input: (
      <>
        <FormField
          control={form.control}
          name={name + "_uz"}
          render={({ field }) => (
            <FormItem
              className={` w-full ${activeLang == "uz" ? "grid" : "hidden"}`}
            >
              <label className="text-sm text-[#E9E9E9]">{label}</label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="bg-secondary w-full placeholder:text-amber-50 h-[52px]  border border-border outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={name + "_en"}
          render={({ field }) => (
            <FormItem
              className={` w-full ${activeLang == "en" ? "grid" : "hidden"}`}
            >
              <label className="text-sm text-[#E9E9E9]">{label}</label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="bg-secondary w-full placeholder:text-amber-50 h-[52px]  border border-border outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={name + "_ru"}
          render={({ field }) => (
            <FormItem
              className={` w-full ${activeLang != "ru" ? "hidden" : "grid"}`}
            >
              <label className="text-sm text-[#E9E9E9]">{label}</label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="bg-secondary w-full placeholder:text-amber-50 h-[52px]  border border-border outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    ),
    editor: (
      <>
        <FormField
          control={form.control}
          name={name + "_uz"}
          render={({ field }) => (
            <FormItem className={` ${activeLang == "uz" ? "grid" : "hidden"}`}>
              <label className="text-sm text-[#E9E9E9]">{label}</label>
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
        <FormField
          control={form.control}
          name={name + "_en"}
          render={({ field }) => (
            <FormItem className={` ${activeLang == "en" ? "grid" : "hidden"}`}>
              <label className="text-sm text-[#E9E9E9]">{label}</label>
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
        <FormField
          control={form.control}
          name={name + "_ru"}
          render={({ field }) => (
            <FormItem className={` ${activeLang == "ru" ? "grid" : "hidden"}`}>
              <label className="text-sm text-[#E9E9E9]">{label}</label>
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
      </>
    ),
  };
  return <>{component[type]}</>;
};
