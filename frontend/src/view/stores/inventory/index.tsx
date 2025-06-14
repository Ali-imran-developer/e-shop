import PageHeader from "@shared/page-header";
import { routes } from "@config/routes";
import { Box } from "rizzui";
import InventoryTable from "@/view/stores/inventory/table/table";
import { useAppSelector } from "@/hooks/store-hook";
import { useEffect } from "react";
import { useSkuMapping } from "@/hooks/skuMapping-hook";

const pageHeader = {
  title: "Inventory",
  breadcrumb: [
    {
      href: routes.settings.stores.inventory,
      name: "Inventory",
    },
  ],
};

const Inventory = () => {
  const { handleGetSkuMapping } = useSkuMapping();
  const { data, isDataLoaded } = useAppSelector((state) => state?.SkuMapping);

  useEffect(() => {
    if (!isDataLoaded) {
      handleGetSkuMapping();
    }
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Box className="space-y-8">
        <InventoryTable data={data} isDataLoaded={isDataLoaded} />
      </Box>
    </>
  );
};

export default Inventory;
