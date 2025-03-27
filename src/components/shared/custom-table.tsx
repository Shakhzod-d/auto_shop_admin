import React from "react";

interface Column {
  key: string;
  title: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}
const IMG_URL = import.meta.env.VITE_IMG_URL;
const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="bg-background text-white rounded-lg overflow-hidden mb-[28px]">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
          {columns.map((col) => (
            <div key={col.key} className="text-center">
              {col.title}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="mt-2 space-y-2">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{ background: rowIndex % 2 == 0 ? "#101012" : "" }}
            className="grid grid-cols-5 gap-4 items-center  text-white p-4 rounded-lg h-[110px] mb-[25px]"
          >
            {columns.map((col, i) => (
              <div key={col.key} className="text-center flex justify-center">
                {i == 0 ? (
                  <img
                    src={IMG_URL + row[col.key]}
                    alt="card"
                    className="w-[100px] h-[62px] rounded-[4px]"
                  />
                ) : (
                  row[col.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
