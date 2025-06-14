import Table from '@shared/components/table/table';
import { useTanStackTable } from '@shared/components/table/custom/use-TanStack-Table';
import Filters from './filters';
import { invoiceListColumns } from './columns';
import { useEffect } from 'react';
import { ensureArray } from '@/utils/helperFunctions/formater-helper';
import cn from '@/utils/helperFunctions/class-names';
import TableFooter from '@/components/shared/components/table/footer';
import TablePagination from '@/components/shared/components/table/pagination';
import { TableVariantProps } from 'rizzui';

export type InvoiceTableDataType = {
  id: string;
  dueDate: string;
  amount: string;
  status: string;
  createdAt: string;
}

export default function InvoiceTable({
  data,
  isDataLoaded,
  isLoading,
  className,
  variant = "modern",
  hidePagination = false,
}: {
  data?: any;
  isDataLoaded?: any;
  isLoading?: any;
  className?: string;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}){

  const { table, setData } = useTanStackTable<InvoiceTableDataType>({
    tableData: ensureArray(data),
    columnConfig: invoiceListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
    },
  });

  useEffect(() => {
    setData(ensureArray(data));
  }
  , [data]);

  return (
    <>
      <Filters table={table} />
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4", className)} >
        <Table
          table={table}
          variant={variant}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter
          table={table}
          isLoading={isLoading}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
