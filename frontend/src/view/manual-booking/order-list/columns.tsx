import { routes } from "@config/routes";
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import TableRowActionGroup from "@shared/components/table-utils/table-row-action-group";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { PiCaretDownBold, PiCaretUpBold, PiWhatsappLogo } from "react-icons/pi";
import { ActionIcon, Checkbox, Text } from "rizzui";
import { StatusSelect } from "@/components/shared/components/table-utils/status-select";
import {
  ensureArray,
  sanitizePhone,
} from "@/utils/helperFunctions/formater-helper";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";
// import { OrderDataType } from "@/view/orders/order-list/table";

const columnHelper = createColumnHelper<any>();

export const manualOrdersColumns = ({ expandedRowId }: any) => {
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
      cell: ({ row }) => <>{row?.original?.name || ""}</>,
    }),
    columnHelper.accessor("name", {
      id: "name",
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
      size: 150,
      header: "Date",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    // columnHelper.accessor("courier", {
    //   id: "courier",
    //   size: 180,
    //   header: "Courier",
    //   enableSorting: false,
    //   cell: ({
    //     row,
    //     getValue,
    //     table: {
    //       options: { meta },
    //     },
    //   }) => {
    //     return (
    //       <StatusSelect
    //         selectItem={getValue()}
    //         options={row?.original?.couriers}
    //         onChange={(val) =>
    //           meta?.handleSelectedValue &&
    //           meta?.handleSelectedValue(row.original, val)
    //         }
    //       />
    //     );
    //   },
    // }),
    columnHelper.accessor("status", {
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status || "N/A"),
    }),

    columnHelper.display({
      id: "action",
      size: 80,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <TableRowActionGroup
          editUrl={routes?.eCommerce.editOrder(row?.original?._id)}
          viewUrl={routes.eCommerce.orderDetails(row?.original?._id)}
          deletePopoverTitle={`Delete the order`}
          deletePopoverDescription={`Are you sure you want to delete this #${row.original._id} order?`}
          onDelete={() => meta?.handleDeleteRow?.(row.original)}
        />
      ),
    }),
  ];

  return columns;
};
