import PageHeader from "@shared/page-header";
import InvoiceTable from "@/view/invoice/invoice-list/table";
import { metaObject } from "@/config/site.config";
import { useInvoice } from "@/hooks/invoice-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";

export const metadata = {
  ...metaObject("Invoices"),
};

const pageHeader = {
  title: "Invoice List",
  breadcrumb: [
    {
      href: "/",
      // href: routes.eCommerce.dashboard,
      name: "Home",
    },
    {
      name: "Invoice",
    },
  ],
};

export default function InvoiceListPage() {
  const { handleGetInvoice,isLoading } = useInvoice();
  const { data, isDataLoaded } = useAppSelector((state) => state.Invoice);
  console.log("IndexData", data);

  useEffect(() => {
    if (!isDataLoaded) {
      handleGetInvoice();
    }
  }, [isDataLoaded, handleGetInvoice]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0"></div>
      </PageHeader>
      <InvoiceTable data={data} isLoading={isLoading} isDataLoaded={isDataLoaded}/>
    </>
  );
}
