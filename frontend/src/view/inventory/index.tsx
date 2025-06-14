import { Link } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@config/routes";
import { Button } from "rizzui";
import PageHeader from "@shared/page-header";
import InventoryTable from "./inventory-list/table";
import { productsData } from "@data/products-data";
import { metaObject } from "@config/site.config";
import ExportButton from "@shared/components/export-button";
import { useEffect } from "react";
import { useAppSelector } from "@hooks/store-hook";
import { TableLoader } from "@shared/loader";
import cn from "@/utils/helperFunctions/class-names";
import { useInventory } from "@/hooks/inventory-hook";

export const metadata = {
  ...metaObject("Inventory"),
};

const pageHeader = {
  title: "Inventory",
  breadcrumb: [
    {
      name: "Inventory",
    },
    {
      name: "List",
    },
  ],
};

const InventoryPage = () => {
  const { handleGetInventory, isLoading } = useInventory();
  const { data } = useAppSelector((state) => state?.Inventory);

  useEffect(() => {
    handleGetInventory();
  }, []);

  console.log("InventoryData", data);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button variant="outline" className={cn("w-full @lg:w-auto")}>
            Bulk edit
          </Button>
          <Button variant="outline" className={cn("w-full @lg:w-auto")}>
            Update Quantities
          </Button>
          <Button variant="outline" className={cn("w-full @lg:w-auto")}>
            Create Transfer
          </Button>
          <Button variant="outline" className={cn("w-full @lg:w-auto")}>
            Create Purchase Order
          </Button>
        </div>
      </PageHeader>

      <InventoryTable pageSize={10} data={data} isLoading={isLoading} />
    </>
  );
};

export default InventoryPage;
