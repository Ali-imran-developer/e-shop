import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import { getStockStatus } from "@/components/shared/components/table-utils/get-stock-status";
import AvatarCard from "@/components/ui/avatar-card";
import PencilIcon from "@/components/icons/pencil";
import DateCell from "@/components/ui/date-cell";
import ShopifyIcon from "@/components/shared/components/icons/shopify";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

const columnHelper = createColumnHelper<any>();

export const ListProductColumns = () => {
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
    columnHelper.accessor("title", {
      id: "title",
      size: 250,
      header: "Product",
      enableSorting: false,
      cell: ({ row }) => {
        // const variants = ensureArray(row?.original?.variants);
        // const images = ensureArray(row?.original?.images);
        // const variantImageIds = ensureArray(variants)
        //   ?.map((variant: any) => variant?.imageId)
        //   ?.filter(Boolean);
        // const productImages = ensureArray(images)?.filter(
        //   (image: any) => image?.id && !variantImageIds?.includes(image?.id)
        // );
        // const imageUrl = ensureArray(productImages)[0]?.url;
        // const productImageSrc = imageUrl
        //   ? `https://static.shopilam.com/${imageUrl}`
        //   : "";
        return (
          <AvatarCard
            src={""}
            name={row.original?.title || ""}
            description={row.original?.productType || ""}
            avatarProps={{
              name: row.original?.title || "",
              size: "lg",
              className: "rounded-lg",
            }}
          />
        );
      },
    }),
    columnHelper.display({
      id: "sku",
      size: 150,
      header: "Vendor",
      cell: ({ row }) => <Text className="text-sm">{row.original.vendor}</Text>,
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      size: 150,
      header: "Created At",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    columnHelper.accessor("productType", {
      id: "productType",
      size: 120,
      header: "Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.productType || "N/A"}
        </Text>
      ),
    }),
    // columnHelper.accessor("channelDetails.name", {
    //   id: "channelDetails.name",
    //   size: 120,
    //   header: "Channels",
    //   enableSorting: false,
    //   cell: ({ row }) => (
    //     <Text className="font-semibold">
    //       {row?.original?.channelDetails?.name || "N/A"}
    //     </Text>
    //   ),
    // }),
    columnHelper.accessor("status", {
      id: "status",
      size: 120,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    columnHelper.display({
      id: "action",
      size: 50,
      cell: ({ row, table }) => {
        const isRowSelected = row.getIsSelected();
        const selectedRowCount =
          table?.getSelectedRowModel()?.rows?.length || 0;
        const isDisabled = selectedRowCount >= 2;

        return (
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Edit Product"
            onClick={() => {
              // if (!isDisabled) {
              table?.options?.meta?.handleDrawerOpen &&
                table.options.meta.handleDrawerOpen({
                  status: true,
                  type: "edit",
                  rowData: row.original,
                });
              // }
            }}
            className={`h-6 w-6 ${
              isDisabled
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-black"
            }`}
          >
            <PencilIcon className="text-gray-600" />
          </ActionIcon>
        );
      },
    }),
  ];

  return columns;
};
