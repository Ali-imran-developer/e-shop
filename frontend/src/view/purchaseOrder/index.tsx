import { metaObject } from "@config/site.config";
import PageHeader from "@shared/page-header";
import SupplierDestinationCard from "./components/supplier-card";
import ProductsTable from "./components/table";

export const metadata = {
  ...metaObject('Purchase Order Page'),
};

const pageHeader = {
  title: "Create Purchase Order",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Purchase Order",
    },
  ],
};

const purchaseOrder = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <SupplierDestinationCard />
      <ProductsTable />
    </>
  );
};

export default purchaseOrder;
