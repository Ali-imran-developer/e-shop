import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";
import EyeIcon from "@/components/shared/components/icons/eye";

const columnHelper = createColumnHelper<any>();

export const ResllersColumns = () => {
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
          onChange={() => row.toggleSelected()}
        />
      ),
    }),
    columnHelper.display({
      id: "latestOrder",
      size: 100,
      header: "Latest Order",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700">
            {row?.original?.last_order_name}
          </Text>
        </>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      size: 150,
      header: "Name",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700">
            {row?.original?.addresses[0]?.name}
          </Text>
        </>
      ),
    }),
    columnHelper.display({
      id: "listedProducts",
      size: 150,
      header: "Listed Products",
      cell: ({ row }) => (
        <Text className="font-medium ms-6 text-gray-700">
          {row?.original?.orders_count}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "saleCount",
      size: 150,
      header: "Sale Count",
      cell: ({ row }) => (
        <Text className="font-medium ms-6 text-gray-700">
          {row?.original?.orders_count}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "saleAmount",
      size: 150,
      header: "Sale Amount",
      cell: ({ row }) => (
        <Text className="font-medium ms-6 text-gray-700">
          {row?.original?.orders_count}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "unfulfilledOrdersCount",
      size: 150,
      header: "Unfulfilled Orders Count",
      cell: ({ row }) => (
        <Text className="font-medium ms-6 text-gray-700">
          {row?.original?.orders_count}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "actions",
      size: 90,
      header: "Edit",
      cell: ({ row }) => (
        // <Tooltip size="sm" content="View Item" placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        // </Tooltip>
      ),
    }),
  ];

  return columns;
};
