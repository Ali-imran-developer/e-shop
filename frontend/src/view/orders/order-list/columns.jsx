import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { routes } from "@/config/routes";
import PencilIcon from "@/components/shared/components/icons/pencil";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteOrder, fetchAllOrders } from "@/store/slices/ordersSlice";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";

const columnHelper = createColumnHelper();
export const ordersColumns = ({ navigate }) => {
  const dispatch = useDispatch();
  const handleClick = async (row) => {
    try {
      const res = await dispatch(deleteOrder(row?._id))?.unwrap();
      toast.success(res.message);
      navigate(routes.orders.orders);
      dispatch(fetchAllOrders());
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "An error occurred");
    }
  };

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
      size: 140,
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
    columnHelper.accessor("shipperCity", {
      id: "shipperCity",
      size: 150,
      header: "Shipper City",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.shipperCity ?? ""}
        </Text>
      ),
    }),
    // columnHelper.accessor("paymentMethod", {
    //   id: "paymentMethod",
    //   size: 150,
    //   header: "Payment Type",
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    //   cell: ({ row }) => (
    //     <Text className="font-semibold ms-3 uppercase">
    //       {row?.original?.paymentMethod ?? ""}
    //     </Text>
    //   ),
    // }),
    columnHelper.display({
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({ row, table: { meta } }) => (
        <DeletePopover
          description="Are u really want to delete this order!"
          onDelete={() => handleClick(row?.original)}
        />
      ),
    }),
  ];

  return columns;
};
