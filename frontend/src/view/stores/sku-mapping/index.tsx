import PageHeader from "@shared/page-header";
import { routes } from "@config/routes";
import { Box } from "rizzui";
import BasicTable from "@/view/stores/sku-mapping/sku-mapping-list";

const pageHeader = {
  title: "SKU Mapping",
  breadcrumb: [
    {
      href: routes.settings.stores.skuMapping,
      name: "SKU Mapping",
    },
    {
      name: "List",
    },
  ],
};

const SkuMapping = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Box className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <BasicTable pageSize={10} />
      </Box>
    </>
  );
};

export default SkuMapping;
