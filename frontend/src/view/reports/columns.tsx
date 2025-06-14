// Average Dispatch Column
import { routes } from '@/config/routes';
import AvatarCard from "@ui/avatar-card";
import DateCell from "@ui/date-cell";
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text } from 'rizzui';
import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import TableRowActionGroup from "@shared/components/table-utils/table-row-action-group";
const columnHelper = createColumnHelper<any>();

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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
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
  // columnHelper.display({
  //   id: 'actions',
  //   size: 160,
  //   cell: ({
  //     row,
  //     table: {
  //       options: { meta },
  //     },
  //   }) => (
  //     <TableRowActionGroup
  //       editUrl={routes.invoice.edit(row.original.id)}
  //       viewUrl={routes.invoice.details(row.original.id)}
  //       deletePopoverTitle="Delete the invoice"
  //       deletePopoverDescription={`Are you sure you want to delete this #${row.id} invoice?`}
  //       onDelete={() => meta?.handleDeleteRow?.(row.original)}
  //     />
  //   ),
  // }),
];


// Courier Charges Coloumn
export const courierCharges = [
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
    id: 'name',
    size: 240,
    header: 'Courier',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Reference',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Delivery Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Estimated Charges',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Actual Charges',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Difference in Charges',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Action',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Courier Performance Coloumn
export const courierPerformance = [
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
    id: 'name',
    size: 240,
    header: 'Cities',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Post Ex',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'M&P',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Leopard',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'TCS',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Rider',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Call Courier',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Sonic Trax',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Blue Ex',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Other Source',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Daily Activity Coloumn 
export const dailyActivity = [
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
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Cancelled',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Dispatched',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Delivered',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Returned',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Total',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
];


// Daily Order Coloumn
export const dailyOrder = [
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
    id: 'dueDate',
    size: 200,
    header: 'Date',
    cell: ({ row }) => (
      <DateCell date={new Date(row.original.createdAt)} />
    ),
  }),
  columnHelper.display({
    id: 'date',
    size: 240,
    header: 'Pause',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'In-process',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Booked',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Dispatched',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'In Transit',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Cancelled',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Delivered',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Returned',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Total',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
];


// Daraz Finance Coloumn
export const darazFinance = [
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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Line Item',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Unit Price',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Commission',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Payment Fees',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Shipping Fees',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Other Credit',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Actual Fees',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'VAT',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'WHT',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Payout Amount',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Inward Transit Coloumn
export const inwardTransit = [
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
    id: 'name',
    size: 240,
    header: 'Customer',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Referenece',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Dispatched Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Returned Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Current Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Load Charges Coloumn
export const loadColoumn = [
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
    id: 'name',
    size: 240,
    header: 'Load Sheet Number',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Courier',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Time',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Total Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Order Count',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Order Detail Coloumn
export const orderDetail = [
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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Date Time',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Dispatched Date Time',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Customer',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Contact',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Email',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'City',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Product SKU',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Product Price',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Product Discounted Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Product Qty',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Serial Numbers',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Qty of item in the order',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'COD',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Order Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Tags',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Status',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Courier',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'CN no.',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Order Weight',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Order Weight Charged',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Payment Method',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Payment Status',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Delivered / Returned / Cancelled Date Time',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Outward Transit Coloumn
export const outwardTransit = [
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
    id: 'name',
    size: 240,
    header: 'Customer',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Reference',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Dispatched Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Delivered Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Current Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Pending Order Coloumn
export const pendingOrder = [
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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'CN #',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Type',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Booking Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Intransit Since',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Delay Days',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Customer',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'City',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Courier',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Tags',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Amount',
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
];


// Pending Payment Coloumn
export const pendingPayment = [
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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Date',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Delivered Date',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Customer',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Aging Days',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'CN no.',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Courier',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Pending Return Order Coloumn
export const pendingReturnOrder = [
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
    id: 'name',
    size: 240,
    header: 'Order Date',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Returned Date',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Reference',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'CN #',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'City',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Aging Days',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Product Name/SKU',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Status',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Courier',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Tags',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Recuring Customer Coloumn
export const recuringCustomer = [
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
    id: 'name',
    size: 240,
    header: 'Period',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Customer Name',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Contact/Email',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Total Order',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Delivered Order',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Returned Order',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Cancelled Order',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'COH',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Last Order Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Days Since Last Order',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Replacement Order Coloumn
export const replacementOrder = [
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
    id: 'name',
    size: 240,
    header: 'Replacement Order Date',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Regular Order Delivered Date',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Replacement Request',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Replacement Duration Days',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Replacement Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Product (SKU)',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Replacement Product (SKU)',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Delivery Charges',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Status',
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
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Courier',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Return Cancel Coloumn
export const returnCancel = [
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
    id: 'name',
    size: 240,
    header: 'Order Reference',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Order Date',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Cancelled Date / Returned Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Status',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'City',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'name',
    size: 240,
    header: 'Courier',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Delivery Charges',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Order Amount',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Reason',
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
    header: 'Intransit To Returned',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Returned to receive back',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
];


// Selling Channel Coloumn
export const sellingChannel = [
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
    id: 'name',
    size: 240,
    header: 'Selling Channel Name',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Received',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Pending',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Cancelled',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'In Transit',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Delivered',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'Return',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];


// Stock Activity Coloumn
export const stockActivity = [
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
    id: 'name',
    size: 240,
    header: 'SKU (Serial)',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'Product',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Warehouse',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Date',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'In Stock',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'For Sale',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Action',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'From',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'To',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
];


// Stock On Hand Coloumn
export const stockOnHand  = [
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
    id: 'name',
    size: 240,
    header: 'Code',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.avatar}
        name={row.original.name}
        description={`INV-${row.original.id}`}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    size: 240,
    header: 'SKU',
    cell: (info) => info.renderValue()?.toLowerCase(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 200,
    header: 'Serial Number',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'Product',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'WareHouse',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 140,
    header: 'In Stock',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${row.original.amount}
      </Text>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Committed',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 140,
    header: 'For sale',
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),
];
