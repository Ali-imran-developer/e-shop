import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import OrdersTable from "./order-list/table";
import { PiPlusBold } from "react-icons/pi";
import { orderData } from "@data/order-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import { Link } from "react-router-dom";
import { useState } from "react";

export const metadata = {
  ...metaObject("Dispatch Orders"),
};

const pageHeader = {
  title: "Dispatch Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dispatch Orders",
    },
  ],
};

export default function ConfirmOrdersPage() {
  const [isOrderData, setIsOrderData] = useState(false);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
           <Link to={isOrderData ? "/load-sheets" : "#"} className="w-full @lg:w-auto">
            <Button as="span" className="@lg:w-auto" disabled={!isOrderData}>
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create LoadSheet
            </Button>
          </Link>

        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        {/* <StatsCards /> */}
        <OrdersTable onDataChange={setIsOrderData} />
      </div>
    </>
  );
}
