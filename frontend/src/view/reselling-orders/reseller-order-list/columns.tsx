import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";
import EyeIcon from "@/components/shared/components/icons/eye";
import { PiCaretDownBold, PiCaretUpBold, PiWhatsappLogo } from "react-icons/pi";
import { OrderDataType } from "@/components/shared/components/types/order-type";
import { sanitizePhone } from "@/utils/helperFunctions/formater-helper";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";
import { StatusSelect } from "@/view/dispatch/status-select";
import { routes } from "@/config/routes";
import TableRowActionGroup from "@/components/shared/components/table-utils/table-row-action-group";

const columnHelper = createColumnHelper<any>();

export const ResellingOrderColumn = ({ expandedRowId, addresses }: any) => {
  const columns = [
    columnHelper.display({
      id: "expandedHandler",
      size: 30,
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
      size: 30,
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
    columnHelper.display({
      id: "updatedAt",
      size: 150,
      header: "Date",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "N/A")} />
      ),
    }),
    columnHelper.accessor("name", {
      id: "customer",
      size: 80,
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
      id: "offerPrice",
      size: 120,
      header: "Offer Price",
      cell: ({ row }) => (
        <Text className="font-medium text-center text-gray-700">
          Rs. {row?.original?.offerPrice ?? 0}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "cod",
      size: 100,
      header: "COD",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          Rs. {row?.original?.cod ?? 0}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "city",
      size: 100,
      header: "City",
      cell: ({ row }) => (
        <Text>
          {row?.original?.shipmentDetails?.addresses?.[0]?.city?.city || "N/A"}
        </Text>
      ),
    }),
    columnHelper.accessor("shippingMethod", {
      size: 120,
      header: "Method",
      cell: ({ row }) => {
        return <Text>{row?.original?.shippingMethod ?? "N/A"}</Text>;
      },
    }),
    columnHelper.accessor("shippingInfo", {
      size: 90,
      header: "Shipper Info",
      cell: ({ row }) => {
        return <Text>{row?.original?.shipperInfo?.name || "N/A"}</Text>;
      },
    }),
    columnHelper.display({
      id: "deliveryStatus",
      size: 100,
      header: "Delivery status",
      enableSorting: false,
      cell: ({ row }) => <Text>{row?.original?.deliveryStatus ?? "N/A"}</Text>,
    }),
    columnHelper.display({
      id: "action",
      size: 100,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <TableRowActionGroup
          editUrl={routes?.eCommerce.editOrder(row?.original?.id)}
          viewUrl={routes.eCommerce.orderDetails(row?.original?.id)}
          deletePopoverTitle={`Delete the order`}
          deletePopoverDescription={`Are you sure you want to delete this #${row.original.id} order?`}
          onDelete={() => meta?.handleDeleteRow?.(row.original)}
        />
      ),
    }),
  ];

  return columns;
};
