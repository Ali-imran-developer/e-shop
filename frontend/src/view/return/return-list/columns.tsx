import { routes } from "@config/routes";
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";
import EyeIcon from "@/components/shared/components/icons/eye";
import { useNavigate } from "react-router-dom";
import { PiCaretDownBold, PiCaretUpBold, PiWhatsappLogo } from "react-icons/pi";
import { ensureArray, sanitizePhone } from "@/utils/helperFunctions/formater-helper";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

const columnHelper = createColumnHelper<any>();

export const ordersColumns = (expanded = false) => {
  const navigate = useNavigate();
  const handleOrderClick = (order: any) => {
    navigate(routes.orders.orderDetail(order._id), {
      state: { selectedOrder: order },
    });
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
          // checked={checkedOrders[row.original.orderId] && row.getIsSelected()}
          onChange={() => row.toggleSelected()}
          // onChange={(e) => {
          //   row.toggleSelected();
          //   handleCheckboxChange(row.original.orderId, e.target.checked);
          // }}
        />
      ),
    }),
    columnHelper.display({
      id: "id",
      size: 120,
      header: "Order Id",
      cell: ({ row }) => <>{row?.original?.name || ""}</>,
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
      size: 150,
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
      size: 200,
      header: "Order Date",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 140,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    columnHelper.display({
      id: "actions",
      size: 90,
      cell: ({ row }) => (
        <Tooltip size="sm" content="View Item" placement="top" color="invert">
          {/* <Link to={routes.orders.orderDetail(row.original.line_items[0].id)}> */}
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
            onClick={() => handleOrderClick(row.original)}
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
          {/* </Link> */}
        </Tooltip>
      ),
    }),
  ];

  return expanded ? [...columns] : columns;
};
