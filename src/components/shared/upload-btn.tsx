import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils"; // Helper for conditional classes
import { getLocaleStorage } from "@/utils/locale-storage";
const API = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

export function UploadButton({
  setImageFun,
  defaultImage,
  isError,
  title,
}: {
  setImageFun: (data: { id: string; path: string }) => void;
  defaultImage: string;
  isError: boolean;
  title?: string;
}) {
  const [image, setImage] = useState<string | null>(defaultImage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = getLocaleStorage("token");
  useEffect(() => {
    setImage(defaultImage);
  }, [defaultImage]);

  const handleFileChange = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError("Fayl hajmi 10MB dan oshmasligi kerak!");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(API + "/file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setImageFun({ id: result.data.id, path: result.data.path });
      setImage(result.data.path);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  return (
    <div>
      <div className="w-full rounded-[8px] border border-border bg-secondary h-[180px] py-3 px-4">
        <p className="font-medium text-[var(--form-text)] mb-3">
          {title ? title : "Rasm Yuklash"}
        </p>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label
          htmlFor="file-upload"
          className={cn(
            "p-2.5 border-1 border-border border-dashed flex items-center justify-center rounded-lg cursor-pointer ",
            { "p-6": loading }
          )}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className="animate-spin border-4 border-gray-300 border-t-transparent rounded-full w-10 h-10"></div>
          ) : image ? (
            <img
              src={IMG_URL + image}
              alt="Uploaded"
              className="w-[100px] h-[100px] object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-[#4DA6FF] size-[28px] mb-1" />
              <span className="flex text-[#4DA6FF] items-center gap-1 mb-1">
                Upload a file
                <p className="text-foreground">or drag & drop</p>
              </span>
              <p className="text-foreground text-[9px]">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFileChange(e.target.files[0])
          }
          accept="image/*"
        />
      </div>
      {isError && <p className="text-sm text-red-500">rasm yuklanmagan</p>}
    </div>
  );
}
