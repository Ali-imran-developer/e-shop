import { categories } from "@data/product-categories";
import Table from "@shared/components/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { categoriesColumns } from "./columns";
import TableFooter from "@shared/components/table/footer";
import TablePagination from "@shared/components/table/pagination";
import Filters from "./filters";

export type CategoryDataType = (typeof categories)[number];

export default function CategoryTable() {
  const { table, setData } = useTanStackTable<CategoryDataType>({
    tableData: categories,
    columnConfig: categoriesColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row: { id: number }) => {
          setData((prev: any[]) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows: any[]) => {
          setData((prev: any[]) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: "border border-muted rounded-md",
          rowClassName: "last:border-0",
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </>
  );
}
