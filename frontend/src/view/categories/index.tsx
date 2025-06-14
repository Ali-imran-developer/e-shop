import { Link } from "react-router-dom";
import { routes } from "@config/routes";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import CategoriesTable from "./category-list/table";
import { PiPlusBold } from "react-icons/pi";
import { orderData } from "@data/order-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";

export const metadata = {
  ...metaObject("Categories"),
};

const pageHeader = {
  title: "Categories",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Categories",
    },
  ],
};

export default function ConfirmOrdersPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center lg:gap-3 gap-1 @lg:mt-0 flex-wrap">
          <ExportButton
            data={orderData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link to={routes?.products?.createCategories} className="@lg:w-auto">
            <Button as="span" className="@lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Categories
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <CategoriesTable />
      </div>
    </>
  );
}
