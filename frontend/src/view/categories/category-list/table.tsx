import { CategoriesColumns } from "./columns";
import Table from "@components/shared/components/table/index";
import CustomExpandedComponent from "./expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useState } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { fetchAllCategory } from "@/store/slices/categoriesSlice";

export default function CategoriesTable({
  className,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const dispatch = useAppDispatch();
  const { categoryList, isLoading } = useAppSelector((state) => state.Categories);
  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(categoryList),
    columnConfig: CategoriesColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    dispatch(fetchAllCategory());

  }, [dispatch]);

  useEffect(() => {
    setData(ensureArray(categoryList));

  }, [categoryList]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",className )}>
        <Table
          table={table}
          data={categoryList}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: (row) => <CustomExpandedComponent row={row} />,
          }}
        />
        {/* <TableFooter table={table} /> */}
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
