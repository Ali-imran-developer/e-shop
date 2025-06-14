import { metaObject } from "@/config/site.config";
import PageHeader from "@/components/shared/page-header";
import FiltersButton from "./reselling-list/filters-button";
import ShopFilters from "./reselling-list/shop/shop-filters";
import ProductFeed from "./reselling-list/product-feed";

const pageHeader = {
  title: "Reselling Product",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Reselling Product",
    },
  ],
};

export const metadata = {
  ...metaObject("Reselling Product"),
};

export default function ShopPage() {
  return (
    <>    
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}
      <ProductFeed />
    </>
  );
}
