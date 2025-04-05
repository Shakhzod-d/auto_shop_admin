import { SelectData } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface Props {
  defaultValue: string;
  onChange: (data: string) => void;
  data: SelectData[];
}
export const UiSelect = ({ defaultValue, onChange, data }: Props) => {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger
        className="w-full border border-border  rounded-md  bg-secondary  "
        style={{ height: "20px !important" }}
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
};
