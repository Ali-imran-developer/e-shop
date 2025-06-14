// import { productsReviewsColumns } from "@shared/shared/ecommerce/review/columns";
// import { productReviews } from "@data/product-reviews";
import Table from "@shared/components/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TableFooter from "@shared/components/table/footer";
import TablePagination from "@shared/components/table/pagination";
import Filters from "./filters";

// export type ReviewsDataType = (typeof productReviews)[number];

export default function ReviewsTable() {
  const { table, setData } = useTanStackTable<any>({
    tableData: [],
    columnConfig: [],
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
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
