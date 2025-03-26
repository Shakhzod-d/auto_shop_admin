import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/types";

interface Props {
  value: string;
  onChange: (value: string) => void;
  data: SelectData[] | [];
}

export function CustomSelect({ value, onChange, data }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="w-full border border-border  rounded-md  bg-secondary py-[25px] "
        style={{ height: "40px !important" }}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-secondary text-white w-full">
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
