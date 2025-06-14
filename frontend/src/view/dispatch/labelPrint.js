// @ts-ignore
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import { formatDate } from "@/utils/helperFunctions/format-date";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateShippingLabelPDF = async (orders) => {
  if (!orders || orders.length === 0) {
    console.error("No orders selected");
    return;
  }

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const labelImages = [];

  for (let i = 0; i < orders.length; i++) {
    const data = orders[i];
    const htmlString = (data?.products || [])
      .map((item, index, arr) => {
        const name = item?.productData?.name || "";
        const category = item?.productData?.category || "";
        const quantity = item?.quantity || "";
        const separator = index < arr.length - 1 ? " |" : "";
        return `<div style="margin-right: 8px;">${name} | ${category} | (${quantity})${separator}</div>`;
      })
      .join("");
    const label = document.createElement("div");
    label.style.backgroundColor = "#fff";
    label.style.padding = "10px";

    label.innerHTML = ` 
    <div id="label" style="background: white; border-bottom:1px solid transparent; border: 1px solid #636363; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); width: auto; max-width: 900px; text-align: center; margin: auto;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 3px 20px;">
        <div style="max-width: 110px;">
          <img src="/assets/images/honeybee.png" alt="" width="200px" />
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
          ${data?.shipmentDetails?.name ?? ""}
        </div>
      </div>
      <!-- Row: Contact -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Contact:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.shipmentDetails?.phone ?? ""}
        </div>
      </div>
      <!-- Row: Address -->
      <div style="display: flex;  border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Address:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.shipmentDetails?.address ?? ""}
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
           ${data?.shipper?.storeName ?? ""}
        </div>
      </div>
      <!-- Row: Contact -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Contact:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
         ${data?.shipper?.phoneNumber ?? ""}
        </div>
      </div>
      <!-- Row: Address -->
      <div style="display: flex; border-bottom: 1px solid #636363; ">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Address:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
           ${data?.shipper?.returnAddress ?? ""}
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
          ${data?.products?.[0]?.quantity ?? 0}
        </div>
      </div>
      <!-- Row: Order Ref -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
          Order Ref:
        </div>
        <div style="flex: 2; padding: 2px 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.name ?? ""}
        </div>
      </div>
      <!-- Row: Tracking No -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363;  padding: 4px; color: #1f1e1e; text-align: left;">
          Tracking No:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.trackingId ?? ""}
        </div>
      </div>
      <!-- Row: Origin -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Origin:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
         ${data?.shipper?.city ?? ""}
        </div>
      </div>
      <!-- Row: Destination -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; padding: 4px; border-right: 1px solid #636363;  color: #1f1e1e; text-align: left;">
          Destination:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; font-size: 14px; text-align: left;">
          ${data?.shipmentDetails?.city ?? ""}
        </div>
      </div>
      <!-- Row: Remarks -->
      <div style="display: flex;border-bottom: 1px solid #636363; ">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 4px; color: #1f1e1e; text-align: left;">
          Remarks:
        </div>
        <div style="flex: 2; padding: 4px; font-weight: 600; color: black; text-align: left;">
          Handle with Care
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
          ${data?.pricing?.totalPrice ?? ""}
        </div>
      </div>
      <!-- Row: Order Ref -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363; padding: 2px 4px; color: #1f1e1e; text-align: left;">
          Booking Date:
        </div>
        <div style="flex: 1; padding: 2px 4px; font-weight: 600; color: black; text-align: left;">
          ${formatDate(data?.createdAt)}
        </div>
      </div>
      <!-- Row: Tracking No -->
      <div style="display: flex; border-bottom: 1px solid #636363;">
        <div style="flex: 1; border-right: 1px solid #636363;padding: 4px; color: #1f1e1e; text-align: left;">
          Order Type:
        </div>
        <div style="flex: 1; padding: 4px; font-weight: 600; color: black; text-align: left;">
          ${data?.shipmentType ?? ""}
        </div>
      </div>
    
     
      </div>
    </div>
    <!-- Order Details -->
    <div style="display: flex;   text-align: left; color: #1f1e1e; border-bottom: 1px solid #636363;;">
      <div style="padding: 8px; font-weight: 600;">Order Details:</div>
      <div style="padding: 8px; font-weight: 600; color: black;">
        ${htmlString}
      </div>
    </div>
    </div>
    <p style="text-align: center; color: #1f1e1e;  margin: 5px 0;">Printed and Fulfilled by www.shopcart.com</p>
    <div style="color: #1f1e1e; margin-bottom: 10px; text-align: center;">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    </div>
    </div>`;

    container.appendChild(label);
    await delay(50);
    const qrCode = label.querySelector("#qrCode");
    if (qrCode) {
      await QRCode.toCanvas(qrCode, data?.trackingId).catch(console.error);
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
      if (data?.trackingId && data?.trackingId.trim() !== "") {
        const newBarcode = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(newBarcode, data?.trackingId, {
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
    const canvas = await html2canvas(label, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    labelImages.push({ imgData, width: canvas.width, height: canvas.height });
  }

  document.body.removeChild(container);
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const labelMaxWidth = pageWidth - margin * 2;

  // for (let i = 0; i < labelImages.length; i++) {
  //   if (i % 2 === 0) {
  //     if (i > 0) {
  //       pdf.addPage();
  //     }
  //     pdf.addImage(labelImages[i], "PNG", margin, margin, labelWidth, 100);
  //   } else {
  //     pdf.addImage(
  //       labelImages[i],
  //       "PNG",
  //       margin,
  //       margin + labelHeight + margin,
  //       labelWidth,
  //       100
  //     );
  //   }
  // }

  for (let i = 0; i < labelImages.length; i++) {
    const { imgData, width, height } = labelImages[i];

    const aspectRatio = height / width;
    const imgWidth = labelMaxWidth;
    const imgHeight = imgWidth * aspectRatio;

    if (i % 2 === 0) {
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    } else {
      const y = margin + imgHeight + margin;
      if (y + imgHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      } else {
        pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
      }
    }
  }

  const pdfBlobUrl = pdf.output("bloburl");
  window.open(pdfBlobUrl, "_blank");
};
