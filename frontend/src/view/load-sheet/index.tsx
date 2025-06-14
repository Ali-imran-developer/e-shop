import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import LoadSheetTable from "./load-sheet-list/table";
import FileSortbyDate from "./date-filter";
import { Button, Modal } from "rizzui";
import { PiPlusBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import CourierModal from "./create-loadsheet/components/loadsheet-modal";
import CourierControllers from "@/controllers/courierController";
import { ensureObject } from "@/utils/helperFunctions/formater-helper";

export const metadata = {
  ...metaObject("Load Sheet"),
};

const pageHeader = {
  title: "Load Sheet",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Load Sheets",
    },
  ],
};

export default function LoadSheetPage() {
  const [isCourierModalOpen, setCourierModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const handleGetLoadSheet = async () => {
      try {
        const res = await CourierControllers.getLoadSheet();
        const modifiedData = ensureObject(res?.data)?.map((item: any, index: number) => ({
          ...item,
          buisnessName: res.buisnessName,
          merchantUniqueId: res.merchantUniqueId,
          referencePhone: res.referencePhone,
          address: res.address,
          city: res.city,
          id: index + 1,
        }))
        setData(modifiedData);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetLoadSheet();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center justify-end gap-3 @lg:mt-0">
          <FileSortbyDate />
          <Button
            as="span"
            className="@lg:w-auto cursor-pointer"
            onClick={() => setCourierModalOpen(true)}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Load Sheet
          </Button>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <LoadSheetTable data={data} isLoading={isLoading} />
      </div>
      <CourierModal
        isOpen={isCourierModalOpen}
        onClose={() => setCourierModalOpen(false)}
      />
    </>
  );
}
