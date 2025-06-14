import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { productsListColumns } from "./columns";
import TableFooter from "@shared/components/table/footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Button, Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import OrderDetails from "./OrderDetails";

export type ProductsDataType = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  cost: number;
  tax?: number;
  total: number;
};

const dummyProducts: ProductsDataType[] = [
  {
    id: "1",
    name: "Product A",
    sku: "SKU-001",
    quantity: 0,
    cost: 0,
    tax: 0,
    total: 0,
  },
  {
    id: "1",
    name: "Product B",
    sku: "SKU-002",
    quantity: 0,
    cost: 0,
    tax: 0,
    total: 0,
  },
  {
    id: "1",
    name: "Product C",
    sku: "SKU-003",
    quantity: 0,
    cost: 0,
    tax: 0,
    total: 0,
  },
];

export default function ProductsTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  className,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  data = dummyProducts,
  isLoading,
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data?: ProductsDataType[];
  className?: string;
  isLoading?: any;
  paginationClassName?: string;
}) {
  console.log("datadata", data);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [editableData, setEditableData] = useState<ProductsDataType[]>(() =>
    ensureArray(data)
  );
  console.log("editableData", editableData);
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: editableData,
    columnConfig: productsListColumns,
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
        handleUpdateData: (
          rowIndex: number,
          columnId: string,
          value: unknown
        ) => {
          setEditableData((prev) =>
            prev.map((row, index) => {
              if (index === rowIndex) {
                const numericFields = ["quantity", "cost", "tax", "total"];
                const parsedValue = numericFields.includes(columnId)
                  ? Number(value) || 0
                  : value;

                return {
                  ...row,
                  [columnId]: parsedValue,
                };
              }
              return row;
            })
          );
          setData((prev) =>
            prev.map((row, idx) =>
              idx === rowIndex ? { ...row, [columnId]: value } : row
            )
          );
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
    setEditableData(ensureArray(data));
  }, [data]);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4 mt-8",
          className
        )}
      >
        <p className="text-lg font-bold">Add Products</p>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            clearable={true}
            inputClassName="h-[36px]"
            placeholder="Search Products"
            onClear={() => table.setGlobalFilter("")}
            value={table.getState().globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2 mb-4"
          />

          <Button className="mb-2">Browser</Button>
        </div>
        <Table
          data={editableData}
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
        <p className="text-base pt-4">1 Variant on purchase order </p>
      </div>
      <OrderDetails orderItems={editableData} />
    </>
  );
}
