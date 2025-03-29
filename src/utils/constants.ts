import {
  FileText,
  LucideLayoutDashboard,
  Folders,
  UsersRound,
  Mails,
  ScanEye,
  SquareTerminal,
} from "lucide-react";

import Globe from "../assets/icons/globe.svg";

export const sidebarData = [
  { id: 1, label: "Boshqaruv Paneli", icon: LucideLayoutDashboard, path: "/" },
  { id: 2, label: "Yangiliklar Boshqaruvi", icon: FileText, path: "/news" },
  { id: 3, label: "Media Kutubxonasi", icon: Folders, path: "/photos" },
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
