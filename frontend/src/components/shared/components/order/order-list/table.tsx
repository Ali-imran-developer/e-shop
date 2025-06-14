import { ordersColumns } from "./columns";
import { orderData } from "@data/order-data";
import Table from "@shared/components/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { OrdersDataType } from "@shared/components/order/recent-order";
import Filters from "./filters";
import { Flex, TableVariantProps } from "rizzui";
import TableFooter from "../../table/footer";
import cn from "@/utils/helperFunctions/class-names";
import ButtonGroupAction from "../../charts/button-group-action";
import { useAppSelector } from "@/hooks/store-hook";
import { TabList } from "@/components/shared/tabs";
import { useEffect, useState } from "react";

const filterOptions = [
  // {
  //   value: "open",
  //   label: "Open",
  //   // count: 88,
  // },
  {
    value: "paid",
    label: "Paid",
    // count: 88,
  },
  {
    value: "pending",
    label: "Pending",
    // count: 1515,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    // count: 1603,
  },
];

export default function OrderTable({
  className,
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
}: {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const { data, isDataLoaded } = useAppSelector((state) => state?.Orders);
  const [activeTab, setActiveTab] = useState<string | null>("paid");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = activeTab
      ? data?.orders.filter(
          (order: { financial_status: string }) =>
            order.financial_status === activeTab
        )
      : data?.orders ?? [];
    setFilteredData(filterData);
  }, [activeTab, data]);

  const { table, setData } = useTanStackTable<OrdersDataType>({
    // tableData: data?.orders ?? [],
    tableData: filteredData,
    columnConfig: ordersColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
        columnPinning: {
          left: ["expandedHandler"],
          right: ["action"],
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
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4",
          className
        )}
      >
        {!hideFilters && <Filters table={table} />}
        <TabList
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <Table
          table={table}
          variant={variant}
          showLoadingText={isDataLoaded}
          isLoading={isDataLoaded}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: CustomExpandedComponent,
          }}
        />
        <TableFooter table={table} />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
