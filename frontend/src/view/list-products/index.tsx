import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import ListProductTable from "./components/table";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";
import { reslaeProduct } from "@/hooks/resale-product-hook";
import { Button } from "rizzui";
import { Link } from "react-router-dom";
import { routes } from "@/config/routes";

export const metadata = {
  ...metaObject("List Product"),
};

const pageHeader = {
  title: "List Product",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "List Product",
    },
  ],
};

export default function ListProduct() {
  const { listData } = useAppSelector((state) => state?.resaleProduct);
  const { handleGetListingProduct, isSetLoading } = reslaeProduct();

  useEffect(() => {
    handleGetListingProduct();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link to={routes.orders.createOrder}>
          <Button>Place Order</Button>
        </Link>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <ListProductTable data={listData} isLoading={isSetLoading} />
      </div>
    </>
  );
}
