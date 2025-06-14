import { routes } from "@config/routes";
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import TableRowActionGroup from "@shared/components/table-utils/table-row-action-group";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { PiCaretDownBold, PiCaretUpBold, PiWhatsappLogo } from "react-icons/pi";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import { StatusSelect } from "@/view/dispatch/status-select";
import EyeIcon from "@/components/shared/components/icons/eye";
import { BsPrinter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  ensureArray,
  sanitizePhone,
} from "@/utils/helperFunctions/formater-helper";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

const methodsOptions = [
  { label: "Midnight", value: "Midnight" },
  { label: "Dawn", value: "Dawn" },
  { label: "Weekend-Only", value: "WeekendOnly" },
  { label: "After-Hours", value: "AfterHours" },
  { label: "Scheduled Time-Slot", value: "ScheduledTimeSlot" },
];

const columnHelper = createColumnHelper<any>();
export const confirmOrdersColumns = ({ expandedRowId, addresses }: any) => {
  const columns = [
    columnHelper.display({
      id: "expandedHandler",
      size: 60,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <>
          {row.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
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
    columnHelper.display({
      id: "id",
      size: 100,
      header: "Order Id",
      cell: ({ row }) => <>{row.original.name || "N/A"}</>,
    }),
    columnHelper.accessor("name", {
      id: "customer",
      size: 150,
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
            <PiWhatsappLogo className="h-4 w-4 ml-2" color="green" />
          </Text>
        </>
      ),
    }),
    columnHelper.display({
      id: "items",
      size: 70,
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
    columnHelper.display({
      id: "updatedAt",
      size: 150,
      header: "Date",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "N/A")} />
      ),
    }),
    columnHelper.display({
      id: "city",
      size: 100,
      header: "City",
      cell: ({ row }) => (
        <Text>
          {row?.original?.shipmentDetails?.addresses?.[0]?.city || "N/A"}
        </Text>
      ),
    }),

    // columnHelper.display({
    //   id: "action",
    //   size: 100,
    //   cell: ({
    //     row,
    //     table: {
    //       options: { meta },
    //     },
    //   }) => (
    //     <TableRowActionGroup
    //       editUrl={routes?.eCommerce.editOrder(row?.original?.id)}
    //       viewUrl={routes.eCommerce.orderDetails(row?.original?.id)}
    //       deletePopoverTitle={`Delete the order`}
    //       deletePopoverDescription={`Are you sure you want to delete this #${row.original.id} order?`}
    //       onDelete={() => meta?.handleDeleteRow?.(row.original)}
    //     />
    //   ),
    // }),
  ];

  return columns;
};
