import {
  bookedOrdersColumns,
  cancelledOrders,
  confirmOrdersColumns,
} from "./columns";
import Table from "@shared/components/table/table";
import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { Input, TableVariantProps } from "rizzui";
import cn from "@/utils/helperFunctions/class-names";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { TabList } from "@/components/shared/tabs";
import {
  SetStateAction,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import TableFooter from "@/components/shared/components/table/footer";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import toast from "react-hot-toast";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  bookingOrder,
  fetchAllOrders,
  fetchBookedOrders,
  updateOrderStatus,
} from "@/store/slices/ordersSlice";
import { fetchAllCourier } from "@/store/slices/CourierSlice";
import { fetchAllShipper } from "@/store/slices/shipperSlice";
import { generateShippingLabelPDF } from "../labelPrint";
import { useFormik } from "formik";

const filterOptions = [
  {
    value: "confirmed",
    label: "Confirmed",
    buttons: [
      { title: "Booked", className: "text-green-dark" },
      { title: "Cancelled", className: "text-red" },
    ],
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "booked",
    label: "Booked",
    buttons: [{ title: "Download Label", className: "text-green-dark" }],
  },
];

export default function OrderTable({
  className,
  variant = "modern",
  hideFilters = false,
  hidePagination = false,
  onDataChange,
}: {
  className?: string;
  hideFilters?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
  onDataChange?: (hasData: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>("confirmed");
  const { OrderList, isLoading, BookedOrderList } = useAppSelector(
    (state) => state?.Orders
  );
  const { shipperList } = useAppSelector((state) => state?.Shipper);
  const { CourierList } = useAppSelector((state) => state?.Courier);
  const [selectedCouriers, setSelectedCouriers] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedShipper, setSelectedShipper] = useState();
  const [loading, setLoading] = useState("");
  const [orderData, setOrderData] = useState<any>([]);

  const filteredOrders = useMemo(() => {
    const options = filterOptions.reduce<Record<string, string>>(
      (acc, item) => {
        acc[item.value] = item.label.toLowerCase();
        return acc;
      },
      {}
    );
    return ensureArray(OrderList).filter(
      (order) => order.status === options[activeTab]
    );
  }, [OrderList, activeTab]);

  useEffect(() => {
    dispatch(fetchAllCourier());
    dispatch(fetchAllShipper());
  }, []);

  useEffect(() => {
    if (filteredOrders?.length && shipperList?.length && CourierList?.length) {
      const updatedOrders = ensureArray(filteredOrders).map((order) => {
        const shippers: any[] = ensureArray(shipperList).filter(
          (s: any) => s.user === order.user
        );
        const couriers = ensureArray(CourierList);
        return {
          ...order,
          shipperInfo: shippers.length
            ? shippers.map((shipper) => ({
                shipperId: shipper._id,
                shipperCity: shipper.city,
              }))
            : [],
          courierInfo: couriers.length
            ? couriers.map((courier) => ({
                courierId: courier._id,
                courierName: courier.name,
                logo: courier.logo,
                defaultCoureir: courier.isDefault,
              }))
            : [],
        };
      });
      setOrderData(updatedOrders);
    }
  }, [OrderList, shipperList, CourierList]);

  console.log("orderData", CourierList?.length);
  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const ultimateData = activeTab === "booked" ? BookedOrderList : orderData;
  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(ultimateData),
    columnConfig: [],
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
      meta: {
        handleSelectRow: (row) => {
          if (expandedRowId === row?.original?._id) {
            setExpandedRowId(null);
          } else {
            setExpandedRowId(row?.original?._id);
          }
        },
        handlePrintOrderSlip: (row: any) => {
          generateShippingLabelPDF([row]);
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (activeTab === "booked") {
      dispatch(fetchBookedOrders());
    } else {
      dispatch(fetchAllOrders());
    }
  }, [activeTab]);

  useEffect(() => {
    setData(ensureArray(ultimateData));
    setExpandedRowId(null);
  }, [ultimateData]);

  useEffect(() => {
    if (activeTab === "booked") {
      setColumns(bookedOrdersColumns({ expandedRowId }));
    } else if (activeTab === "confirmed") {
      setColumns(
        confirmOrdersColumns({
          navigate,
          expandedRowId,
          dispatch,
          setSelectedCouriers,
          setSelectedMethod,
          setSelectedShipper,
        })
      );
    } else {
      setColumns(cancelledOrders({ expandedRowId }));
    }
  }, [expandedRowId, CourierList, shipperList, activeTab]);

  useEffect(() => {
    const getStatusButton: any = filterOptions.find(
      (item: { value?: string }) => item.value === activeTab
    );
    setSelectedStatus(getStatusButton);
  }, [activeTab]);

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setActiveTab(nextTab);
    });
  };

  const handleStatusChange = async (
    checkedItems: any[],
    status: SetStateAction<string>,
    row: { original: any }
  ) => {
    const orderData = row?.original;
    const initialValues = {
      orderId: orderData?._id,
      userId: orderData?.user,
      courierId: selectedCouriers,
      shipmentType: selectedMethod,
      shipperId: selectedShipper,
    };
    try {
      setLoading(status);
      if (status === "Booked") {
        console.log("initialValues", initialValues);
        try {
          const resultAction: any = await dispatch(bookingOrder(initialValues));
          const response = resultAction?.payload;
          if (response?.message) {
            toast.success(response?.message);
          } else {
            toast.error("Booking failed");
          }
          await dispatch(fetchAllOrders());
        } catch (error: any) {
          console.log("error", error);
          toast.error(error?.message || "Something went wrong");
        }
      } else if (status === "Cancelled") {
        try {
          let hasStatusUpdate =
            checkedItems?.length >= 1
              ? checkedItems?.map((obj) => ({
                  ...obj,
                  status: status?.toLowerCase(),
                }))
              : [{ ...row?.original, status: status?.toLowerCase() }];

          const response: any = await Promise.all(
            hasStatusUpdate.map((item) =>
              dispatch(
                updateOrderStatus({ id: item._id, status: item.status })
              ).unwrap()
            )
          );
          ensureArray(response)?.forEach((res) => {
            if (res?.message) {
              toast.success(res.message);
            }
          });
          await dispatch(fetchAllOrders());
        } catch (error: any) {
          console.log("error", error);
          toast.error(error.message || "Failed to update status");
        }
      } else if (status === "Download Label") {
        let selectedOrders: any[] =
          checkedItems?.length >= 1 ? checkedItems : [{ ...row?.original }];
        try {
          generateShippingLabelPDF(selectedOrders);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading("");
      table.resetRowSelection();
      table.resetExpanded();
    }
  };

  useEffect(() => {
    table.resetExpanded();
    table.resetRowSelection();
  }, [filterOptions, activeTab]);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4",
          className
        )}
      >
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by name..."
          onClear={() => table.setGlobalFilter("")}
          value={table.getState().globalFilter ?? ""}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
        />
        <TabList
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          selectTab={selectTab}
        />
        <Table
          table={table}
          variant={variant}
          expandedRowId={expandedRowId}
          showLoadingText={isLoading}
          isLoading={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                table={table}
                selectedStatus={selectedStatus}
                isLoading={loading}
                handleStatusChange={handleStatusChange}
              />
            ),
          }}
        />
        <TableFooter
          table={table}
          buttons={selectedStatus}
          isLoading={loading}
          handleStatusChange={handleStatusChange}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
    </>
  );
}
