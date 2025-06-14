import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { SalesChannelType } from "@data/salesChannel";
import { SalesChannelColumns } from "./columns";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import AuthController from "@/controllers/authController";
import { useEffect } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";

export default function SalesChannelTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  channels,
  loading,
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  channels: any;
  loading: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const navigate = useNavigate();
  const { table, setData } = useTanStackTable<SalesChannelType>({
    tableData: ensureArray(channels),
    columnConfig: SalesChannelColumns({ navigate }),
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
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(channels));
  }, [channels]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2")}>
        <Table
          table={table}
          variant="modern"
          isLoading={loading}
          showLoadingText={loading}
          classNames={classNames}
        />

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
