import { productsData } from "@data/products-data";
import  {InventoryListColumn}  from "./columns";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import Table from "@shared/components/table";
import WidgetCard from "@shared/components/cards/widget-card";
import cn from "@utils/helperFunctions/class-names";
import TablePagination from "@shared/components/table/pagination";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export type ProductsDataType = (typeof productsData)[number];

export default function StockReport({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: productsData,
    columnConfig: InventoryListColumn,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
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
  return (
    <WidgetCard
      title="Stock Report"
      className={cn("p-0 lg:p-0", className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
      action={
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by patient name..."
          onClear={() => table.setGlobalFilter("")}
          value={table.getState().globalFilter ?? ""}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
        />
      }
    >
      <Table
        table={table}
        variant="modern"
        classNames={{
          rowClassName: "last:border-0",
        }}
      />
      <TablePagination table={table} className="p-4" />
    </WidgetCard>
  );
}
