import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Text } from "rizzui";
import PencilIcon from "@shared/components/icons/pencil";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import AvatarCard from "@/components/ui/avatar-card";

const columnHelper = createColumnHelper<any>();

export const MappedColumns = ({ expandedRowId }: any) => {
  const column = [
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
          {row?.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row?.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row?.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
    columnHelper.accessor("title", {
      id: "title",
      size: 250,
      header: "Product Name",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <AvatarCard
            src={
              ""
            }
            name={row.original.title}
            description={row.original.productType}
            avatarProps={{
              name: row?.original?.title,
              size: "lg",
              className: "rounded-lg",
            }}
          />
        </>
      ),
    }),
    columnHelper.display({
      id: "sku",
      size: 200,
      header: "Product SKU",
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.variants[0]?.sku || "Not available"}
        </Text>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
  ];

  return column;
};

export const UnMappedColumns = ({ expandedRowId }: any) => {
  const column = [
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
          {row?.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row?.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row?.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
    columnHelper.accessor("title", {
      id: "title",
      size: 250,
      header: "Product Name",
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <AvatarCard
            src={
              ""
            }
            name={row.original.title}
            description={row.original.productType}
            avatarProps={{
              name: row?.original?.title,
              size: "lg",
              className: "rounded-lg",
            }}
          />
        </>
      ),
    }),
    columnHelper.display({
      id: "sku",
      size: 200,
      header: "Product SKU",
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.variants[0]?.sku || "Not available"}
        </Text>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
  ];

  return column;
};
