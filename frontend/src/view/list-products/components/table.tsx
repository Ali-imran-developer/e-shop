import { ListProductColumns } from "./columns";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import TableFooter from "@/components/shared/components/table/footer";

export default function ListProductTable({
  className,
  data,
  isLoading,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  data?: any;
  isLoading?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(data),
    columnConfig: ListProductColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
        columnPinning: {
          left: ["expandedHandler"],
          right: ["action"],
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(data));

  }, [data]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)}>
        <Table
          table={table}
          variant={variant}
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter table={table} />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
