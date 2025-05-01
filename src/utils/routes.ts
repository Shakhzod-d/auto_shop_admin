import { Ads } from "@/pages/ads/ads";
import { AddAds } from "@/pages/ads/components/add-ads";
import { Category } from "@/pages/category/category";
import { AddCategory } from "@/pages/category/components/add-category";
import { Comment } from "@/pages/comment/comment";
import { Dashboard } from "@/pages/dashboard";
import { News } from "@/pages/news";
import { AddNews } from "@/pages/news/components/add-news";
import { Photo } from "@/pages/photos/photo";
import { AddSubCategory } from "@/pages/subcategory/components/add-subcategory";
import { SubCategory } from "@/pages/subcategory/subcategory";
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
  {
    id: 4,
    path: "/comments",
    component: Comment,
    route: [],
  },
  {
    id: 6,
    path: "/category",
    component: Category,
    route: [{ id: 1, path: "/category/add-category", component: AddCategory }],
  },
  {
    id: 7,
    path: "/subcategory",
    component: SubCategory,
    route: [
      {
        id: 1,
        path: "/subcategory/add-subcategory",
        component: AddSubCategory,
      },
    ],
  },
  {
    id: 5,
    path: "/ads",
    component: Ads,
    route: [{ id: 2, path: "/ads/add-ads", component: AddAds }],
  },
];
