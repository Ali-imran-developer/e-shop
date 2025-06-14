import { ordersColumns } from "./columns";
import Table from "@shared/components/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { OrdersDataType } from "@shared/components/order/recent-order";
import { TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";
import { TabList } from "@/components/shared/tabs";
import { useEffect, useState, useTransition } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { useOrders } from "@/hooks/orders-hook";

const filterOptions = [
  {
    value: "in-transit",
    label: "In-Transit",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "return",
    label: "Returned",
  },
];

interface FetchOrdersParams {
  status: string;
  isAssigned?: boolean;
  fulfillmentStatus?: string;
  deliveryStatus?: string;
  page?: number;
  limit?: number;
  startDateIs?: string | null;
  endDateIs?: string | null;
  title?: string;
  searchByCity?: string;
  filterByCity?: string;
}

export default function PickedUpOrderTable({
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
  const initialParams: any = {
    fulfillmentStatus: null,
    status: "in-transit",
    isAssigned: false,
    // deliveryStatus: "not_delivered",
    title: "",
    searchByCity: "",
    filterByCity: "",
    page: 1,
    limit: 50,
    startDate: null,
    endDate: null,
  };
  
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useState<FetchOrdersParams>(initialParams);
  const { data, isDataLoaded } = useAppSelector((state) => state?.Orders);
  const [activeTab, setActiveTab] = useState<string>("in-transit");
  const [selectedStatus, setSelectedStatus] = useState({});
  const { handleGetOrders, loading } = useOrders(params);

  const updateParams = (status: string) => {
    setParams((prev) => ({
      ...prev,
      status: status,
    }));
  };
  // console.log("@@data", data);
  const { table, setData } = useTanStackTable<OrdersDataType>({
    tableData:
      data?.map((item: any) => {
        return {
          ...item,
          items: item?.line_items?.length,
        };
      }) ?? [],
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
        // expandedRowId,
        // setExpandedRowId,
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    setData(
      data?.map((item: any) => {
        return {
          ...item,
          items: item?.line_items?.length,
        };
      })
    );
  }, [data]);

  useEffect(() => {
    const getStatusButton: any = filterOptions.find(
      (item: { value: string }) => item.value === activeTab
    );
    setSelectedStatus(getStatusButton);
    console.log("@getStatusButton", getStatusButton);
  }, [activeTab]);

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
    updateParams(nextTab);
  };
  const [isLoading, setIsLoading] = useState<any>("");
  
  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4",
          className
        )}
      >
        <TabList
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          updateParams={updateParams}
          selectTab={selectTab}
        />
        <Table
          table={table}
          data={data}
          activeTab={activeTab}
          variant={variant}
          showLoadingText={loading}
          isLoading={loading}
          // expandedRowId={expandedRowId}
          // setExpandedRowId={setExpandedRowId}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                table={table}
                selectedStatus={selectedStatus}
                isLoading={isLoading}
                // handleStatusChange={handleStatusChange}
              />
            ),
          }}
        />
        <TableFooter
          table={table}
          buttons={selectedStatus}
          isLoading={isLoading}
          // handleStatusChange={handleStatusChange}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
