import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  PiMagnifyingGlassBold,
  PiTrash,
} from "react-icons/pi";
import { Button, Flex, Input } from "rizzui";

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;

  const {
    options: { meta },
  } = table;

  return (
    <Flex align="center" justify="between" className="mb-4">
      <Input
        type="search"
        placeholder="Search..."
        value={table.getState().globalFilter ?? ""}
        onClear={() => table.setGlobalFilter("")}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="size-4" />}
      />

      <Flex align="center" gap="3" className="w-auto">
        {isMultipleSelected ? (
          <Button
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            onClick={() =>
              meta?.handleMultipleDelete &&
              meta.handleMultipleDelete(
                table.getSelectedRowModel().rows.map((r) => r.original.id)
              )
            }
          >
            <PiTrash size={18} />
            Delete
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}