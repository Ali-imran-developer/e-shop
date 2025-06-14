import DateCell from "@ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Checkbox, Flex, Select, Text, Tooltip } from "rizzui";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import { deleteOrder, fetchAllOrders } from "@/store/slices/ordersSlice";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { getStatusBadge } from "@/components/shared/components/table-utils/get-status-badge";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { StatusSelect } from "@/view/dispatch/status-select";
import { BsPrinter } from "react-icons/bs";

type OrderRow = {
  _id: string;
  name?: string;
  shipmentDetails?: {
    name?: string;
    email?: string;
  };
  createdAt?: string;
  products?: any[];
  pricing?: {
    shipping?: number;
    totalPrice?: number;
  };
  shipperCity?: string;
  status?: string;
  [key: string]: any;
};

const CourierMethods = [
  { label: "Midnight", value: "Midnight" },
  { label: "Dawn", value: "Dawn" },
  { label: "Weekend-Only", value: "WeekendOnly" },
  { label: "After-Hours", value: "AfterHours" },
  { label: "Scheduled Time-Slot", value: "ScheduledTimeSlot" },
];

const columnHelper = createColumnHelper<OrderRow>();
export const confirmOrdersColumns = ({
  formik,
  navigate,
  expandedRowId,
  dispatch,
  selectedCouriers,
  setSelectedMethod,
  setSelectedCouriers,
  setSelectedShipper,
}: any) => {
  const handleClick = async (row: OrderRow) => {
    try {
      const res = await dispatch(deleteOrder(row?._id))?.unwrap();
      toast.success(res.message);
      navigate(routes.orders.orders);
      dispatch(fetchAllOrders());
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const columns = [
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
          {row.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
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
      id: "id",
      size: 100,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name ?? ""}</>,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 120,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.display({
      id: "courier",
      header: "Courier",
      size: 140,
      enableSorting: false,
      cell: ({ row }) => {
        const courierData = ensureArray(row?.original?.courierInfo);
        const courierOptions = ensureArray(courierData)?.map((item: any) => ({
          value: item.courierId,
          label: item.courierName,
        }));
        return (
          <StatusSelect
            placeholder="Select Courier"
            onChange={(val) => setSelectedCouriers(val)}
            options={courierOptions}
          />
        );
      },
    }),
    columnHelper.display({
      id: "shippingMethod",
      header: "Shipping Method",
      size: 140,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <StatusSelect
            placeholder="Select Method"
            options={CourierMethods}
            onChange={(value) => setSelectedMethod(value)}
          />
        );
      },
    }),
    columnHelper.display({
      id: "shipperId",
      header: "Shipping Info",
      size: 140,
      enableSorting: false,
      cell: ({ row }) => {
        const shipperData = row?.original?.shipperInfo;
        const shipperOptions = ensureArray(shipperData)?.map((item: any) => ({
          label: item?.shipperCity,
          value: item?.shipperId,
        }));
        return (
          <StatusSelect
            placeholder="Select Shipper"
            options={shipperOptions}
            onChange={(value) => setSelectedShipper(value)}
          />
        );
      },
    }),
    columnHelper.display({
      id: "shipping",
      size: 120,
      header: "Shipping",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.shipping ?? 0;
        return (
          <Text className="font-medium text-gray-700 ms-3">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: "totalPrice",
      size: 120,
      header: "Total Price",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.totalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700 ms-3">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
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
        <DeletePopover
          description="Are u really want to delete this order!"
          onDelete={() => handleClick(row?.original)}
        />
      ),
    }),
  ];

  return columns;
};

export const bookedOrdersColumns = ({ expandedRowId }: any) => {
  const columns = [
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
          {row.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
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
      id: "id",
      size: 100,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name ?? ""}</>,
    }),
    columnHelper.accessor("shipmentDetails.name", {
      id: "shipmentDetails.name",
      size: 150,
      header: "Customer",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <>
          <Flex className="flex-col gap-1 items-start">
            <Text className="font-semibold text-gray-700">
              {row?.original?.shipmentDetails?.name ?? ""}
            </Text>
            <Text className="font-semibold text-gray-500">
              {row?.original?.shipmentDetails?.email ?? ""}
            </Text>
          </Flex>
        </>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 120,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.accessor("lineItems", {
      id: "lineItems",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.products?.length ?? 0}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.totalPrice", {
      id: "pricing.totalPrice",
      size: 100,
      header: "Total",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.totalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: "courier",
      size: 140,
      header: "Courier",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const image = row?.original?.courier?.logo ?? "";
        const courierName = row.original?.courier?.name ?? "";
        return (
          <Flex className="items-center gap-1">
            <img
              src={image}
              alt={courierName}
              className="w-10 h-10 rounded-md"
            />
            <Text className="font-semibold">{courierName}</Text>
          </Flex>
        );
      },
    }),
    columnHelper.display({
      id: "trackingId",
      size: 150,
      header: "Tracking",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-semibold text-blue-600 cursor-pointer">
          {row?.original?.trackingId ? row?.original?.trackingId : ""}
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
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <Tooltip size="sm" content="Print Label" placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Print Label"
            onClick={() =>
              meta?.handlePrintOrderSlip &&
              meta?.handlePrintOrderSlip(row?.original)
            }
          >
            <BsPrinter className="w-4 h-4" />
          </ActionIcon>
        </Tooltip>
      ),
    }),
  ];

  return columns;
};

export const cancelledOrders = ({ expandedRowId }: any) => {
  const columns = [
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
          {row.getCanExpand() && (
            <ActionIcon
              size="sm"
              rounded="full"
              aria-label="Expand row"
              className="ms-0"
              variant={
                row.original?._id === expandedRowId ? "solid" : "outline"
              }
              onClick={() =>
                meta?.handleSelectRow && meta?.handleSelectRow(row)
              }
            >
              {row.original?._id === expandedRowId ? (
                <PiCaretUpBold className="size-3.5" />
              ) : (
                <PiCaretDownBold className="size-3.5" />
              )}
            </ActionIcon>
          )}
        </>
      ),
    }),
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
      id: "id",
      size: 100,
      header: "Order Id",
      enableGlobalFilter: true,
      cell: ({ row }) => <>{row?.original?.name ?? ""}</>,
    }),
    columnHelper.accessor("shipmentDetails.name", {
      id: "shipmentDetails.name",
      size: 150,
      header: "Customer",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <>
          <Flex className="flex-col gap-1 items-start">
            <Text className="font-semibold text-gray-700">
              {row?.original?.shipmentDetails?.name ?? ""}
            </Text>
            <Text className="font-semibold text-gray-500">
              {row?.original?.shipmentDetails?.email ?? ""}
            </Text>
          </Flex>
        </>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 120,
      header: "Order Date",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <DateCell date={new Date(row?.original?.createdAt ?? "")} />
      ),
    }),
    columnHelper.accessor("lineItems", {
      id: "lineItems",
      size: 100,
      header: "Items",
      enableGlobalFilter: true,
      cell: ({ row }) => (
        <Text className="font-medium text-gray-700 ms-3">
          {row?.original?.products?.length ?? 0}
        </Text>
      ),
    }),
    columnHelper.accessor("pricing.totalPrice", {
      id: "pricing.totalPrice",
      size: 100,
      header: "Total",
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const price = row?.original?.pricing?.totalPrice ?? 0;
        return (
          <Text className="font-medium text-gray-700">
            Rs. {formatNumberWithCommas(Math.floor(price))}
          </Text>
        );
      },
    }),
    // columnHelper.display({
    //   id: "trackingId",
    //   size: 150,
    //   header: "Tracking",
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    //   cell: ({ row }) => (
    //     <Text className="font-semibold text-blue-600 cursor-pointer">
    //       {row?.original?.trackingId ? row?.original?.trackingId : ""}
    //     </Text>
    //   ),
    // }),
    columnHelper.display({
      id: "status",
      size: 100,
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row?.original?.status ?? ""),
    }),
    // columnHelper.display({
    //   id: "actions",
    //   size: 50,
    //   cell: ({ row }) => <BsPrinter className="w-4 h-4" />
    // }),
  ];

  return columns;
};
