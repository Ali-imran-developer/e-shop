import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import TableFooter from "./footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Button, Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useAppSelector } from "@/hooks/store-hook";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthController from "@/controllers/authController";
import { bookedOrdersColumns } from "./columns";
import CourierControllers from "@/controllers/courierController";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
// import OrderDetails from "./componets/OrderDetails"

export type ProductsDataType = {
  id: string;
  name: string;
  items: string;
  price: number;
  orderDate: string;
  status: string;
  total: number;
};

export default function CreateLoadSheetTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  className,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  data,
  isLoading,
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data?: ProductsDataType[];
  className?: string;
  isLoading?: any;
  paginationClassName?: string;
}) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const session = AuthController.getSession();
  console.log("state?.courierOrders", state?.courierOrders);
  const { table, setData } = useTanStackTable<ProductsDataType>({
    tableData: ensureArray(state?.courierOrders),
    columnConfig: bookedOrdersColumns({ session }),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r: any) => r._id !== row._id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(state?.courierOrders));
  }, [state]);

  // const selectedData = table
  //   .getSelectedRowModel()
  //   .rows.map((row) => row.original);

  // const handleExportData = () => {
  //   exportToCSV(
  //     selectedData,
  //     "ID,Name,Category,Sku,Price,Stock,Status,Rating",
  //     `product_data_${selectedData.length}`
  //   );
  // };
  const createLoadSheet = async (row: any) => {
    setLoading(true);
    try {
      const data = {
        orderIds: row.map((order: { _id: string }) => order._id),
        courierId: row[0]?.tracking?.courier,
      };

      const res = await CourierControllers.generateLoadSheet(data);
      toast.success(res.message);
      navigate(routes.orders.loadSheets);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4 mt-2",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Input
            type="search"
            clearable={true}
            inputClassName="h-[36px]"
            placeholder="Search Orders..."
            onClear={() => table.setGlobalFilter("")}
            value={table.getState().globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2 mb-4"
          />

          {/* <Button className="mb-2">Browser</Button> */}
        </div>
        <Table
          data={data}
          table={table}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={classNames}
        />

        {!hideFooter && (
          <TableFooter
            table={table}
            // onExport={handleExportData}
            createLoadSheet={createLoadSheet}
            isLoading={loading}
          />
        )}
        {!hidePagination && (
          <TablePagination
            table={table}
            className={cn("py-4", paginationClassName)}
          />
        )}
        <hr />
      </div>
    </>
  );
}
