import { FileText, User2 } from "lucide-react";
import { Card } from "./components/card";
import Sms from "../../assets/icons/sms.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchItemsServ } from "@/services/items-serv";
import { DashboardRes } from "@/types";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
const API = import.meta.env.VITE_API_URL;
export const Dashboard = () => {
  const { data } = useQuery<DashboardRes>({
    queryFn: () => fetchItemsServ(`${API}/statistic`),
    queryKey: ["dashboard"],
    staleTime: 0,
  });

  const { setAuthType } = useAuthStore();
  const arr = [
    {
      icon: FileText,
      title: "Jami Yangiliklar",
      value: `${data?.data?.total_news || 0} ta`,
    },

    {
      icon: Sms,
      title: "Yangi Izohlar",
      value: `${data?.data?.latest_comments || 0} ta`,
    },
    {
      icon: User2,
      title: "Faol foydalanuvchilar",
      value: `${data?.data?.latest_comments || 0} ta`,
    },
  ];
  useEffect(() => {
    setAuthType("form");
  }, []);
  return (
    <div className="flex gap-10 items-center">
      {arr.map((item, i) => {
        return <Card data={item} key={i} />;
      })}
    </div>
  );
};
