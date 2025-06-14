import DeletePopover from "@shared/components/delete-popover";
import { getRatings } from "@shared/components/table-utils/get-ratings";
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import { getStockStatus } from "@shared/components/table-utils/get-stock-status";
import { routes } from "@/config/routes";
import { ProductType } from "@/data/products-data";
import EyeIcon from "@shared/components/icons/eye";
import PencilIcon from "@shared/components/icons/pencil";
import AvatarCard from "@ui/avatar-card";
import { createColumnHelper } from "@tanstack/react-table";

import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<any>();

export const productsListColumns = [
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
  columnHelper.accessor("name", {
    id: "name",
    size: 200,
    header: "Product",
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.image}
        name={row.original.name}
        description={row.original.category}
        avatarProps={{
          name: row.original.name,
          size: "lg",
          className: "rounded-lg",
        }}
      />
    ),
  }),
  columnHelper.display({
    id: "sku",
    size: 150,
    header: "SKU",
    cell: ({ row }) => <Text className="text-sm">SKU-{row.original.sku}</Text>,
  }),
  columnHelper.accessor("stock", {
    id: "stock",
    size: 150,
    header: "Stock",
    cell: ({ row }: any) => getStockStatus(row.original.stock),
  }),
  columnHelper.accessor("price", {
    id: "price",
    size: 150,
    header: "Price",
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">Rs. {row.original.price}</Text>
    ),
  }),
  columnHelper.display({
    id: "rating",
    size: 200,
    header: "Rating",
    cell: ({ row }) => getRatings(row.original.rating),
  }),
  columnHelper.accessor("status", {
    id: "status",
    size: 120,
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
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
          <Link to={routes.eCommerce.ediProduct(row.original.id)}>
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
          <Link to={routes.eCommerce.productDetails(row.original.id)}>
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
        {/* <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.original._id} product?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        /> */}
      </Flex>
    ),
  }),
];
