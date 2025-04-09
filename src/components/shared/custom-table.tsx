import React from "react";

interface Column {
  key: string;
  title: any;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  isPhoto?: boolean;
}
const IMG_URL = import.meta.env.VITE_IMG_URL;
const activeClass =
  "p-2 bg-[#10B9811A] rounded-[40px] text-[#10B981] text-[14px]";
const errorClass = "p-1 bg-red-500 rounded-md text-text-red-200 text-white";
const CustomTable: React.FC<TableProps> = ({ columns, data, isPhoto }) => {
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <>
          <div className="bg-[var(--table-col)] text-text rounded-lg overflow-hidden mb-[28px]">
            <div className="grid grid-cols-5 gap-4 p-4 text-[14px] font-bold">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex justify-center items-center gap-1 text-[var(--text)]"
                >
                  {col.title}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 space-y-2">
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  background: rowIndex % 2 == 0 ? "var(--table-line)" : "",
                }}
                className="grid grid-cols-5 gap-4 items-center  text-text p-4 rounded-lg h-[110px] mb-[25px]"
              >
                {columns.map((col, i) => (
                  <div
                    key={col.key}
                    className="text-center flex justify-center"
                  >
                    {i == 0 && isPhoto ? (
                      <img
                        src={IMG_URL + row[col.key]}
                        alt="card"
                        className="w-[100px] h-[62px] rounded-[4px] object-cover"
                      />
                    ) : (
                      <span
                        className={
                          col.key == "status" && row[col.key] == "Aktiv"
                            ? activeClass
                            : row[col.key] == "Aktiv emas"
                            ? errorClass
                            : ""
                        }
                      >
                        {row[col.key]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-[30vh] flex justify-center items-center">
          <p className="text-3xl">Data mavjud emas {":("}</p>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
