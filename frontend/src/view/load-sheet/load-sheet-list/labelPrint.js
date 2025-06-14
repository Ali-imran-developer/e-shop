// @ts-ignore
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateLabelPDF = async (orders) => {
  if (!orders || orders.length === 0) {
    console.error("No orders selected");
    return;
  }

  console.log(orders);
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const labelImages = [];

  for (let i = 0; i < orders.length; i++) {
    const data = orders[i];
    const label = document.createElement("div");
    label.innerHTML = ` 
    <div id="label">
          <div style="font-family: Arial, sans-serif; margin: 20px; padding: 0; line-height: 1.4;">
            <!-- Header Table -->
            <table style="border-collapse: collapse; width: 100%; border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;">
                <tr>
                    <td
                        style="border: 1px solid black; padding: 5px 10px; width: 33%; font-weight: bold; text-align: center; height: 30px;">
                        Honey Bee</td>
                    <td
                        style="border: 1px solid black; padding: 5px 10px; width: 33%; text-align: center; font-weight: bold; height: 30px;">
                        Load Sheet</td>
                    <td
                        style="border: 1px solid black; padding: 5px 10px; width: 33%; text-align: center; font-weight: bold; height: 30px;">
                        QR Code</td>
                </tr>
            </table>

            <!-- Information Table -->
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px; border: 1px solid black;">
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px; width: 33%;">Shipper</td>
                    <td style="border: 1px solid black; padding: 5px 10px; width: 33%;">${data?.buisnessName ?? ""}</td>
                    <td rowspan="8" style="border: 1px solid black; padding: 5px 100px; width: 33%; text-align: center;">
                        <canvas id="qrCode" style="width: 400px;"></canvas>
                    </td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Loadsheet Number</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.merchantUniqueId ?? ""}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Person Of Contact</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.referencePhone}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Pickup Address</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.address ?? ""}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Origin</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.city}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Total Shipment(s)</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.orderCount}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">Total Amount</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.totalCOD}</td>
                </tr>
            </table>

            <!-- Shipment Table -->
            <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px; border: 1px solid black;">
                <tr>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        S.No</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Tracking No</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Order Reference</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Consignee Detail</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Booking Date</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Destination</th>
                    <th
                        style="border: 1px solid black; padding: 5px 10px; font-weight: normal; background-color: #f2f2f2; text-align: left;">
                        Invoice Amount</th>
                </tr>
                <tr>
                    <td style="border: 1px solid black; padding: 5px 10px;">1</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.tracking}</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.orderId}</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.consigneeDetail}</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.bookingDate}</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.destination}</td>
                    <td style="border: 1px solid black; padding: 5px 10px;">${data?.totalCOD}</td>
                </tr>
            </table>

            <!-- Signature Section 1 -->
            <div style="margin-top: 20px; margin-bottom: 20px; display: flex; width: 100%;">
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">No of Shipments Received:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1;"></div>
                </div>
                <div style="width: 20px;"></div>
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">Client Signature:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1;"></div>
                </div>
            </div>

            <!-- Signature Section 2 -->
            <div style="margin-top: 20px; margin-bottom: 20px; display: flex; width: 100%;">
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">Rider Name:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1; padding-bottom: 5px;">
                        <span style="padding-left: 10px;"></span>
                    </div>
                </div>
                <div style="width: 20px;"></div>
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">Shipment Picked at:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1;"></div>
                </div>
            </div>

            <!-- Signature Section 3 -->
            <div style="margin-top: 20px; margin-bottom: 20px; display: flex; width: 100%;">
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">Rider Signature:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1;"></div>
                </div>
                <div style="width: 20px;"></div>
                <div style="display: flex; width: 50%; align-items: center;">
                    <div style="font-weight: normal; margin-right: 10px;">Office Signature:</div>
                    <div style="border-bottom: 1px solid black; height: 1px; flex-grow: 1;"></div>
                </div>
            </div>
        </div>
    </div>`;

    container.appendChild(label);
    await delay(50);
    const qrCode = label.querySelector("#qrCode");
    if (qrCode) {
      await QRCode.toCanvas(qrCode, data?.merchantUniqueId).catch(
        console.error
      );
      // await QRCode.toCanvas(qrCode, 3232323).catch(console.error);
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
      if (
        data?.tracking?.tracking_no &&
        data?.tracking?.tracking_no.trim() !== ""
      ) {
        const newBarcode = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        JsBarcode(newBarcode, data?.tracking?.tracking_no, {
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

  document.body.removeChild(container);
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const labelWidth = pageWidth - margin * 2;
  const labelHeight = (pageHeight - margin * 2) / 2;

  for (let i = 0; i < labelImages.length; i++) {
    if (i % 2 === 0) {
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(labelImages[i], "PNG", margin, margin, labelWidth, 100);
    } else {
      pdf.addImage(
        labelImages[i],
        "PNG",
        margin,
        margin + labelHeight + margin,
        labelWidth,
        100
      );
    }
  }

  pdf.save("load_sheet_label.pdf");
};
