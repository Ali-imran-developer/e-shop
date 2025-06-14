import DateCell from "@/components/ui/date-cell";
import { createColumnHelper } from "@tanstack/react-table";
import { BsPrinter } from "react-icons/bs";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";

const columnHelper = createColumnHelper<any>();
export const loadSheetColumns = () => {
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
    columnHelper.accessor("id", {
      id: "id",
      size: 50,
      header: "Sr#",
      enableSorting: false,
      cell: ({ row }) => {
        return <Text>{row.original.id || ""}</Text>;
      },
    }),
    columnHelper.accessor("challan", {
      id: "challan",
      size: 150,
      header: "Challan#",
      cell: ({ row }) => {
        return <Text>{row.original.challanId || ""}</Text>;
      },
    }),
    columnHelper.accessor("challan-date", {
      id: "challan-date",
      size: 150,
      header: "Challan Date",
      cell: ({ row }) => {
        return <DateCell date={new Date(row.original.challanDate || "N/A")} />;
      },
    }),

    columnHelper.accessor("TotalCOD", {
      id: "TotalCOD",
      size: 100,
      header: "Total COD",
      cell: ({ row }) => {
        return <Text>{row.original.totalCOD || ""}</Text>;
      },
    }),
    columnHelper.accessor("orderCount", {
      id: "orderCount",
      size: 100,
      header: "Order Count",
      cell: ({ row }) => {
        return <Text>{row.original.orderCount || ""}</Text>;
      },
    }),
    columnHelper.accessor("Courier", {
      id: "Courier",
      size: 150,
      header: "Courier",
      enableSorting: false,
      cell: ({ row, table }) => (
        <div className="flex space-x-2">
          <div className="max-w-10">
            <img src={row.original?.courierLogo} alt="courierLogo" />
          </div>
          <Text>{row.original.courierName || ""}</Text>
        </div>
      ),
    }),

    columnHelper.accessor("PrintPerforma", {
      id: "PrintPerforma",
      size: 50,
      header: "Print Performa",

      enableSorting: false,
      cell: ({ row, table }) => (
        <Tooltip size="sm" content="Print Label" placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Print Label"
            className="cursor-pointer"
            onClick={() => table?.options?.meta?.handlePrintLabelSlip?.(row)}
          >
            <BsPrinter className="size-4" />
          </ActionIcon>
        </Tooltip>
      ),
    }),
  ];

  return columns;
};