import { createColumnHelper } from "@tanstack/react-table";
import { Text } from "rizzui";

const columnHelper = createColumnHelper<any>();

export const LocationColoumns = () => {
  return [
    columnHelper.accessor("city", {
      id: "city",
      size: 100,
      header: "City",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">{row.original.city}</Text>
      ),
    }),
    columnHelper.accessor("province", {
      id: "province",
      size: 100,
      header: "Province",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">{row.original.province}</Text>
      ),
    }),
    columnHelper.accessor("orders", {
      id: "orders",
      size: 100,
      header: "Orders",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">{row.original.orders.toLocaleString()}</Text>
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      size: 100,
      header: "Amount",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">Rs. {row.original.amount.toLocaleString()}</Text>
      ),
    }),
    columnHelper.accessor("returnRatio", {
      id: "returnRatio",
      size: 100,
      header: "Return Ratio",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">{row.original.returnRatio}</Text>
      ),
    }),
  ];
};
