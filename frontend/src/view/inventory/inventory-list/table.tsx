import Table from "@components/shared/components/table/index";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { InventoryListColumn } from "./columns";
import TableFooter from "@shared/components/table/footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect } from "react";
import CustomExpandedComponent from "./expanded-row";

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
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2"
        )}
      >
        <Table
          data={data}
          table={table}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={classNames}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                table={table}
                data={data?.products}
                isLoading={isLoading}
              />
            ),
          }}
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
      </div>
    </>
  );
}
