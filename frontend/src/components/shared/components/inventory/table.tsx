import { productsData } from "@data/products-data";
import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { InventoryListColumn } from "./columns";
import Filters from "./filters";
import TableFooter from "@shared/components/table/footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect } from "react";

export default function ProductsTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  data,
  isDataLoaded,
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data: any;
  isDataLoaded: boolean;
  paginationClassName?: string;
}) {
  console.log("datadata", data);

  const { table, setData } = useTanStackTable<any>({
    tableData: data,
    columnConfig: InventoryListColumn,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r: any) => r._id !== row._id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
        handleInputChange: (rows: any) => {
          console.log("rows", rows);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(data);
  }, [data]);

  const selectedData = table
    ?.getSelectedRowModel()
    ?.rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      "ID,Name,Category,Sku,Price,Stock,Status,Rating",
      `product_data_${selectedData.length}`
    );
  }

  return (
    <>
      {!hideFilters && <Filters table={table} />}

      <Table table={table} variant="modern" classNames={classNames} />

      {!hideFooter && (
        <TableFooter table={table} onExport={handleExportData} isLoading={""} />
      )}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn("py-4", paginationClassName)}
        />
      )}
    </>
  );
}
