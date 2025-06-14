import PageHeader from "@shared/page-header";
import MyOrdersTable from "./my-order-list/table";
import { metaObject } from "@config/site.config";

export const metadata = {
  ...metaObject("My Orders"),
};

const pageHeader = {
  title: "My Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "My Orders",
    },
  ],
};

export default function MyOrdersPage() {

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}/>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <MyOrdersTable />
      </div>
    </>
  );
}
