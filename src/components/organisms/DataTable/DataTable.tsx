import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  containerHeight?: string;
  rowHeight?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  containerHeight = "600px",
  rowHeight = 56,
  className,
}: DataTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  return (
    <div
      className={cn(
        "border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col shadow-sm w-full",
        className,
      )}
    >
      <div className="flex bg-slate-50 border-b border-slate-200 font-semibold text-sm text-slate-600 sticky top-0 z-10">
        {columns.map((col) => (
          <div
            key={col.key}
            className="px-6 py-4 truncate"
            style={{
              width: col.width || `${100 / columns.length}%`,
              flexShrink: 0,
            }}
          >
            {col.header}
          </div>
        ))}
      </div>

      <div
        ref={parentRef}
        className="overflow-auto scroll-smooth custom-scrollbar"
        style={{ height: containerHeight }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = data[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className={cn(
                  "absolute top-0 left-0 w-full flex items-center border-b border-slate-100 hover:bg-blue-50/40 transition-colors text-sm text-slate-700",
                  virtualRow.index % 2 === 0 ? "bg-white" : "bg-slate-50/30",
                )}
                style={{
                  minHeight: `${rowHeight}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className="px-6 py-3 break-words"
                    style={{
                      width: col.width || `${100 / columns.length}%`,
                      flexShrink: 0,
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
