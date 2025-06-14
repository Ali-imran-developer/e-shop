import { PiDownloadSimpleBold, PiPaypalLogoBold, PiPrinter } from "react-icons/pi";
import InvoiceDetails from "./invoice-details";
import PageHeader from "@shared/page-header";
import { metaObject } from "@/config/site.config";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useInvoiceDetail } from "@/hooks/invoice-detail-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { useModal } from "@/components/shared/modal-views/use-modal";
import PayNowModal from "./PayNowModal";

export const metadata = {
  ...metaObject("Invoice"),
};

const pageHeader = {
  title: "Invoice Details",
  breadcrumb: [
    {
      href: "/",
      // href: routes.eCommerce.dashboard,
      name: "Home",
    },
    {
      href: routes.invoice.home,
      name: "Invoice",
    },
    {
      name: "Details",
    },
  ],
};

async function handleDowload() {
  //const html2pdf = await require('html2pdf.js');

  const element = document.getElementById("invoice");
  var opt = {
    margin: 0.5,
    filename: "invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: window.devicePixelRatio },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  // html2pdf().from(element).set(opt).save();
}

export default function InvoiceDetailsPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn: any = useReactToPrint({ contentRef });
  const { handleGetInvoiceDetail } = useInvoiceDetail();
  const { data, isDataLoaded } = useAppSelector((state) => state.InvoiceDetail);
  console.log("IndexData", data);
  useEffect(() => {
    if (!isDataLoaded) {
      handleGetInvoiceDetail();
    }
  }, [isDataLoaded, handleGetInvoiceDetail]);

     const {
        onClose: closePayNow,
        show: showPayNow,
        onOpen: openPayNow,
      } = useModal();

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data-html2canvas-ignore
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <Button onClick={openPayNow as any} className="w-full @lg:w-auto">
            <PiPaypalLogoBold className="me-1.5 h-[17px] w-[17px]" />
            Pay Now
          </Button>

          <Button onClick={reactToPrintFn} className="w-full @lg:w-auto">
            <PiPrinter className="me-1.5 h-[17px] w-[17px]" />
            Print
          </Button>

          <Button onClick={handleDowload} className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>

      <div id="invoice" ref={contentRef}>
        <InvoiceDetails />
      </div>

       {/* Modals */}
      <PayNowModal show={showPayNow} onClose={closePayNow} />

    </>
  );
}
