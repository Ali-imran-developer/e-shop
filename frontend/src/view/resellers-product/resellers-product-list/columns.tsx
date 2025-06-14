import { getStatusBadge } from "@shared/components/table-utils/get-status-badge";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Text } from "rizzui";
import AvatarCard from "@/components/ui/avatar-card";
import DateCell from "@/components/ui/date-cell";
import { showProductImages } from "@/utils/helperFunctions/formater-helper";
import PencilIcon from "@/components/icons/pencil";

const columnHelper = createColumnHelper<any>();
export const ListForResaleColumns = ({ setRow, setIsDrawerOpen }: any) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 40,
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
      size: 150,
      header: "Name",
      enableSorting: false,
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
    columnHelper.display({
      id: "sku",
      size: 100,
      header: "Vendor",
      cell: ({ row }) => (
        <Text className="text-sm">{row?.original?.vendor}</Text>
      ),
    }),
    columnHelper.accessor("category", {
      id: "category",
      size: 100,
      header: "Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.category || ""}</Text>
      ),
    }),
    columnHelper.accessor("subCategory", {
      id: "subCategory",
      size: 120,
      header: "Sub Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.subCategory || ""}
        </Text>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      size: 120,
      header: "Created At",
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt || "")} />
      ),
    }),
    columnHelper.display({
      id: "storeName",
      size: 100,
      header: "Store",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.storeName ?? "my-store"}
        </Text>
      ),
    }),
    columnHelper.accessor("channelDetails.name", {
      id: "channelDetails.name",
      size: 120,
      header: "Channels",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.channelDetails?.name || "N/A"}
        </Text>
      ),
    }),
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
      cell: ({ row }) => {
        return (
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Edit Product"
            onClick={() => {
              setIsDrawerOpen(true);
              setRow(row?.original?._id);
            }}
          >
            <PencilIcon className="text-gray-600 w-5 h-5 cursor-pointer" />
          </ActionIcon>
        );
      },
    }),
  ];

  return columns;
};

export const ListedForResaleColumns = () => {
  const columns = [
    columnHelper.accessor("title", {
      id: "title",
      size: 250,
      header: "Product",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <AvatarCard
            src={showProductImages(row?.original)}
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
    columnHelper.accessor("category", {
      id: "category",
      size: 120,
      header: "Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">{row?.original?.category ?? ""}</Text>
      ),
    }),
    columnHelper.accessor("subCategory", {
      id: "subCategory",
      size: 120,
      header: "Sub Category",
      enableSorting: false,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.subCategory ?? ""}
        </Text>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 120,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    // columnHelper.display({
    //   id: "action",
    //   size: 50,
    //   cell: ({ row, table }) => {
    //     const isRowSelected = row.getIsSelected();
    //     const selectedRowCount =
    //       table?.getSelectedRowModel()?.rows?.length || 0;
    //     const isDisabled = selectedRowCount >= 2;

    //     return (
    //       <ActionIcon
    //         as="span"
    //         size="sm"
    //         variant="outline"
    //         aria-label="Edit Product"
    //         // onClick={() => {
    //         //   // if (!isDisabled) {
    //         //   table?.options?.meta?.handleDrawerOpen &&
    //         //     table.options.meta.handleDrawerOpen({
    //         //       status: true,
    //         //       type: "edit",
    //         //       rowData: row.original,
    //         //     });
    //         //   // }
    //         // }}
    //         className={`h-6 w-6 ${
    //           isDisabled
    //             ? "cursor-not-allowed text-gray-400"
    //             : "cursor-pointer text-black"
    //         }`}
    //       >
    //         <PencilIcon className="text-gray-600" />
    //       </ActionIcon>
    //     );
    //   },
    // }),
  ];

  return columns;
};
