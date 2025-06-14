import DeletePopover from "@shared/components/delete-popover";
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import { routes } from "@config/routes";
import { SalesManagementType } from "@data/salesManagement";
import EyeIcon from "@shared/components/icons/eye";
import PencilIcon from "@shared/components/icons/pencil";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import { getStockStatus } from "../../../components/shared/components/table-utils/get-stock-status";
import { StatusSelect } from "../../../components/shared/components/table-utils/status-select";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import TableAvatar from "@ui/avatar-card";
import ShopifyIcon from "../../../components/shared/components/icons/shopify";
import { image } from "html2canvas/dist/types/css/types/image";

const columnHelper = createColumnHelper<SalesManagementType>();

const statusOptions = [
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
];

export const SalesManagementColumns: any = (expanded: boolean = true) => {
  const column = [
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
      id: "productId",
      size: 110,
      header: "Product ID",
      cell: ({ row }) => row.original.productId,
    }),
    columnHelper.accessor("name", {
      id: "name",
      size: 240,
      header: "Name",
      enableSorting: false,
      cell: ({ row }) => (
        // <Text className="font-medium text-gray-700">{row.original.name}</Text><TableAvatar
        <TableAvatar src={row.original.image} name={row.original.name} />
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      size: 110,
      header: "Price",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          Rs. {row.original.price}
        </Text>
      ),
    }),
    columnHelper.accessor("stock", {
      id: "stock",
      size: 120,
      header: "Stock",
      cell: ({ row }) => getStockStatus(row?.original?.stock),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 120,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    columnHelper.accessor("channel", {
      id: "channel",
      size: 100,
      header: "Channel",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          {row.original.channel === "Shopify" ? (
            <ShopifyIcon className="inline-block w-5" />
          ) : (
            <Text className="font-medium text-gray-700">
              {row.original.channel}
            </Text>
          )}
        </>
      ),
    }),
    columnHelper.accessor("sales", {
      id: "sales",
      size: 100,
      header: "Sales",
      enableSorting: false,
      cell: (info) => (
        <StatusSelect selectItem={info.getValue()} options={statusOptions} />
      ),
    }),
    columnHelper.display({
      id: "action",
      size: 120,
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <Flex align="center" justify="end" gap="3" className="pe-4">
          <Tooltip
            size="sm"
            content={"Edit Product"}
            placement="top"
            color="invert"
          >
            <Link to={routes.products.ediProduct(row.original.productId)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label={"Edit Product"}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={"View Product"}
            placement="top"
            color="invert"
          >
            <Link to={routes.eCommerce.productDetails(row.original.productId)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label={"View Product"}
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the product`}
            description={
              <>
                Are you sure you want to delete this
                <span className="!font-"> {row.original.name} </span>
                product?
              </>
            }
            onDelete={() =>
              meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
            }
          />
        </Flex>
      ),
    }),
  ];
  return expanded ? [expandedOrdersColumns, ...column] : column;
};

const expandedOrdersColumns = columnHelper.display({
  id: "expandedHandler",
  size: 50,
  cell: ({ row }) => (
    <>
      {row.getCanExpand() && (
        <ActionIcon
          size="sm"
          rounded="full"
          aria-label="Expand row"
          className="ms-0"
          variant={row.getIsExpanded() ? "solid" : "outline"}
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <PiCaretUpBold className="size-3.5" />
          ) : (
            <PiCaretDownBold className="size-3.5" />
          )}
        </ActionIcon>
      )}
    </>
  ),
});
