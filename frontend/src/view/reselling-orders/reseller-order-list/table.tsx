import { ResellingOrderColumn } from "./columns";
import Table from "@shared/components/table/table";
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
import ShipperInfoController from "@/controllers/shipper-info";
import CustomExpandedComponent from "@/components/shared/components/table/custom/expanded-row";

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

export default function ResellingOrdersTable({
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
  const { data } = useAppSelector((state) => state?.Orders) as {
    data: OrderDataType[];
  };
  const [activeTab, setActiveTab] = useState<string>("reselling");
  const [isLoading, setIsLoading] = useState("");
  const [assignedOrders, setAssignedOrders] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { handleGetOrders, loading } = useOrders(params);
  const [expandedRowId, setExpandedRowId] = useState<any>(null);

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
    const getAllShipperInfo = async () => {
      await ShipperInfoController.getAllShipperInfo()
        .then((res) => {
          setAddresses(res);
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(error?.message);
        });
    };
    getAllShipperInfo();
  }, [activeTab]);

  const { table, setData, setColumns } = useTanStackTable<OrderDataType>({
    tableData: ensureArray(data),
    // columnConfig: [],
    columnConfig: ResellingOrderColumn({ expandedRowId, navigate }),
    options: {
      globalFilterFn: (row, columnId, filterValue) => {
        const rowString = extractValues(row.original);
        return rowString.includes(filterValue.toLowerCase());
      },
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
        handleSelectedRow: (row) => {
          console.log("@row", row);
          navigate(routes.orders.orderDetail(row._id), {
            state: { selectedOrder: row },
          });
        },
        handleSelectedShippingInfo: async (
          row: any,
          selectedValue: {
            shipperId: string;
          }
        ) => {
          setAssignedOrders((prevAssignedOrders: any) => {
            const existingIndex = prevAssignedOrders.findIndex(
              (assigned: any) => assigned.orderId === row._id
            );
            if (existingIndex !== -1) {
              const updatedOrders = [...prevAssignedOrders];
              updatedOrders[existingIndex].orderId = row._id;
              updatedOrders[existingIndex].shipperId =
                selectedValue?.["shipperId"];

              return updatedOrders;
            } else {
              return [
                ...prevAssignedOrders,
                {
                  shipperId: selectedValue?.["shipperId"],
                  orderId: row._id,
                },
              ];
            }
          });
        },
        handleSelectRow: (row) => {
          if (expandedRowId === row?.original?._id) {
            setExpandedRowId(null);
          } else {
            setExpandedRowId(row?.original?._id);
          }
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    handleGetOrders(params);
  }, []);

  useEffect(() => {
    setData(ensureArray(data));
    setExpandedRowId(null);
  }, [data]);

  useEffect(() => {
    setColumns(ResellingOrderColumn({ expandedRowId, navigate }));
  }, [expandedRowId]);

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
          data={data}
          table={table}
          variant={variant}
          showLoadingText={loading}
          isLoading={loading}
          activeTab={activeTab}
          expandedRowId={expandedRowId}
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
                // handleStatusChange={handleOrdersChange}
              />
            ),
          }}
        />
        <TableFooter
          table={table}
          buttons={selectedStatus}
          isLoading={isLoading}
          // handleStatusChange={handleOrdersChange}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
