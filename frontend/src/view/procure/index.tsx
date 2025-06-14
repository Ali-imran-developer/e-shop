import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import OrdersTable from "./procure-list/table";
import { PiPlusBold } from "react-icons/pi";
import { orderData } from "@data/order-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import { useState } from "react";
import Drawer from "./drawer";

export const metadata = {
  ...metaObject("Procure"),
};

const pageHeader = {
  title: "Procure",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Procure",
    },
  ],
};

export default function ConfirmOrdersPage() {
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const procureStatuses = ["In Process", "Ready"];
  const [formDataHandler, setFormDataHandler] = useState([]);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            as="span"
            className="@lg:w-auto hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Status
          </Button>
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <OrdersTable formDataHandler={formDataHandler} />
      </div>

      <Drawer
        isDrawerOpen={open}
        closeDrawer={handleDrawerClose}
        handleUpdate={() => console.log("Data Updated")}
        procureStatuses={procureStatuses}
        setFormDataHandler={setFormDataHandler}
      />
    </>
  );
}
