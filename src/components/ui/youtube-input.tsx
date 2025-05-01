import { useEffect, useRef, useState } from "react";

interface Props {
  setUrl: (url: string) => void;
}

export const YoutubeInput = ({ setUrl }: Props) => {
  const [value, setValue] = useState<string>("");

  const onClick = () => {
    if (value.length > 0) {
      setUrl(value);
    }
  };

  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setUrl("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="absolute left-[40%] top-5 z-10 bg-[var(--background)] w-80 px-5 py-3 rounded-4xl flex gap-2 items-center shadow-2xl"
      ref={inputRef}
    >
      <input
        type="text"
        className="border p-1 w-full"
        placeholder="video url"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="button" className="cursor-pointer" onClick={onClick}>
        save
      </button>
    </div>
  );
};
