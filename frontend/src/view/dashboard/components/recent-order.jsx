import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import cn from "@/utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Flex, Text } from "rizzui";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { routes } from "@/config/routes";
import { useDispatch } from "react-redux";
import { fetchAllOrders } from "@/store/slices/ordersSlice";

const columnHelper = createColumnHelper();
export const ordersColumns = ({ navigate }) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 50,
      header: ({ table }) => (
        <Checkbox
          className="ps-0"
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          onChange={() => table.toggleAllPageRowsSelected()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ps-0"
          aria-label="Select row"
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
        />
      ),
    }),
    columnHelper.accessor("_id", {
      id: "id",
      size: 100,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name ?? ""}</>,
    }),
    columnHelper.accessor("shipmentDetails.name", {
      id: "shipmentDetails.name",
      size: 150,
      header: "Customer",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <>
          <Flex className="flex-col gap-1 items-start">
            <Text className="font-semibold text-gray-700">
              {row?.original?.shipmentDetails?.name ?? ""}
            </Text>
            <Text className="font-semibold text-gray-500">
              {row?.original?.shipmentDetails?.email ?? ""}
            </Text>
          </Flex>
        </>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 150,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.accessor("lineItems", {
      id: "lineItems",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.products?.length ?? 0}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.shipping", {
      id: "pricing.shipping",
      size: 100,
      header: "Shipping",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.shipping ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.accessor("pricing.totalPrice", {
      id: "pricing.totalPrice",
      size: 100,
      header: "Total",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.totalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.accessor("shipmentDetails.city", {
      id: "shipmentDetails.city",
      size: 100,
      header: "City",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.shipmentDetails?.city ?? ""}
        </Text>
      ),
    }),
  ];

  return columns;
};

export default function OrderTable({
  className,
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { OrderList, isLoading } = useAppSelector((state) => state.Orders);
  console.log("OrderList", OrderList);
  const { table, setData } = useTanStackTable({
    tableData: ensureArray(OrderList),
    columnConfig: ordersColumns({ navigate }),
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
        handleSelectedRow: (row) => {
          console.log("@row", row);
          navigate(routes.orders.createOrder(row._id), {
            state: { selectedOrder: row },
          });
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setData(ensureArray(OrderList));
  }, [OrderList]);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",
          className
        )}
      >
        <Table
          table={table}
          variant={variant}
          showLoadingText={isLoading}
          isLoading={isLoading}
          data={ensureArray(OrderList)}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter table={table} />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
