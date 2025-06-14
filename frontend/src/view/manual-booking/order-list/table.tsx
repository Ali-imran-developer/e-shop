// import Table from "@shared/components/table/table";
// import CustomExpandedComponent from "../expanded-row";
// import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
// import TablePagination from "@shared/components/table/pagination";
// import { OrdersDataType } from "@shared/components/order/recent-order";
// import { Input, TableVariantProps } from "rizzui";
// import cn from "@/utils/helperFunctions/class-names";
// import { useAppSelector } from "@/hooks/store-hook";
// import { TabList } from "@/components/shared/tabs";
// import { startTransition, useEffect, useState } from "react";
// import TableFooter from "@/components/shared/components/table/footer";
// import { useOrders } from "@/hooks/orders-hook";
// import AuthController from "@/controllers/authController";
// import { ensureArray } from "@/utils/helperFunctions/formater-helper";
// import { manualOrdersColumns } from "./columns";
// import { PiMagnifyingGlassBold } from "react-icons/pi";

// const filterOptions = [
//   {
//     value: "manual",
//     buttons: [
//       { title: "Export Orders", className: "text-green-dark" },
//       { title: "Booked Orders", className: "text-orange" },
//       { title: "Manual Orders", className: "" },
//     ],
//   },
// ];

// interface FetchOrdersParams {
//   status: string;
//   isAssigned?: boolean;
//   fulfillmentStatus?: string;
//   deliveryStatus?: string;
//   page?: number;
//   limit?: number;
//   startDateIs?: string | null;
//   endDateIs?: string | null;
//   title?: string;
//   searchByCity?: string;
//   filterByCity?: string;
// }

// export default function ManualOrderTable({
//   className,
//   variant = "modern",
//   hidePagination = false,
// }: {
//   className?: string;
//   hideFilters?: boolean;
//   hidePagination?: boolean;
//   variant?: TableVariantProps;
// }) {
//   const [activeTab, setActiveTab] = useState<string>("manual");
//   const initialParams: any = {
//     fulfillmentStatus: null,
//     status: "manual",
//     isAssigned: false,
//     deliveryStatus: "not_delivered",
//     title: "",
//     searchByCity: "",
//     filterByCity: "",
//     page: 1,
//     limit: 50,
//     startDate: null,
//     endDate: null,
//   };
//   const [expandedRowId, setExpandedRowId] = useState<any>(null);
//   const [params, setParams] = useState<FetchOrdersParams>(initialParams);
//   const { data, isDataLoaded } = useAppSelector((state) => state?.Orders);
//   const [assignedOrders, setAssignedOrders] = useState<any>([]);
//   const [selectedStatus, setSelectedStatus] = useState({});
//   const { loading } = useOrders(params);
//   const [isLoading, setIsLoading] = useState("");
//   const session = AuthController.getSession();

//   function extractValues(obj: any): string {
//     let result = "";

//     const recurse = (val: any) => {
//       if (val == null) return;
//       if (
//         typeof val === "string" ||
//         typeof val === "number" ||
//         typeof val === "boolean"
//       ) {
//         result += ` ${val}`;
//       } else if (Array.isArray(val)) {
//         val.forEach((item) => recurse(item));
//       } else if (typeof val === "object") {
//         Object.values(val).forEach((item) => recurse(item));
//       }
//     };

//     recurse(obj);
//     return result.toLowerCase();
//   }

//   const updateParams = (status: string) => {
//     setParams((prev) => ({
//       ...prev,
//       status: status,
//       isAssigned: status === "assigned" ? true : false,
//     }));
//   };

//   console.log("manaulData", data);

//   const { table, setData, setColumns } = useTanStackTable<OrdersDataType>({
//     tableData:
//       ensureArray(data)?.map((item: any) => {
//         return {
//           ...item,
//           items: item?.line_items?.length,
//           tracking:
//             item.shipmentTracking?.length > 0
//               ? item.shipmentTracking.map((shipment: any) =>
//                   item.shipmentTracking?.length > 1
//                     ? `${shipment.trackingNumber}/`
//                     : `${shipment.trackingNumber}`
//                 )
//               : "N/A",
//           couriers: ensureArray(session?.updatedCouriers?.couriers)?.map(
//             (courierItem: any) => {
//               return { label: courierItem?.label, value: courierItem?.value };
//             }
//           ),
//         };
//       }) ?? [],

//     columnConfig: manualOrdersColumns({ expandedRowId }),
//     options: {
//       globalFilterFn: (row, columnId, filterValue) => {
//         const rowString = extractValues(row.original); // Flatten entire row
//         return rowString.includes(filterValue.toLowerCase());
//       },
//       initialState: {
//         pagination: {
//           pageIndex: 0,
//           pageSize: 20,
//         },
//         columnPinning: {
//           left: ["expandedHandler"],
//           right: ["action"],
//         },
//       },
//       meta: {
//         handleDeleteRow: (row) => {
//           setData((prev) => prev.filter((r) => r.id !== row.id));
//         },

//         handleSelectRow: (row) => {
//           if (expandedRowId === row?.original?._id) {
//             setExpandedRowId(null);
//           } else {
//             setExpandedRowId(row?.original?._id);
//           }
//         },
//       },
//       enableColumnResizing: false,
//     },
//   });

//   useEffect(() => {
//     setData(
//       ensureArray(data)?.map((item: any) => {
//         return {
//           ...item,
//           items: item?.line_items?.length,
//           tracking:
//             item.shipmentTracking?.length > 0
//               ? item.shipmentTracking.map((shipment: any) =>
//                   item.shipmentTracking?.length > 1
//                     ? `${shipment.trackingNumber}/`
//                     : `${shipment.trackingNumber}`
//                 )
//               : "N/A",
//           couriers: ensureArray(session?.updatedCouriers?.couriers)?.map(
//             (courierItem: any) => {
//               return { label: courierItem?.label, value: courierItem?.value };
//             }
//           ),
//         };
//       }) ?? []
//     );
//   }, [data]);
//   useEffect(() => {
//     setColumns(manualOrdersColumns({ expandedRowId }));
//   }, [expandedRowId]);

//   // const { loadCouriers } = useCouriers();
//   // useEffect(() => {
//   //   if (activeTab === "confirm") {
//   //     loadCouriers();
//   //   }
//   // }, []);

//   useEffect(() => {
//     const getStatusButton: any = filterOptions.find(
//       (item: { value?: string }) => item.value === activeTab
//     );
//     setSelectedStatus(getStatusButton);
//     console.log("@getStatusButton", getStatusButton);
//   }, [activeTab]);

//   const selectTab = (nextTab: string) => {
//     startTransition(() => {
//       setActiveTab(nextTab);
//     });
//     updateParams(nextTab);
//   };

//   return (
//     <>
//       <div
//         className={cn(
//           "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4",
//           className
//         )}
//       >
//         <Input
//           type="search"
//           clearable={true}
//           inputClassName="h-[36px]"
//           placeholder="Search by any field..."
//           onClear={() => table.setGlobalFilter("")}
//           value={table.getState().globalFilter ?? ""}
//           prefix={<PiMagnifyingGlassBold className="size-4" />}
//           onChange={(e) => table.setGlobalFilter(e.target.value)}
//           className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
//         />
//         <TabList
//           tabs={filterOptions}
//           setActiveTab={setActiveTab}
//           activeTab={activeTab}
//           updateParams={updateParams}
//           selectTab={selectTab}
//         />
//         <Table
//           table={table}
//           data={data}
//           variant={variant}
//           showLoadingText={isDataLoaded || loading}
//           isLoading={isDataLoaded || loading}
//           expandedRowId={expandedRowId}
//           classNames={{
//             container: "border border-muted rounded-md border-t-0 mt-4",
//             rowClassName: "last:border-0",
//           }}
//           components={{
//             expandedComponent: (row) => (
//               <CustomExpandedComponent
//                 row={row}
//                 table={table}
//                 selectedStatus={selectedStatus}
//                 isLoading={isLoading}
//               />
//             ),
//           }}
//         />
//         <TableFooter
//           table={table}
//           buttons={selectedStatus}
//           isLoading={isLoading}
//         />
//         {!hidePagination && <TablePagination table={table} className="py-4" />}
//       </div>
//     </>
//   );
// }

import React from 'react'

const table = () => {
  return (
    <div>
      
    </div>
  )
}

export default table;