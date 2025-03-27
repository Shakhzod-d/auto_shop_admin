import { Dashboard } from "@/pages/dashboard";
import { News } from "@/pages/news";
import { AddNews } from "@/pages/news/components/add-news";
import { Photo } from "@/pages/photos/photo";
import { Users } from "@/pages/users/users";

export const routes = [
  { id: 1, path: "/", component: Dashboard, route: [] },
  { id: 1, path: "/photos", component: Photo, route: [] },
  {
    id: 2,
    path: "/news",
    component: News,
    route: [{ id: 1, path: "/news/add-news", component: AddNews }],
  },
  {
    id: 3,
    path: "/users",
    component: Users,
    route: [],
  },
];
