import { ShipperInfoColumn } from "./columns";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { OrderDataType } from "@shared/components/types/order-type";
import { Button, TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useEffect, useState } from "react";
import TableFooter from "@/components/shared/components/table/footer";
import toast from "react-hot-toast";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { routes } from "@/config/routes";
import { useNavigate } from "react-router-dom";
import ShipperInfoController from "@/controllers/shipper-info";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { fetchAllShipper } from "@/store/slices/shipperSlice";

export interface ShipperInfoType {
  _id?: string;
  labelStoreName?: string;
  phoneNumber?: string;
  locationName?: string;
  city?: string;
  returnAddress?: string;
  address?: string;
  storeId: string;
  onClose?: any;
}

export default function OrderTable({
  className,
  variant = "modern",
  hidePagination = false,
}: {
  className?: string;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllShipper());

  },[dispatch])

  const { shipperList, isLoading } = useAppSelector((state) => state.Shipper);
  const { table, setData } = useTanStackTable<any>({
    tableData: ensureArray(shipperList),
    columnConfig: ShipperInfoColumn({ navigate, dispatch }),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
        columnPinning: {
          left: ["expandedHandler"],
          right: ["action"],
        },
      },
      meta: {
        handleSelectedRow: (row) => {
          console.log("@row", row);
          navigate(routes.orders.orderDetail(row._id), {
            state: { selectedOrder: row },
          });
        },
      },
      enableColumnResizing: false,
      getRowCanExpand: () => true,
    },
  });

  useEffect(() => {
    setData(ensureArray(shipperList));

  }, [shipperList]);

  return (
    <>
      <div className={cn("rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2 mt-4", className)}>
        <Table
          table={table}
          variant={variant}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter table={table} />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
