import PageHeader from "@shared/page-header";
import ResellingOrdersTable from "./reseller-order-list/table";
import { metaObject } from "@config/site.config";

export const metadata = {
  ...metaObject("Reselling Orders"),
};

const pageHeader = {
  title: "Reselling Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Reselling Orders",
    },
  ],
};

export default function ResellingOrdersPage() {
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <ResellingOrdersTable />
      </div>
    </>
  );
}
