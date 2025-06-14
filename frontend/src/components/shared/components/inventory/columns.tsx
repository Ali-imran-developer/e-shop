import { getStockStatus } from "@shared/components/table-utils/get-stock-status";
import { ProductType } from "@data/products-data";
import AvatarCard from "@ui/avatar-card";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Input, Text } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";

const columnHelper = createColumnHelper<any>();

export const InventoryListColumn = [
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
  columnHelper.accessor("image", {
    id: "name",
    size: 200,
    header: "Name",
    cell: ({ row }) => {
      return (
        <AvatarCard
          name={row?.original?.productMain[0]?.title || "No Title"}
        />
      );
    },
  }),
  columnHelper.display({
    id: "sku",
    size: 150,
    header: "SKU",
    cell: ({ row }) => <Text className="text-sm">{row.original.sku}</Text>,
  }),
  columnHelper.accessor("inventory", {
    id: "unavailable",
    size: 150,
    header: "Unavailable",
    cell: ({ row }) => <Text className="text-sm">{row?.original?.inventoryLevel[0]?.available}</Text>,
  }),
  columnHelper.accessor("inventory", {
    id: "committed",
    size: 150,
    header: "Committed",
    cell: ({ row }) => <Text className="text-sm">{row?.original?.inventoryLevel[0]?.available}</Text>,
  }),
  columnHelper.accessor("inventory", {
    id: "available",
    size: 150,
    header: "Available",
    cell: ({ row }) => {
      // const handleInputChange = (
      //   event: React.ChangeEvent<HTMLInputElement>
      // ) => {
      //   console.log(
      //     `Row ID: ${row.original._id}, Available: ${event.target.value}`
      //   );
      // };

      return (
        <Input
          type="text"
          // defaultValue={row.original.available || ""}
          placeholder="0"
          value={row?.original?.inventoryLevel[0]?.available}
          className={cn("w-full @lg:w-auto")}
          // onChange={handleInputChange}
        />
      );
    },
  }),
  columnHelper.accessor("inventory", {
    id: "onHand",
    size: 150,
    header: "On Hand",
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => {
      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        console.log(
          `Row ID: ${row.original._id}, On Hand: ${event.target.value}`
        );
      };

      return (
        <Input
          type="text"
          // defaultValue={row.original.onHand || ""}
          placeholder="0"
          className={cn("w-full @lg:w-auto")}
          value={row?.original?.inventory_quantity || ""}
          onChange={() =>
            meta?.handleInputChange && meta?.handleInputChange(row.original)
          }
        />
      );
    },
  }),
];
