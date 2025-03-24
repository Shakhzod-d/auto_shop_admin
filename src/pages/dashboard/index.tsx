import { Eye, FileText, UserRound } from "lucide-react";
import { Card } from "./components/card";
import Sms from "../../assets/icons/sms.svg";
const data = [
  {
    icon: FileText,
    title: "Jami Yangiliklar",
    value: "125 ta",
  },
  {
    icon: Eye,
    title: "Bugungi Ko‘rishlar",
    value: "8.200 ta",
  },
  {
    icon: Sms,
    title: "Yangi Izohlar",
    value: "34 ta",
  },
  {
    icon: UserRound,
    title: "Faol Jurnalistlar",
    value: "6 ta",
  },
];
export const Dashboard = () => {
  return (
    <div className="flex justify-between">
      {data.map((item, i) => {
        return <Card data={item} key={i} />;
      })}
    </div>
  );
};
