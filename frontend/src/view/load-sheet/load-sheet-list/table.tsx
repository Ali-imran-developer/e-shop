import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { loadSheetColumns } from "./columns";
import TableFooter from "@shared/components/table/footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect, useState } from "react";
import { ensureArray, ensureObject } from "@/utils/helperFunctions/formater-helper";
import { generateLabelPDF } from "./labelPrint";

export type ProductsDataType = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  cost: number;
  tax?: number;
  total: number;
};

export default function LoadSheetTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  data,
  isLoading,
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data: any;
  isLoading: boolean;
  paginationClassName?: string;
}) {
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: ensureArray(data),
    columnConfig: loadSheetColumns(),
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
        handlePrintLabelSlip: async (row: any) => {
          generateLabelPDF([row?.original]);
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      "ID,Name,Category,Sku,Price,Stock,Status,Rating",
      `product_data_${selectedData.length}`
    );
  }

  useEffect(() => {
    setData(
      ensureArray(data).map((item, index) => ({
        ...item,
        id: index + 1,
      }))
    );
  }, [data]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4 mt-2")}>
        <Table
          data={data}
          table={table}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={classNames}
        />

        {!hideFooter && (
          <TableFooter
            table={table}
            onExport={handleExportData}
            isLoading={""}
          />
        )}
        {!hidePagination && (
          <TablePagination
            table={table}
            className={cn("py-4", paginationClassName)}
          />
        )}
        <hr />
      </div>
    </>
  );
}
