import { SearchInput } from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import { useNewsStore } from "@/store/news-store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const News = () => {
  const navigate = useNavigate();
  const { newsVariant, setNewsVariant } = useNewsStore();
  const pathname = useLocation();
  const addNews = () => {
    navigate("/news/add-news");
  };
  useEffect(() => {
    if (pathname.pathname.endsWith("/add-news")) {
      setNewsVariant("form");
    } else {
      setNewsVariant("table");
    }
  }, [pathname]);

  const component = {
    table: (
      <>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Button className="p-4 cursor-pointer shadow-md" onClick={addNews}>
              + Yangilik qo'shish
            </Button>
          </div>
          <SearchInput />
        </div>
        {/* <TableDemo /> */}
      </>
    ),
    form: <Outlet />,
  };
  return component[newsVariant];
};
