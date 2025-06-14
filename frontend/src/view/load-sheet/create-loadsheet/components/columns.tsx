import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";
import DateCell from "@/components/ui/date-cell";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { ensureArray, sanitizePhone } from "@/utils/helperFunctions/formater-helper";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Text } from "rizzui";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";

const columnHelper = createColumnHelper<any>();

export const bookedOrdersColumns = ({ session }: any) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 50,
      header: ({ table }) => (
        <Checkbox
          className="ps-0"
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          // checked={table.resetRowSelection()}
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
    columnHelper.display({
      id: "id",
      size: 80,
      header: "Order Id",
      cell: ({ row }) => <>{row?.original?.name || ""}</>,
    }),

    columnHelper.accessor("name", {
      id: "customer",
      size: 120,
      header: "Receiver",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700">
            {row?.original?.shipmentDetails?.addresses[0]?.name || "N/A"}
          </Text>
          <Text className="flex font-medium text-xs text-gray-700">
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
    columnHelper.display({
      id: "items",
      size: 100,
      header: "Items",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          {ensureArray(row?.original?.lineItems)?.length}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.currentTotalPrice", {
      id: "pricing.currentTotalPrice",
      size: 150,
      header: "Price",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.currentTotalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      size: 120,
      header: "Date",
      cell: ({ row }) => <DateCell date={new Date(row?.original?.createdAt)} />,
    }),
    columnHelper.display({
      id: "courier",
      size: 120,
      header: "courier",
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700">
            {
              session?.updatedCouriers?.find(
                (item: { _id: string }) =>
                  item._id === row?.original?.tracking?.courier
              )?.name
            }
          </Text>
        </>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
  ];

  return columns;
};
