import PageHeader from "@shared/page-header";
import PickedUpOrderTable from "./return-list/table";
import { orderData } from "@data/order-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";

export const metadata = {
  ...metaObject("Picked Up Orders"),
};

const pageHeader = {
  title: "Picked Up Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Picked Up Orders",
    },
  ],
};

export default function PickedUpOrdersPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <PickedUpOrderTable />
      </div>
    </>
  );
}
