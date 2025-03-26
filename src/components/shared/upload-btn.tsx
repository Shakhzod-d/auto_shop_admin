import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils"; // Helper for conditional classes
import { getLocaleStorage } from "@/utils/locale-storage";
const API = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

export function UploadButton({
  setImageFun,
}: {
  setImageFun: (data: { id: string; path: string }) => void;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = getLocaleStorage("token");
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Backendga yuklash (URL-ni o'zgartiring!)
      const response = await fetch(API + "/file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setImageFun({ id: result.data.id, path: result.data.path });
      setImage(result.data.path); // Backenddan qaytgan rasm URL
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-[8px] border border-border bg-secondary h-[180px] py-3 px-4">
      <div className="">
        <p className="font-medium text-[#E9E9E9] mb-3">Rasm Yuklash</p>
        <label
          htmlFor="file-upload"
          className={cn(
            "p-2.5 border-1 border-border border-dashed flex items-center justify-center rounded-lg cursor-pointer",
            { "bg-gray-100": loading }
          )}
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
                <p className="text-foreground">or drop and drop</p>
              </span>
              <p className="text-foreground text-[9px]">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        {/* <Button onClick={() => document.getElementById("file-upload")?.click()}>
        Rasm yuklash
      </Button> */}
      </div>
    </div>
  );
}
