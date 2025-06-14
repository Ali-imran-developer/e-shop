import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const InventoryColumns = [
  columnHelper.display({
    id: "skuMain",
    size: 100,
    header: "SKU Number",
    cell: ({ row }) => <>{row.original.sku}</>,
  }),
  columnHelper.accessor("productName", {
    id: "productName",
    size: 150,
    header: "Product Name",
    enableSorting: true,
    cell: ({ row }) => <>{row.original.productMain[0]?.title}</>,
  }),
  columnHelper.accessor("productName", {
    id: "productName",
    size: 150,
    header: "Inventory",
    enableSorting: true,
    cell: ({ row }) => <>{row.original.productMain[0]?.title}</>,
  }),
  columnHelper.accessor("Shopify", {
    id: "Shopify",
    size: 150,
    header: "Store 1 (Shopify)",
    enableSorting: true,
    cell: ({ row }) => <>{row.original.shopifyVariantId}</>,
  }),
  columnHelper.accessor("Shopify", {
    id: "Shopify",
    size: 150,
    header: "Store 2 (Shopify)",
    enableSorting: true,
    cell: ({ row }) => <>{row.original.shopifyVariantId}</>,
  }),
]
