import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
// import { ShipperInfoType } from "./shipper-info";
import PencilIcon from "@/components/shared/components/icons/pencil";
import ShipperInfoController from "@/controllers/shipper-info";
import toast from "react-hot-toast";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { deleteShipper, fetchAllShipper } from "@/store/slices/shipperSlice";

const columnHelper = createColumnHelper<any>();

export const ShipperInfoColumn = ({ navigate, dispatch }: any) => {
  const handleEditAddress = (address: any) => {
    console.log("test2", address?._id);
    navigate(`/add-shipper-info`, {
      state: { address, shipperInfo: "edit" },
    });
  };

  const handleDelete = async (row: any) => {
    try {
      const response = await dispatch(deleteShipper(row._id)).unwrap();
      toast.success(response.message);
      dispatch(fetchAllShipper());
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
    columnHelper.display({
      id: "name",
      size: 120,
      header: "Name",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.storeName ?? ""}</>,
    }),
    columnHelper.display({
      id: "contact",
      size: 150,
      header: "Contact",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.phoneNumber || ""}</Text>,
    }),
    columnHelper.display({
      id: "address",
      size: 150,
      header: "Address",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.address || ""}</Text>,
    }),
    columnHelper.display({
      id: "location",
      size: 150,
      header: "Location",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.locationName || ""}</Text>,
    }),
    columnHelper.display({
      id: "city",
      size: 150,
      header: "City (Origin)",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.city || ""}</Text>,
    }),
    columnHelper.display({
      id: "returnAddress",
      size: 150,
      header: "Return Address:",
      enableGlobalFilter: true,
      cell: ({ row }) => <Text>{row?.original?.returnAddress || ""}</Text>,
    }),
    columnHelper.display({
      id: "actions",
      size: 50,
      cell: ({ row }) => (
        <>
          <Flex className="items-center gap-2">
            <Tooltip
              size="sm"
              content="Edit Shipper"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Shipper"
                className="cursor-pointer"
                onClick={() => handleEditAddress(row?.original)}
              >
                <PencilIcon className="h-4 w-4 cursor-pointer" />
              </ActionIcon>
            </Tooltip>
            <DeletePopover
              onDelete={() => handleDelete(row?.original)}
              description="Are u really want to delete this shipper info!"
            />
          </Flex>
        </>
      ),
    }),
  ];

  return columns;
};
