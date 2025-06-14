import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import { usersColumns } from "./columns";
import Table from "@components/shared/components/table/table";
import TableFooter from "@components/shared/components/table/footer";
import Filters from "./filters";
import TablePagination from "@/components/shared/components/table/pagination";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useEffect } from "react";

export type UsersTableDataType = {
  _id: string;
  createdAt: string;
  name?: string;
  permissions?: [];
  updatedAt?: string;
}

export default function UsersTable({data, isLoading}: {data: any, isLoading: boolean}) {
  const { table, setData } = useTanStackTable<UsersTableDataType>({
    tableData: ensureArray(data),
    columnConfig: usersColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r._id !== row._id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(data));

  },[data])

  return (
    <div className="rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4">
      <Filters table={table} />
      <Table
        table={table}
        isLoading={isLoading}
        variant="modern"
        classNames={{
          container: "border border-muted rounded-md",
          rowClassName: "last:border-0",
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
      {/* <TablePagination className="py-4" /> */}
    </div>
  );
}
