import AvatarCard from "@components/ui/avatar-card";
import DateCell from "@components/ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge, Checkbox, Flex, Text } from "rizzui";
import { UsersTableDataType } from "./index";
import { getStatusBadge } from "@components/shared/components/table-utils/get-status-badge";
import TableRowActionGroup from "@components/shared/components/table-utils/table-row-action-group";

const columnHelper = createColumnHelper<UsersTableDataType>();

export const usersColumns = [
  columnHelper.display({
    id: "select",
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-0"
        aria-label="Select all Rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-0"
        aria-label="Select Row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),

  columnHelper.display({
    id: "id",
    size: 200,
    header: "User ID",
    cell: ({ row }) => <>#{row?.original?._id}</>,
  }),
  columnHelper.accessor("name", {
    id: "name",
    size: 100,
    header: "Name",
    enableSorting: false,
    cell: ({ row }) => (
      <Text>{row?.original?.name || "N/A"}</Text>
    ),
  }),
  // columnHelper.accessor("role", {
  //   id: "role",
  //   size: 150,
  //   header: "Role",
  //   cell: ({ row }) => row.original.role,
  // }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    size: 200,
    header: "Created",
    cell: ({ row }) => <DateCell date={new Date(row?.original?.createdAt || "N/A")} />,
  }),
  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    size: 200,
    header: "Updated",
    cell: ({ row }) => <DateCell date={new Date(row?.original?.updatedAt || "N/A")} />,
  }),
  columnHelper.display({
    id: "permissions",
    size: 150,
    header: "Permissions",
    cell: ({ row }) => (
      <Flex align="center" gap="2">
        {(row?.original?.permissions ?? []).length > 0 ? (
          row?.original?.permissions?.map((permission: any) => (
            <Badge
              rounded="lg"
              key={permission}
              variant="outline"
              className="border-muted font-normal text-gray-500"
            >
              {permission}
            </Badge>
          ))
        ) : (
          <Badge
            rounded="lg"
            variant="outline"
            className="border-muted font-normal text-gray-500"
          >
            N/A
          </Badge>
        )}
      </Flex>
    ),
  }),  
  // columnHelper.accessor("status", {
  //   id: "status",
  //   size: 150,
  //   header: "Status",
  //   enableSorting: false,
  //   cell: ({ row }) => getStatusBadge(row.original.status),
  // }),
  columnHelper.display({
    id: "action",
    size: 140,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableRowActionGroup
        deletePopoverTitle={`Delete this user`}
        deletePopoverDescription={`Are you sure you want to delete this #${row.original._id} user?`}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
