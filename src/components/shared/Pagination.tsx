import { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { cn } from "@/lib/utils"; // Classname helper
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  totalPages: number; // Jami sahifalar soni
  onPageChange?: (page: number) => void;
  activePage: any; // Sahifa o‘zgarganda ishlovchi funksiya
}

export function Pagination({
  totalPages,
  onPageChange,
  activePage,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(activePage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 3) pages.push(1, "...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }

    return pages.map((page, idx) =>
      typeof page === "number" ? (
        <Button
          key={idx}
          variant={currentPage === page ? "default" : "outline"}
          className={cn("w-10 h-10 mx-1 cursor-pointer", {
            "bg-blue-500 text-white cursor-pointer hover:bg-blue-400": currentPage === page,
          })}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ) : (
        <span key={idx} className="px-2 text-gray-400  cursor-pointer">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4 cursor-pointer">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="cursor-pointer"
      >
        <ChevronsLeft />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="cursor-pointer"
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}
