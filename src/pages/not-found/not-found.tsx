import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-center flex flex-col gap-4">
        <h3 className="text-[150px] text-blue-600 mb-0">404 </h3>
        <p className="text-3xl mb-10">Sahifa topilmadi</p>

        <Button
          className="bg-blue-600 p-4 cursor-pointer hover:bg-blue-400 text-white"
          onClick={() => navigate("/")}
        >
          Bosh sahifa
        </Button>
      </div>
    </div>
  );
};
