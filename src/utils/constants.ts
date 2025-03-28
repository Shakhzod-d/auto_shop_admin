import { FileText, LucideLayoutDashboard } from "lucide-react";
import PicFolder from "../assets/icons/pic-folder.svg";
import Users from "../assets/icons/users.svg";
import Sms from "../assets/icons/sms.svg";
import CodeFolder from "../assets/icons/code-folder.svg";
import Cursor from "../assets/icons/cursor.svg";
import Globe from "../assets/icons/globe.svg";

export const sidebarData = [
  { id: 1, label: "Boshqaruv Paneli", icon: LucideLayoutDashboard, path: "/" },
  { id: 2, label: "Yangiliklar Boshqaruvi", icon: FileText, path: "/news" },
  { id: 3, label: "Media Kutubxonasi", icon: PicFolder, path: "/photos" },
  { id: 4, label: "Foydalanuvchilar Boshqaruvi", icon: Users, path: "/users" },
  { id: 5, label: "Izohlar va Sharhlar", icon: Sms, path: "/file" },
  {
    id: 6,
    label: "SEO va Metadata Sozlamalari",
    icon: CodeFolder,
    path: "/file",
  },
  { id: 7, label: "Reklamalar va Monetizatsiya", icon: Cursor, path: "/ads" },
  { id: 8, label: "Web-sayt Sozlamalari", icon: Globe, path: "/file" },
];
