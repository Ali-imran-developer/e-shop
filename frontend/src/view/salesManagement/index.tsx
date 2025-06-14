import PageHeader from "@shared/page-header";
import ProductsTable from "@/view/salesManagement/salesManagement-list/table";
import { productsData } from "@data/products-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import { useEffect, useState } from "react";
import { useProduct } from "@hooks/product-hook";
import { useAppSelector } from "@hooks/store-hook";
import { TableLoader } from "@shared/loader";

export const metadata = {
  ...metaObject("Products"),
};

const pageHeader = {
  title: "Sales Management",
  breadcrumb: [],
};

const salesManagement = () => {
  const { handleGetProducts } = useProduct();
  const { data, isDataLoaded } = useAppSelector((state) => state?.Products);

  useEffect(() => {
    if (!isDataLoaded) {
      handleGetProducts();
    }
  }, [data]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
        </div>
      </PageHeader>

      <ProductsTable pageSize={10} data={data} isDataLoaded={isDataLoaded} />
    </>
  );
};

export default salesManagement;
