import Table from "@shared/components/table/table";
import { shopilamData } from "@data/sku-mapping";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { TableVariantProps } from "rizzui";
import { useEffect } from "react";
import { InventoryColumns } from "./column";

export default function BasicTable({
  stickyHeader = false,
  variants = "classic",
  data,
  isDataLoaded,
}: {
  stickyHeader?: boolean;
  variants?: TableVariantProps;
  data: any;
  isDataLoaded: boolean;
}) {

  const { table, setData } = useTanStackTable<any>({
    tableData: data,
    columnConfig: InventoryColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: stickyHeader ? shopilamData.length : shopilamData.length,
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
    setData(data);
    
  }, [data]);

  return (
    <>
      <div className="rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2">
        <Table table={table} stickyHeader={stickyHeader} variant={variants} />
      </div>
    </>
  );
}
