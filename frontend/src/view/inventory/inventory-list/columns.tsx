import AvatarCard from "@ui/avatar-card";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Input, Text } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { showProductImages } from "@/utils/helperFunctions/formater-helper";

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
          src={showProductImages(row?.original)}
          name={row.original?.title || ""}
          description={row.original?.category || ""}
          avatarProps={{
            name: row.original?.title || "",
            size: "lg",
            className: "rounded-lg",
          }}
        />
      );
    },
  }),

  columnHelper.accessor("inventory", {
    id: "unavailable",
    size: 150,
    header: "Unavailable",
    cell: ({ row }) => <Text className="text-sm">N/A</Text>,
  }),
  columnHelper.accessor("committed", {
    id: "committed",
    size: 150,
    header: "Committed",
    cell: ({ row }) => <Text className="text-sm">N/A</Text>,
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
          onChange={() =>
            meta?.handleInputChange && meta?.handleInputChange(row.original)
          }
        />
      );
    },
  }),
];
