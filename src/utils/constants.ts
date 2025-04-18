import {
  FileText,
  LucideLayoutDashboard,
  UsersRound,
  Mails,
  ScanEye,
  SquareTerminal,
} from "lucide-react";

import Globe from "../assets/icons/globe.svg";

export const sidebarData = [
  { id: 1, label: "Boshqaruv Paneli", icon: LucideLayoutDashboard, path: "/" },
  { id: 2, label: "Yangiliklar Boshqaruvi", icon: FileText, path: "/news" },
  {
    id: 4,
    label: "Foydalanuvchilar Boshqaruvi",
    icon: UsersRound,
    path: "/users",
  },
  { id: 5, label: "Izohlar va Sharhlar", icon: Mails, path: "/comments" },
  { id: 7, label: "Reklamalar va Monetizatsiya", icon: ScanEye, path: "/ads" },
  {
    id: 6,
    label: "SEO va Metadata Sozlamalari",
    icon: SquareTerminal,
    path: "/file",
  },
  { id: 8, label: "Web-sayt Sozlamalari", icon: Globe, path: "/file" },
];

const Data = new Date();
const weekDay = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];
const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];
export const calendarFun = () => {
  const day = Data.getDate();
  const year = Data.getFullYear();
  return `${weekDay[Data.getDay() - 1]}, ${
    months[Data.getMonth() - 1]
  } ${day}, ${year}`;
};
