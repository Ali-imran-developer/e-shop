import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import ManualOrderTable from "./order-list/table";
import { orderData } from "@/data/order-data";
import { Button } from "rizzui";
import { useState } from "react";
import CourierDrawer from "./drawer";

export const metadata = {
  ...metaObject("Manual Orders"),
};

const pageHeader = {
  title: "Manual Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Manual Orders",
    },
  ],
};

export default function ManualOrdersPage() {
  const [ open, setOpen ] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button onClick={() => setOpen(true)}>Add Courier</Button>
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        {/* <StatsCards /> */}
        <ManualOrderTable />
      </div>

      <CourierDrawer isDrawerOpen={open} closeDrawer={handleDrawerClose} />
    </>
  );
}
