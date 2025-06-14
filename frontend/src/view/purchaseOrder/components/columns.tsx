import { createColumnHelper } from "@tanstack/react-table";
import { Text, Input } from "rizzui";

const columnHelper = createColumnHelper<any>();

export const productsListColumns = [
  columnHelper.accessor("name", {
    id: "name",
    size: 250,
    header: "Products",
    enableSorting: false,
    cell: ({ row }) => {
      return <Text>{row.original.name || ""}</Text>;
    },
  }),
  columnHelper.accessor("sku", {
    id: "sku",
    size: 150,
    header: "Supplier Sku",
    cell: ({ row, table }) => (
      <Input
        value={row.original.sku || ""}
        onChange={(e) => 
          table.options.meta?.handleUpdateData?.(
            row.index,
            'sku',
            e.target.value
          )
        }
        type="text"

      />
    ),
  }),
  columnHelper.accessor("quantity", {
    id: "quantity",
    size: 150,
    header: "Quantity",
    cell: ({ row, table }) => (
      <Input
        value={row.original.quantity || ""}
        onChange={(e) => 
          table.options.meta?.handleUpdateData?.(
            row.index,
            'quantity',
            e.target.value
          )
        }
        type="number"
      />
    ),
  }),
  columnHelper.accessor("cost", {
    id: "cost",
    size: 120,
    header: "Cost",
    enableSorting: false,
    cell: ({ row, table }) => (
      <Input
        value={row.original.cost || ""}
        onChange={(e) => 
          table.options.meta?.handleUpdateData?.(
            row.index,
            'cost',
            e.target.value
          )
        }
        type="number"
        prefix={"Rs."}
      />
    ),
  }),
  columnHelper.accessor("tax", {
    id: "tax",
    size: 120,
    header: "Tax",
    enableSorting: false,
    cell: ({ row, table }) => (
      <Input
        value={row.original.tax || ""}
        onChange={(e) => 
          table.options.meta?.handleUpdateData?.(
            row.index,
            'tax',
            e.target.value
          )
        }
        type="number"
        prefix={"%"}
      />
    ),
  }),
  columnHelper.accessor("total", {
    id: "total",
    size: 120,
    header: "Total",
    cell: ({ row }) => {
      const total = (row.original.quantity || 0) * 
      (row.original.cost || 0) * 
      (1 + (row.original.tax || 0) / 100);
      return <Text>Rs {total.toLocaleString()}</Text>;
    },
  }),
];
