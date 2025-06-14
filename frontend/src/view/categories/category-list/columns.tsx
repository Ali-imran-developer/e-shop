import { createColumnHelper } from "@tanstack/react-table";
import { Avatar, Checkbox, Flex, Text } from "rizzui";
import toast from "react-hot-toast";
import categoriesController from "@/controllers/categories";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import DateCell from "@/components/ui/date-cell";
import { useAppDispatch } from "@/hooks/store-hook";
import {
  deleteCategory,
  fetchAllCategory,
} from "@/store/slices/categoriesSlice";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";

const columnHelper = createColumnHelper<any>();
export const CategoriesColumns = () => {
  const dispatch = useAppDispatch();
  const removeCategories = async (val: any) => {
    try {
      await dispatch(deleteCategory(val._id));
      toast.success("Category deleted successfully");
      dispatch(fetchAllCategory());
    } catch (error: any) {
      toast.error(error.message || "Error deleting category");
      console.error("Delete error:", error);
    }
  };

  const columns = [
    columnHelper.display({
      id: "select",
      size: 20,
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
    columnHelper.display({
      id: "categoryName",
      size: 150,
      header: "Category Name",
      cell: ({ row }) => (
        <>
          <Flex className="gap-2 items-center">
            <Avatar
              name={row?.original?.name ?? ""}
              src={row?.original?.avatar ?? ""}
            />
            <Text className="font-semibold">{row?.original?.name ?? ""}</Text>
          </Flex>
        </>
      ),
    }),
    columnHelper.display({
      id: "createdAt",
      size: 100,
      header: "Created At",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "updatedAt",
      size: 100,
      header: "Updated At",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.updatedAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "items",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold ms-3">
          {row?.original?.subCategory.length ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "description",
      size: 150,
      header: "Description",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold">
          {row?.original?.description ?? ""}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({ row }) => (
        <>
          <DeletePopover
            onDelete={() => removeCategories(row?.original)}
            description="Are u really want to delete this category!"
          />
        </>
      ),
    }),
  ];

  return columns;
};
