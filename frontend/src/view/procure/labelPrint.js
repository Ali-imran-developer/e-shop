// @ts-ignore
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generateDemandSheetPDF = async (orders) => {
  const label = document.createElement("div");

  const rows = orders
  .map((order, index) => {
    const lineItems = order.lineItems || [];
    const firstLineItem = lineItems[0] || {};

    const totalQuantity = lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

    return `
      <tr>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${index + 1}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${firstLineItem?.name || "N/A"}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${firstLineItem?.sku || "N/A"}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">
          <div style="
            display: inline-block;
            max-width: 150px;
            max-height: 100px;
          ">
            <img 
              src="${firstLineItem?.image}" 
              style="max-width: 100%; height: auto; display: block;"
              width="150"
              height="100"
            />
          </div>
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${totalQuantity}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${firstLineItem?.pendingqty || "N/A"}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${firstLineItem?.availableqty || "N/A"}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td style="border: 1px solid black; padding: 8px; text-align: center; font-size:18px;color:#000000">
          ${firstLineItem?.notes || "N/A"}
        </td>
      </tr>
    `;
  })
  .join("");



  label.innerHTML = `
    <table style="border: 1px solid black; border-collapse: collapse; width: 100%;">
      <thead>
      <p style ="text-align:center;font-size:24px;font-weight:bold;padding-bottom:18px">CLO Stock Demand</p>
        <tr>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Sr</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Product Name</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Style/Color</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Image</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Quantity</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Pening Quantity</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Available</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Order Date</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center; font-weight: 600; font-size:20px">Notes</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.body.appendChild(label);

  await new Promise((resolve) => setTimeout(resolve, 200));

  const canvas = await html2canvas(label, {
    useCORS: true,
    allowTaint: true,
  });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 5;
  const labelWidth = pageWidth - margin * 2;

  pdf.addImage(imgData, "PNG", margin, margin, labelWidth, 0);
  pdf.save("demand_sheet.pdf");

  document.body.removeChild(label);
};
