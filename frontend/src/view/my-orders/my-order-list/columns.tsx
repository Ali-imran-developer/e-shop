import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";
import { OrderDataType } from "@/components/shared/components/types/order-type";
import { sanitizePhone } from "@/utils/helperFunctions/formater-helper";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";
import PencilIcon from "@/components/shared/components/icons/pencil";

const columnHelper = createColumnHelper<OrderDataType>();
export const myOrdersColumns = () => {
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
      size: 120,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name || ""}</>,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 150,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      size: 150,
      header: "Receiver",
      enableSorting: false,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700 mt-2">
            {row?.original?.shipmentDetails?.addresses[0]?.name || "N/A"}
          </Text>
          <Text className="flex items-center gap-1 font-medium text-xs text-gray-700">
            {sanitizePhone(
              row?.original?.shipmentDetails?.addresses[0]?.phone
            ) || ""}
            <WhatsAppButton
              phoneNumber={row?.original?.shipmentDetails?.addresses[0]?.phone}
              className="size-4"
            />
          </Text>
        </>
      ),
    }),
    columnHelper.accessor("lineItems", {
      id: "lineItems",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.lineItems?.length || 0}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.profit", {
      id: "pricing.profit",
      size: 100,
      header: "Profit",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.pricing?.profit ?? 0}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.currentTotalPrice", {
      id: "pricing.currentTotalPrice",
      size: 150,
      header: "Price",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        console.log("Order Data", row.original)
        const price = row?.original?.pricing?.currentTotalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    // columnHelper.display({
    //   id: "actions",
    //   size: 50,
    //   cell: ({ row, table: { meta } }: any) => (
    //     <Tooltip size="sm" content="Edit Order" placement="top" color="invert">
    //       <ActionIcon
    //         as="span"
    //         size="sm"
    //         variant="outline"
    //         aria-label="View item"
    //         className="cursor-pointer"
    //       >
    //         <PencilIcon className="size-4" />
    //       </ActionIcon>
    //     </Tooltip>
    //   ),
    // }),
  ];

  return columns;
};
