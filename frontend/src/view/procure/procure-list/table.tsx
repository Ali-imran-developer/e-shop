// import { confirmOrdersColumns } from "./columns";
// import { orderData } from "@data/order-data";
// import Table from "@shared/components/table/table";
// import CustomExpandedComponent from "@shared/components/table/custom/expanded-row";
// import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
// import TablePagination from "@shared/components/table/pagination";
// import { OrdersDataType } from "@shared/components/order/recent-order";
// import { Flex, Input, TableVariantProps } from "rizzui";

// import cn from "@/utils/helperFunctions/class-names";
// import { useAppSelector } from "@/hooks/store-hook";
// import { TabList } from "@/components/shared/tabs";
// import { startTransition, useEffect, useMemo, useState } from "react";
// import TableFooter from "@/components/shared/components/table/footer";
// import { useOrders } from "@/hooks/orders-hook";
// import { useCouriers } from "@/hooks/courier-hook";
// import AuthController from "@/controllers/authController";
// import { ensureArray } from "@/utils/helperFunctions/formater-helper";
// import OrdersController from "@/controllers/ordersController";
// import toast from "react-hot-toast";
// import CourierControllers from "@/controllers/courierController";
// import { getCourierOrdersObject } from "@/utils/helperFunctions/confirm-orders-helper";
// import { useNavigate } from "react-router-dom";
// import ShipperInfoController from "@/controllers/shipper-info";
// import { useAuth } from "@/hooks/auth-hooks";
// import { generateShippingLabelPDF } from "@/view/dispatch/labelPrint";
// import { PiMagnifyingGlassBold } from "react-icons/pi";
// import { generateDemandSheetPDF } from "../labelPrint";

// const filterOptions = [
//   {
//     value: "procure",
//     label: "In Process",
//     buttons: [{ title: "Ready", className: "text-green-dark" }],
//   },
//   {
//     value: "ready",
//     label: "Ready",
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

// export default function OrderTable({
//   className,
//   variant = "modern",
//   hideFilters = false,
//   hidePagination = false,
//   formDataHandler,
// }: {
//   className?: string;
//   hideFilters?: boolean;
//   hidePagination?: boolean;
//   variant?: TableVariantProps;
//   formDataHandler: any;
// }) {
//   const [activeTab, setActiveTab] = useState<string | null>("procure");
//   const initialParams: any = {
//     fulfillmentStatus: null,
//     status: "procure",
//     isAssigned: false,
//     title: "",
//     searchByCity: "",
//     filterByCity: "",
//     page: 1,
//     limit: 50,
//     startDate: null,
//     endDate: null,
//   };

//   const [params, setParams] = useState<FetchOrdersParams>(initialParams);
//   const { data } = useAppSelector((state) => state?.Orders);
//   const [assignedOrders, setAssignedOrders] = useState<any>([]);
//   const [selectedStatus, setSelectedStatus] = useState({});
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const { handleGetOrders, loading, mergePDFs, handleDownloadPdf, chunkArray } =
//     useOrders(params);
//   const [isLoading, setIsLoading] = useState("");
//   const [cities, setCities] = useState([]);
//   const session = AuthController.getSession();
//   const [expandedRowId, setExpandedRowId] = useState<any>(null);
//   console.log("@session", session?.procureStatus);
//   const updateParams = (status: string) => {
//     setParams((prev) => ({
//       ...prev,
//       status: status,
//       isAssigned: status === "assigned" ? true : false,
//     }));
//   };
//   const showProcureStatuses = ensureArray(
//     session?.procureStatus ?? formDataHandler
//   ).map((status) => {
//     const existingOption = filterOptions.find((item) => item.label === status);
//     if (existingOption) {
//       return existingOption;
//     } else {
//       return {
//         value: status,
//         label: status.charAt(0).toUpperCase() + status.slice(1), // capitalize first letter
//       };
//     }
//   });

//   console.log("@showProcureStatuses", showProcureStatuses);

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

//   const { table, setData, setColumns } = useTanStackTable<OrdersDataType>({
//     tableData:
//       ensureArray(data)?.map((item: any) => {
//         return {
//           ...item,
//           items: item?.line_items?.length,
//           couriers: ensureArray(session?.updatedCouriers).map(
//             (courierItem: any) => ({
//               label: courierItem?.name,
//               value: courierItem?.name,
//             })
//           ),
//         };
//       }) ?? [],

//     columnConfig: confirmOrdersColumns({ expandedRowId }),
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
//         // columnPinning: {
//         //   left: ["expandedHandler"],
//         //   right: ["action"],
//         // },
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
//         handleSelectedCities: (row: any, selectedCourier: string) => {
//           console.log("@@row", row);
//         },
//         handleSelectedValue: async (
//           row: any,
//           selectedCourier: {
//             courier: string;
//             shipmentType: string;
//             shippingMethod: string;
//           }
//         ) => {
//           const selectCourier = ensureArray(session?.updatedCouriers).find(
//             (item) =>
//               item.name.toLowerCase() ===
//               selectedCourier?.["courier"].toLowerCase()
//           );
//           try {
//             setAssignedOrders((prevAssignedOrders: any) => {
//               const existingIndex = prevAssignedOrders.findIndex(
//                 (assigned: any) => assigned.orderId === row._id
//               );

//               if (existingIndex !== -1) {
//                 const updatedOrders = [...prevAssignedOrders];
//                 updatedOrders[existingIndex].courierId = selectCourier?._id;
//                 updatedOrders[existingIndex].storeId = row?.storeId;
//                 updatedOrders[existingIndex].orderId = row._id;

//                 return updatedOrders;
//               } else {
//                 return [
//                   ...prevAssignedOrders,
//                   {
//                     orderId: row._id,
//                     storeId: row?.storeId,
//                     courierId: selectCourier?._id,
//                   },
//                 ];
//               }
//             });
//           } catch (error) {
//             console.log("@error", error);
//           }
//         },
//         handleSelectedShippingMethod: async (
//           row: any,
//           selectedValue: {
//             shipmentType: string;
//           }
//         ) => {
//           try {
//             console.log("@selectedValue", selectedValue);
//             setAssignedOrders((prevAssignedOrders: any) => {
//               const existingIndex = prevAssignedOrders.findIndex(
//                 (assigned: any) => assigned.orderId === row._id
//               );
//               console.log("@existingIndex", existingIndex);
//               if (existingIndex !== -1) {
//                 const updatedOrders = [...prevAssignedOrders];
//                 updatedOrders[existingIndex].orderId = row._id;
//                 updatedOrders[existingIndex].shipmentType =
//                   selectedValue?.["shipmentType"];

//                 return updatedOrders;
//               } else {
//                 return [
//                   ...prevAssignedOrders,
//                   {
//                     shipmentType: selectedValue?.["shipmentType"],
//                     orderId: row._id,
//                   },
//                 ];
//               }
//             });
//           } catch (error) {
//             console.log("@error", error);
//           }
//         },
//         handleSelectedShippingInfo: async (
//           row: any,
//           selectedValue: {
//             shipperId: string;
//           }
//         ) => {
//           setAssignedOrders((prevAssignedOrders: any) => {
//             const existingIndex = prevAssignedOrders.findIndex(
//               (assigned: any) => assigned.orderId === row._id
//             );
//             if (existingIndex !== -1) {
//               const updatedOrders = [...prevAssignedOrders];
//               updatedOrders[existingIndex].orderId = row._id;
//               updatedOrders[existingIndex].shipperId =
//                 selectedValue?.["shipperId"];

//               return updatedOrders;
//             } else {
//               return [
//                 ...prevAssignedOrders,
//                 {
//                   shipperId: selectedValue?.["shipperId"],
//                   orderId: row._id,
//                 },
//               ];
//             }
//           });
//         },
//         handlePrintOrderSlip: async (row: any) => {
//           await generateDemandSheetPDF([row]);
//         },
//       },
//       enableColumnResizing: false,
//     },
//   });

//   useEffect(() => {
//     table.resetExpanded();
//     table.resetRowSelection();
//   }, [activeTab]);

//   useEffect(() => {
//     setData(
//       ensureArray(data)?.map((item: any) => {
//         console.log("@item.shipperInfo", item.shipperInfo);
//         return {
//           ...item,
//           couriers: ensureArray(session?.updatedCouriers).map(
//             (courierItem: any) => ({
//               label: courierItem?.name,
//               value: courierItem?.name,
//             })
//           ),
//         };
//       })
//     );
//     setExpandedRowId(null);
//   }, [data, cities]);

//   useEffect(() => {
//     setColumns(confirmOrdersColumns({ expandedRowId, addresses }));
//   }, [expandedRowId]);

//   const { loadCouriers } = useCouriers();
//   useEffect(() => {
//     if (activeTab === "confirm") {
//       loadCouriers();
//     }
//   }, []);

//   useEffect(() => {
//     const getStatusButton: any = filterOptions.find(
//       (item: { value?: string }) => item.value === activeTab
//     );
//     setSelectedStatus(getStatusButton);
//   }, [activeTab]);

//   useEffect(() => {
//     const getAllShipperInfo = async () => {
//       await ShipperInfoController.getAllShipperInfo()
//         .then((res) => {
//           setAddresses(res);
//         })
//         .catch((error) => {
//           console.log("Error:", error);
//           toast.error(error?.message);
//         });
//     };
//     getAllShipperInfo();
//   }, [activeTab]);

//   const selectTab = (nextTab: string) => {
//     startTransition(() => {
//       setActiveTab(nextTab);
//     });
//     updateParams(nextTab);
//   };

//   const handleOrdersChange = async (
//     checkedItems: any[],
//     title: string,
//     row: any
//   ) => {
//     if (title !== "Download Demand Sheet") return;

//     try {
//       setIsLoading(title);

//       await generateDemandSheetPDF(checkedItems);
//     } catch (error) {
//       console.error("Error while generating PDF:", error);
//     } finally {
//       setIsLoading("");
//       table.resetRowSelection();
//       table.resetExpanded();
//     }
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
//           // tabs={filterOptions}
//           tabs={showProcureStatuses}
//           setActiveTab={setActiveTab}
//           activeTab={activeTab}
//           updateParams={updateParams}
//           selectTab={selectTab}
//         />
//         <Table
//           data={data}
//           table={table}
//           activeTab={activeTab}
//           variant={variant}
//           showLoadingText={loading}
//           isLoading={loading}
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
//                 handleStatusChange={handleOrdersChange}
//               />
//             ),
//           }}
//         />
//         <TableFooter
//           table={table}
//           buttons={selectedStatus}
//           isLoading={isLoading}
//           handleStatusChange={handleOrdersChange}
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

export default table
