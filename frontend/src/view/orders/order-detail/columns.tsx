import { createColumnHelper } from "@tanstack/react-table";
import TableAvatar from "@ui/avatar-card";
import { ActionIcon, Avatar, Text } from "rizzui";
import { toCurrency } from "@utils/helperFunctions/to-currency";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

export interface LineItem {
  id: string;
  product_id: string;
  title: string;
  quantity: number;
  price: string;
  image?: string;
  name?: string;
  total?: string;
  sku?: string;
  _id?: any;
  vendor?: string;
}

const columnHelper = createColumnHelper<LineItem>();

export const ordersDetailColumns = ({ expandedRowId }: any) => {
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
      id: "photo",
      size: 100,
      header: "Photo",
      cell: ({ row }) => (
        <Avatar
          src={row?.original?.image || ""}
          name={row?.original?.name || ""}
        />
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      size: 200,
      header: "Name",
      cell: ({ row }) => (
        <>
          <Text className="font-medium text-gray-700">
            {row?.original?.name || ""}
          </Text>
          <Text className="font-medium text-xs text-gray-700">
            {row?.original?.vendor || ""}
          </Text>
        </>
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      size: 100,
      header: "Price",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700">
          Rs. {Number(row?.original?.price || 0)}
        </Text>
      ),
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      size: 150,
      header: "Quantity",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 text-start ps-6 text-sm">
          {row?.original?.quantity || 0}
        </Text>
      ),
    }),
    columnHelper.accessor("total", {
      id: "total",
      size: 150,
      header: "Total",
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 text-start text-sm">
          Rs.{" "}
          {Number(row?.original?.price || 0) * (row?.original?.quantity || 0)}
        </Text>
      ),
    }),
  ];
  return columns;
};
