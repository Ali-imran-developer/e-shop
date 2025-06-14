import { myOrdersColumns } from "./columns";
import Table from "@shared/components/table/index";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { OrderDataType } from "@shared/components/types/order-type";
import { Input, TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";
import { TabList } from "@/components/shared/tabs";
import { useEffect, useState, useTransition } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { useOrders } from "@/hooks/orders-hook";
import OrdersController from "@/controllers/ordersController";
import toast from "react-hot-toast";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/shared/components/search-input";

interface ResellingOrdersParams {
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

export default function MyOrderTable({
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
    status: "reselling",
    isAssigned: false,
    title: "",
    searchByCity: "",
    filterByCity: "",
    page: 1,
    limit: 50,
    startDate: null,
    endDate: null,
  };
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [params, setParams] = useState<ResellingOrdersParams>(initialParams);
  const [addresses, setAddresses] = useState<any[]>([]);
  const { data } = useAppSelector((state) => state?.Orders) as {data: OrderDataType[];};
  const [activeTab, setActiveTab] = useState<string>("reselling");
  const [isLoading, setIsLoading] = useState("");
  const [assignedOrders, setAssignedOrders] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { handleGetOrders, loading } = useOrders(params);

  function extractValues(obj: any): string {
    let result = "";

    const recurse = (val: any) => {
      if (val == null) return;
      if (
        typeof val === "string" ||
        typeof val === "number" ||
        typeof val === "boolean"
      ) {
        result += ` ${val}`;
      } else if (Array.isArray(val)) {
        val.forEach((item) => recurse(item));
      } else if (typeof val === "object") {
        Object.values(val).forEach((item) => recurse(item));
      }
    };

    recurse(obj);
    return result.toLowerCase();
  }

  useEffect(() => {
    handleGetOrders(params);

  },[])

  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(data),
    columnConfig: myOrdersColumns(),
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
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    setData(ensureArray(data));
  }, [data]);

  useEffect(() => {
    setColumns(myOrdersColumns());
  }, []);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",
          className
        )}
      >
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by any field..."
          onClear={() => table.setGlobalFilter("")}
          value={table.getState().globalFilter ?? ""}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
        />
        <Table
          table={table}
          variant={variant}
          data={data}
          showLoadingText={loading}
          isLoading={loading}
          activeTab={activeTab}
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
          // isLoading={isLoading}
          // handleStatusChange={handleStatusChange}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
