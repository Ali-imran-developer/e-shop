import { ResllersColumns } from "./columns";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useCustomer } from "@/hooks/customer-hook";

export default function ResllersTable({
  className,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const { data } = useAppSelector((state) => state?.Customer);
  const { handleGetCustomer, isLoading } = useCustomer();
  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(data),
    columnConfig: ResllersColumns(),
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
    handleGetCustomer();
  },[])

  useEffect(() => {
    setData(ensureArray(data));
  }, [data]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)}>
        <Table
          table={table}
          variant={variant}
          showLoadingText={isLoading}
          isLoading={isLoading}
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
