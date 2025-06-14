import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import ProductsTable from "./product-list/table";
import { metaObject } from "@config/site.config";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";

export const metadata = {
  ...metaObject("Products"),
};

const pageHeader = {
  title: "Products",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
    },
  ],
};

const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="flex gap-4">
          <Button as="span" className="w-full lg:w-auto cursor-pointer" onClick={() => navigate(routes.products.createProducts)}>
            <PiPlusBold className="me-1.5 h-[16px] w-[16px]" />
            Add Product
          </Button>
        </div>
      </PageHeader>

      <ProductsTable pageSize={10} className={undefined} paginationClassName={undefined} />
    </>
  );
};

export default ProductsPage;