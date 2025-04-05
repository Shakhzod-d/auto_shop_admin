import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  data: SelectData[] | [];
}

export function CustomSelect({ value, onChange, data }: Props) {
  const [selectedValue, setSelectedValue] = useState(value || ""); // Fallback default

  useEffect(() => {
    if (value) setSelectedValue(value); // Agar API dan kelgan value bo‘lsa, o‘rnatsin
  }, [value]);
  return (
    <Select
      value={selectedValue}
      onValueChange={onChange}
      defaultValue={selectedValue}
    >
      <SelectTrigger
        className="w-full border border-border  rounded-md  bg-secondary py-[25px] text-[var(--form-text)]"
        style={{ height: "10px !important" }}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-secondary text-[var(--form-text)] w-full">
        <SelectGroup>
          {data.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
