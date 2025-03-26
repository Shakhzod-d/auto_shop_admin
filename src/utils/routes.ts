import { Dashboard } from "@/pages/dashboard";
import { News } from "@/pages/news";
import { AddNews } from "@/pages/news/components/add-news";

export const routes = [
  { id: 1, path: "/", component: Dashboard, route: [] },
  {
    id: 2,
    path: "/news",
    component: News,
    route: [{ id: 1, path: "/news/add-news", component: AddNews }],
  },
];
