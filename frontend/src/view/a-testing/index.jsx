import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import { Button } from "rizzui";
import { orders } from "./jsoncode";

// A helper function to pause execution for a given time (ms)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateShippingLabelPDF = async (orders) => {
  if (!orders || orders.length === 0) {
    console.error("No orders selected");
    return;
  }

  // Create a hidden container to hold label elements
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const labelImages = [];

  // Loop over each order to generate its label
  for (let i = 0; i < orders.length; i++) {
    const data = orders[i];
    const label = document.createElement("div");
    // Insert your HTML template with dynamic data
    label.innerHTML = `
         <div
  id="label"
  style="background: white; border-bottom:1px solid transparent; border: 1px solid #636363; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); width: auto; max-width: 900px; text-align: center; margin: auto;"
>
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: center; margin: 3px 20px;">
    <div style="max-width: 110px;">
      <img src="../../../public/assets/images/honeybee.png" alt="PostEx" width="100%" />
    </div>
    <div style="text-align: center;">
      <!-- Barcode for Tracking ID -->
      <div id="barcodeTrackingId"></div>
    </div>
    <div style="text-align: center;">
      <!-- Barcode for Tracking Number -->
      <div id="barcodeTrackingNumber"></div>
    </div>
  </div>

  <!-- Main Content Grid (3 columns) -->
  <div style="display: grid; grid-template-columns: repeat(3, 1fr);">
    <!-- Consignee Section -->
    <div style="border-top: 1px solid #636363; border-right: 1px solid #636363; border-bottom: 1px solid #636363; ">
      <div
        style="background: #fff; border-bottom: 1px solid #636363; font-weight: 500; padding: 8px; color: black; text-align: left;"
      >
        Consignee
      </div>
      <!-- Row: Name -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; font-size: 14px; color: #1f1e1e; text-align: left;">
          Name:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; font-size: 14px; color: black; text-align: left;">
          ${data?.billing_address?.name || "N/A"}
        </div>
      </div>
      <!-- Row: Contact -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Contact:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.billing_address?.phone || "N/A"}
        </div>
      </div>
      <!-- Row: Address -->
      <div style="display: flex;  border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Address:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.billing_address?.address1 || "N/A"}
        </div>
      </div>

      <div style="display: flex; border-bottom: 1px solid #636363;">

          <div
        style="background: #fff; font-weight: 500; padding: 8px; color: black; text-align: left;"
      >
         Shipper Details
      </div>

      </div>
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; font-size: 14px; color: #1f1e1e; text-align: left;">
          Name:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; font-size: 14px; color: black; text-align: left;">
          ${data?.billing_address?.name || "N/A"}
        </div>
      </div>
      <!-- Row: Contact -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Contact:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.billing_address?.phone || "N/A"}
        </div>
      </div>
      <!-- Row: Address -->
      <div style="display: flex; border-bottom: 1px solid #636363; ">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Address:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.billing_address?.address1 || "N/A"}
        </div>
      </div>
    </div>

    <!-- Shipment Information Section -->
    <div style="border-top: 1px solid #636363; border-bottom: 1px solid #636363; ">
      <div
        style="background: #fff; border-bottom: 1px solid #636363; font-weight: 500; padding: 8px; color: black; text-align: left;"
      >
        Shipment Information
      </div>
      <!-- Row: Piece(s) -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
          Piece(s):
        </div>
        <div style="flex: 2; padding: 2px 4px; font-weight: 600; color: black; font-size: 16px; text-align: left;">
          ${data?.line_items?.[0]?.quantity || "N/A"}
        </div>
      </div>
      <!-- Row: Order Ref -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
          Order Ref:
        </div>
        <div style="flex: 2; padding: 2px 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.name || "N/A"}
        </div>
      </div>
      <!-- Row: Tracking No -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363;  padding: 4px; color: #1f1e1e; text-align: left;">
          Tracking No:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.tracking_number || "N/A"}
        </div>
      </div>
      <!-- Row: Origin -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Origin:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.shipping_address?.city || "N/A"}
        </div>
      </div>
      <!-- Row: Destination -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; padding: 4px; border-right: 1px solid #636363;  color: #1f1e1e; text-align: left;">
          Destination:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; font-size: 14px; text-align: left;">
          ${data?.billing_address?.city || "N/A"}
        </div>
      </div>
      <!-- Row: Remarks -->
      <div style="display: flex;border-bottom: 1px solid #636363; ">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Remarks:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          Good Product
        </div>
      </div>
    </div>

    <!-- Shipment Information Section -->
    <div style="border-top: 1px solid #636363; border-left: 1px solid #636363; border-bottom: 1px solid #636363;">
      <div
        style="background: #fff; border-bottom: 1px solid #636363; font-weight: 500; padding: 8px; color: black; text-align: left;"
      >
   Order Information

      </div>
      <!-- Row: Piece(s) -->
      <div style="height:120px;display:flex;justify-content:center;align-items:center">
      <canvas id="qrCode"></canvas>

      </div>
      <div style="display: flex; border-top: 1px solid #636363; border-bottom: 1px solid #636363;">
        <div style="flex: 1;   border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
         Amount:
        </div>
        <div style="flex: 1; padding: 2px 4px; font-weight: 600; color: black; font-size: 16px; text-align: left;">
          ${data?.line_items?.[0]?.quantity || "N/A"}
        </div>
      </div>
      <!-- Row: Order Ref -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
          Booking Date:
        </div>
        <div style="flex: 1; padding: 2px 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.name || "N/A"}
        </div>
      </div>
      <!-- Row: Tracking No -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363;padding: 4px; color: #1f1e1e; text-align: left;">
          Order Type:
        </div>
        <div style="flex: 1; padding: 4px; font-weight: 600; color: black; text-align: left;">
          dsdadsdsad
        </div>
      </div>

      </div>
    </div>
    <!-- Order Details -->
    <div style="display: flex;   text-align: left; color: #1f1e1e; border-bottom: 1px solid #636363;">
      <div style="padding: 8px; font-weight: 600;">Order Details:</div>

      <div style="padding: 8px; font-weight: 600; color: black; display: flex;  gap: 10px;">
  ${
    data?.lineItems?.length > 0
      ? data.lineItems
          .map(
            (item) =>
              `<div style="display: flex; gap: 10px;">
                <span>${item?.name || "N/A"}</span>
                <span>${item?.sku || "N/A"}</span>
                <span>(${item?.quantity || "N/A"})</span>|
              </div>`
          )
          .join("")
      : "N/A"
  }
</div>
</div>
    </div>
    <p style="text-align: center; color: #1f1e1e;  margin: 5px 0;">Printed and Fulfilled by www.shopilam.com</p>
    <div style=" color: #1f1e1e;  margin-bottom: 10px;">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </div>
  </div>

</div>`;

    container.appendChild(label);

    await delay(50);

    const qrCode = label.querySelector("#qrCode");
    if (qrCode) {
      await QRCode.toCanvas(qrCode, data?.tracking_number).catch(console.error);
    }

    const barcodeTrackingId = label.querySelector("#barcodeTrackingId");
    if (barcodeTrackingId) {
      barcodeTrackingId.innerHTML = "";
      if (data?.name && data.name.trim() !== "") {
        const newBarcode = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(newBarcode, data.name, {
          format: "CODE128",
          displayValue: true,
          width: 1.5,
          height: 30,
          margin: 2,
        });
        barcodeTrackingId.appendChild(newBarcode);
      } else {
        barcodeTrackingId.innerText = "N/A";
      }
    }

    const barcodeTrackingNumber = label.querySelector("#barcodeTrackingNumber");
    if (barcodeTrackingNumber) {
      barcodeTrackingNumber.innerHTML = "";
      if (data?.tracking_number && data.tracking_number.trim() !== "") {
        const newBarcode = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(newBarcode, data.tracking_number, {
          format: "CODE128",
          displayValue: true,
          width: 1,
          height: 30,
          margin: 0,
        });
        barcodeTrackingNumber.appendChild(newBarcode);
      } else {
        barcodeTrackingNumber.innerText = "N/A";
      }
    }

    await delay(100);

    const canvas = await html2canvas(label);
    const imgData = canvas.toDataURL("image/png");
    labelImages.push(imgData);
  }

  // document.body.removeChild(container);

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const labelWidth = pageWidth - margin * 2;
  const labelHeight = (pageHeight - margin * 2) / 2;

  for (let i = 0; i < labelImages.length; i++) {
    // For even index (first label on page)
    if (i % 2 === 0) {
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(labelImages[i], "PNG", margin, margin, labelWidth, 120);
    } else {
      // For odd index (second label on page), position below the first one
      pdf.addImage(
        labelImages[i],
        "PNG",
        margin,
        margin + labelHeight + margin,
        labelWidth,
        120
      );
    }
  }

  // Save the merged PDF
  pdf.save("shipping_label.pdf");
};

const Testing = () => {
  return (
    <>
      <Button onClick={() => generateShippingLabelPDF(orders)}>Download</Button>
      <div id="label"></div>
    </>
  );
};
export default Testing;
