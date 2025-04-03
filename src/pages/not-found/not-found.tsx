import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-center flex flex-col gap-10">
        <h3 className="text-[150px] text-blue-600">404 </h3>
        <p className="text-3xl mb-2">Sahifa topilmadi</p>

        <Button
          className="bg-blue-600 p-4 cursor-pointer hover:bg-blue-400"
          onClick={() => navigate("/")}
        >
          Bosh sahifa
        </Button>
      </div>
    </div>
  );
};
