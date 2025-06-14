import { routes } from '@/config/routes';
import DateCell from '@ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Checkbox, Text, Tooltip } from 'rizzui';
import { getStatusBadge } from '@shared/components/table-utils/get-status-badge';
import { InvoiceTableDataType } from './table';
import { Link } from 'react-router-dom';
import EyeIcon from '@/components/shared/components/icons/eye';

const columnHelper = createColumnHelper<InvoiceTableDataType>();

export const invoiceListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select All"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3"
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  // columnHelper.accessor('id', {
  //   id: 'invoiceID',
  //   size: 200,
  //   header: 'Invoice ID',
  //   enableSorting: true,
  //   cell: ({ row }) => (
  //     <AvatarCard
  //       src={row.original.avatar}
  //       name={row.original.name}
  //       description={`INV-${row.original.id}`}
  //     />
  //   ),
  // }),
  columnHelper.accessor('id', {
    id: 'id',
    size: 100,
    header: 'id',
    cell: ({ row }) => (
      <Text className="text-sm font-medium">INV-{row?.original?.id || "N/A"}</Text>
    ),
  }), 
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 100,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row?.original?.createdAt || "N/A")} />,
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    size: 100,
    header: 'Due Date',
    cell: ({ row }) => <DateCell date={new Date(row?.original?.dueDate || "N/A")} />,
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    size: 100,
    header: 'Amount',
    cell: ({ row }) => (
      <Text className="text-sm font-medium">Rs. {row?.original?.amount || "N/A"}</Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 100,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row?.original?.status || "N/A"),
  }),
  columnHelper.display({
    id: 'actions',
    size: 90,
    cell: ({
      row,
      
    }) => (
      <Tooltip size="sm" content="View Item" placement="top" color="invert">
        <Link to={routes.invoice.details(row.original.id)}>
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
    ),
  }),
];
