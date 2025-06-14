import { PiCheckBold, PiPrinter } from "react-icons/pi";
import OrderViewProducts from "@/view/orders/order-detail/table";
import { Title, Text, Button } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import Timeline from "./order-timeline";
import PencilIcon from "@/components/icons/pencil";
import React, { useRef, useState } from "react";
import CustomerModel from "../order-modal/customer-modal";
import { useLocation } from "react-router-dom";
import ShipPriceModel from "../order-modal/ship-price-moda";
import { useReactToPrint } from "react-to-print";
import ProductTags from "./product-tags";
import OrderPrint from "./order-print";

const orderStatus = [
  { id: 1, label: "Order Pending" },
  { id: 2, label: "Order Processing" },
  { id: 3, label: "Order At Local Facility" },
  { id: 4, label: "Order Out For Delivery" },
  { id: 5, label: "Order Completed" },
];

const currentOrderStatus = 3;

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          "rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl",
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function OrderView() {
  const location = useLocation();
  console.log("@location.state?.selectedOrder", location.state?.selectedOrder);
  const [orderData, setOrderData] = useState(location.state?.selectedOrder);
  const [customerModel, setCustomerModel] = useState(false);
  const [shipModel, setshipModel] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn: any = useReactToPrint({ contentRef });

  if (!orderData) {
    return <div>No order data available</div>;
  }

  return (
    <div className="@container">
      <div className="flex justify-between border-b border-t border-gray-300 py-4 font-medium text-gray-700">
        <div className="flex items-center">
          <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
            <span className="font-bold">Created at : </span>
            {orderData.createdAt
              ? new Date(orderData.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "not found"}
          </span>
          <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
            {orderData.lineItems?.length === 1 ? (
              <span className="font-bold">Item</span>
            ) : (
              <>
                <span className="font-bold">Items :</span>{" "}
                <span className="font-semibold">
                  {orderData.lineItems?.length || "not found"}
                </span>
              </>
            )}
          </span>
          <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
            <span className="font-bold">Total Amount: </span>
            Rs. {Math.floor(orderData?.pricing?.currentTotalPrice) || 0}
          </span>
          <span className="my-2 ms-5 rounded-md border-r border-muted bg-green-lighter px-2.5 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
            {orderData?.financialStatus
              ? orderData?.financialStatus
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: any) => char.toUpperCase())
              : ""}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={reactToPrintFn} className="w-full @lg:w-auto">
            <PiPrinter className="me-1.5 h-[17px] w-[17px]" />
            Print
          </Button>
        </div>
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="border rounded-lg">
            {/* <OrderViewProducts
              data={orderData?.lineItems}
              QuantityUpdate={QuantityUpdate}
            /> */}
          </div>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded-md border-r border-muted font-semibold bg-green-lighter text-xs text-green-dark">
                  {orderData?.financialStatus
                    ? orderData?.financialStatus
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char: any) => char.toUpperCase())
                    : "Not found"}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>
                    Rs. {Math.floor(orderData?.pricing?.subTotal) || 0}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span
                    className="text-blue-600 hover:cursor-pointer"
                    onClick={() => setshipModel(true)}
                  >
                    Shipping
                  </span>
                  <span>
                    Rs. {Math.floor(orderData?.pricing?.shipping) || 0}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    Rs. {Math.floor(orderData?.pricing?.currentTotalPrice) || 0}
                  </span>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="flex justify-between font-medium">
                  <span>Paid</span>
                  <span>Rs. {Math.floor(orderData?.pricing?.paid) || 0}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Balance</span>
                  <span>
                    Rs. {Math.floor(orderData?.pricing?.balance) || 0}
                  </span>
                </div>
                <div className="border-t border-gray-200"></div>
              </div>

              <div className="mt-6 flex space-x-2 items-center justify-end">
                <Button className="" variant="outline">
                  Send invoice
                </Button>
                <Button className="">Mark as paid</Button>
              </div>
            </div>
          </div>

          <Timeline />
        </div>
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
              {orderStatus.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5 after:h-10 after:w-0.5 after:content-[''] last:after:hidden",
                    currentOrderStatus > item.id
                      ? "before:bg-primary after:bg-primary"
                      : "after:hidden",
                    currentOrderStatus === item.id && "before:bg-primary"
                  )}
                >
                  {currentOrderStatus >= item.id ? (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  ) : null}

                  {item.label}
                </div>
              ))}
            </div>
          </WidgetCard>

          <WidgetCard title="" childrenWrapperClass="py-4 @5xl:py-8">
            <div className="flex items-center justify-between pb-4">
              <Title as="h6" className="">
                Shipping Details
              </Title>
              <PencilIcon
                className="w-5 h-5 hover:cursor-pointer"
                // onClick={() => setCustomerModel(true)}
              />
            </div>
            <div className="space-y-3">
              <Text className="text-sm font-semibold @7xl:text-lg">
                {orderData?.shipmentDetails?.name ?? ""}
              </Text>
              <Text as="p" className="font-semibold">
                {orderData?.shipmentDetails?.phone ?? ""}
              </Text>
              <Text className="text-sm font-semibold @7xl:text-lg">
                {orderData?.shipmentDetails?.address ?? ""}
              </Text>
              <Text as="p" className="break-all font-semibold">
                {orderData?.shipmentDetails?.city ?? ""}
              </Text>
            </div>
          </WidgetCard>

          <ProductTags orderData={orderData} />
        </div>
      </div>

      {/* {orderData && (
        <div
          id="invoice"
          ref={contentRef}
          className="hidden print:block bg-white p-4 border border-gray-200 rounded-md"
        >
          <OrderPrint data={orderData} />
        </div>
      )} */}
      {/* <CustomerModel
        show={customerModel}
        orderData={orderData}
        onClose={() => setCustomerModel(false)}
        onUpdate={handleCustomerUpdate}
      /> */}
      {/* <ShipPriceModel
        show={shipModel}
        onClose={() => setshipModel(false)}
        initialData={{
          shipping: String(orderData?.pricing?.shipping) || "",
        }}
        onUpdate={ShippingUpdate}
      /> */}
    </div>
  );
}
