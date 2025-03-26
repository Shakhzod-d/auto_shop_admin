import { Search } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className="flex gap-4 border items-center text-white p-2 rounded-md">
      <input
        className="border-none outline-none placeholder:text-white"
        type="text"
        placeholder="Qidiruv"
      />
      <Search size={20} />
    </div>
  );
};
