import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import ResellersProductTable from "./resellers-product-list/table";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";
import { useProduct } from "@/hooks/product-hook";
import { reslaeProduct } from "@/hooks/resale-product-hook";

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

export default function ResellersProduct() {
  const { data } = useAppSelector((state) => state?.Products);
  const { isLoading, handleGetProducts } = useProduct();

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <ResellersProductTable data={data} isLoading={isLoading} />
      </div>
    </>
  );
}
