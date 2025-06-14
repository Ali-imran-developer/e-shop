import { createColumnHelper } from "@tanstack/react-table";
import TableRowActionGroup from "./table-row-actions";
import { Checkbox, Text } from "rizzui";
import AvatarCard from "@/components/ui/avatar-card";
import DateCell from "@/components/ui/date-cell";
import { getStatusBadge } from "../../../../components/shared/components/table-utils/get-status-badge";

const columnHelper = createColumnHelper<any>();

export const SkuMappingColumns = [
  columnHelper.display({
    id: "id",
    size: 200,
    header: "ID",
    cell: ({ row }) => <>{row.original._id}</>,
  }),
  columnHelper.display({
    id: "productId",
    size: 200,
    header: "Product ID",
    cell: ({ row }) => <>{row.original.shopifyProductId}</>,
  }),
  columnHelper.display({
    id: "skuMain",
    size: 200,
    header: "SKU Main",
    cell: ({ row }) => <>{row.original.sku}</>,
  }),
  // columnHelper.accessor("productName", {
  //   id: "productName",
  //   size: 200,
  //   header: "Product Name",
  //   enableSorting: true,
  //   cell: ({ row }) => <>{row.original.productMain[0]?.title}</>,
  // }),
  columnHelper.accessor("Shopify", {
    id: "Shopify",
    size: 200,
    header: "Store 1 (Shopify)",
    enableSorting: true,
    cell: ({ row }) => <>{row.original.shopifyVariantId}</>,
  }),
  columnHelper.display({
    id: "actions",
    size: 100,
    header: "Actions",
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => <TableRowActionGroup row={row.original} />,
  }),
]

export const averageDispatch = [
  columnHelper.display({
    id: 'id',
    size: 60,
    header: ({ table }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
    meta: {
      isColumnDraggable: false,
    },
  }),
  columnHelper.display({
    id: 'id',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <Text>{row.original.id}</Text>
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Origin City',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Destination City',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Courier',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'date',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'COH',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Status',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'In-Process to Dispatch',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'createdAt',
    size: 140,
    header: 'Dispatch to Delivered',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'amount',
    size: 140,
    header: 'Dispatch to Returned',
    cell: ({ row }) => 
    <Text className="font-medium text-gray-700 dark:text-gray-600">
      ${row.original.amount}
    </Text>,
  }),
  columnHelper.display({
    id: 'dueDate',
    size: 140,
    header: 'Returned to Receive Back',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];
