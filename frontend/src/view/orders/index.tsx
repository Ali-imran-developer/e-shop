import { useNavigate } from "react-router-dom";
import { routes } from "@config/routes";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import OrdersTable from "./order-list/table";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@config/site.config";

export const metadata = {
  ...metaObject("Orders"),
};

const pageHeader = {
  title: "Orders",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Orders",
    },
  ],
};

export default function ConfirmOrdersPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center cursor-pointer lg:gap-3 gap-1 @lg:mt-0 flex-wrap">
          <Button as="span" className="@lg:w-auto cursor-pointer" onClick={() => navigate(routes?.orders?.createOrder)}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Order
          </Button>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <OrdersTable className="" />
      </div>
    </>
  );
}
