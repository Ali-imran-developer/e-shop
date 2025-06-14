import UploadIcon from "@/components/shared/components/shape/upload";
import ProductController from "@/controllers/productController";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Button, Modal, Text } from "rizzui";

const CSVUploadModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploadAllowed, setIsUploadAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("jsonData", jsonData);
  const handleCSV = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name); // Store file name
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      try {
        const result = csvToJson(text);
        setJsonData(result.data);
        setErrors(result.errors);
        setIsUploadAllowed(result.errors.length === 0);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        setErrors(["Invalid CSV format"]);
        setIsUploadAllowed(false);
      }
    };
    reader.readAsText(file);
  };

  const parseArrayString = (input?: string): string[] => {
    if (!input) return [];
    const trimmed = input.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      return trimmed
        .slice(1, -1) // remove { and }
        .split(",")
        .map((item) => item.trim());
    }
    return [trimmed]; // return single item as array
  };
  const parseArrayNumber = (input?: string): number[] => {
    if (!input) return [];
    const trimmed = input.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      return trimmed
        .slice(1, -1)
        .split(",")
        .map((item) => Number(item.trim()));
    }
    return [Number(trimmed)];
  };

  function parseCsvRow(row: string): string[] {
    const result = [];
    let current = "";
    let inQuotes = false;
    let inBraces = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === "{") {
        inBraces = true;
      }

      if (char === "}") {
        inBraces = false;
      }

      if (char === "," && !inQuotes && !inBraces) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim()); // push the last value
    return result;
  }

  const csvToJson = (csv: string) => {
    const rows = csv.split("\n").map((row) => parseCsvRow(row));
    const headers = rows[0].map((header) => header.trim());
    const data: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (values.length !== headers.length) continue;

      const obj = {
        // _id: values[headers.indexOf("_id")]?.trim(),
        title: values[headers.indexOf("title")]?.trim(),
        productType: values[headers.indexOf("productType")]?.trim(),
        description: values[headers.indexOf("description")]?.trim(),
        trackStockNull: values[headers.indexOf("trackStockNull")] === "TRUE",
        Images: values[headers.indexOf("images")]?.trim()
          ? values[headers.indexOf("images")]!.trim()
              .split(",")
              .map((opt) => opt.trim())
          : [],
        options: values[headers.indexOf("options")]?.trim()
          ? values[headers.indexOf("options")]!.trim()
              .split(",")
              .map((opt) => opt.trim())
          : [],
        tags: values[headers.indexOf("tags")]
          ? values[headers.indexOf("tags")].split(",").map((tag) => tag.trim())
          : [],
        status: values[headers.indexOf("status")]?.trim(),
        // createdAt: values[headers.indexOf("createdAt")]
        //   ? new Date(values[headers.indexOf("createdAt")])
        //       .toISOString()
        //       .slice(0, 19)
        //   : null,
        seo: {
          title: values[headers.indexOf("seo/title")]?.trim(),
          metaKeywords: values[headers.indexOf("seo/metaKeywords")]?.trim(),
          metaDescription:
            values[headers.indexOf("seo/metaDescription")]?.trim(),
          productUrl: values[headers.indexOf("seo/productUrl")]?.trim(),
        },
        shipping: {
          isCost: values[headers.indexOf("shipping/isCost")] === "TRUE",
          price: Number(values[headers.indexOf("shipping/price")]),
          isLocationBased:
            values[headers.indexOf("shipping/isLocationBased")] === "TRUE",
          ShippingLocation: {
            name: values[
              headers.indexOf("shipping/ShippingLocation/name")
            ]?.trim(),
            price: Number(
              values[headers.indexOf("shipping/ShippingLocation/price")]
            ),
          },
        },
        category: values[headers.indexOf("category")]?.trim(),
        subCategory: values[headers.indexOf("subCategory")]?.trim(),

        identifiers: {
          globalTradeItemNumber:
            values[headers.indexOf("identifiers/globalTradeItemNumber")],
          manufacturerNumber:
            values[headers.indexOf("identifiers/manufacturerNumber")],
          brandName: values[headers.indexOf("identifiers/brandName")]?.trim(),
          productUpc: Number(values[headers.indexOf("identifiers/productUpc")]),
          custom: (() => {
            const names = parseArrayString(
              values[headers.indexOf("identifiers/custom/name")]
            );
            const valuesList = parseArrayString(
              values[headers.indexOf("identifiers/custom/value")]
            );
            const length = Math.max(names.length, valuesList.length);

            return Array.from({ length }, (_, idx) => ({
              name: names[idx] || "",
              value: valuesList[idx] || "",
            }));
          })(),
        },

        variants: values[headers.indexOf("variants/sku")]
          ? [
              {
                sku: values[headers.indexOf("variants/sku")]?.trim(),
                imageId: Number(values[headers.indexOf("variants/imageId")]),
                price: Number(values[headers.indexOf("variants/price")]),
                compareAtPrice: Number(
                  values[headers.indexOf("variants/compareAtPrice")]
                ),
                weight: Number(values[headers.indexOf("variants/weight")]),
                costPerItem: Number(
                  values[headers.indexOf("variants/costPerItem")]
                ),
                stock: {
                  inHand: Number(
                    values[headers.indexOf("variants/stock/inHand")]
                  ),
                  available: Number(
                    values[headers.indexOf("variants/stock/available")]
                  ),
                },
              },
            ]
          : [],
      };

      if (!obj.title) errors.push(`Row ${i + 1}: Missing title`);
      if (!obj.productType) errors.push(`Row ${i + 1}: Missing productType`);
      if (!obj.status) errors.push(`Row ${i + 1}: Missing status`);
      if (obj.variants.length === 0)
        errors.push(`Row ${i + 1}: Missing variants`);

      data.push(obj);
    }

    return { data, errors };
  };

  const handleUploadConfirm = async () => {
    if (jsonData.length === 0) {
      toast.error("No data to upload. Please select a valid CSV file.");
      return;
    }
    setLoading(true);
    try {
      const response = await ProductController.createProduct(jsonData);
      if (!response || response.error) {
        throw new Error(response?.error || "Unknown error occurred");
      }
      toast.success(response?.message || "Product created successfully!");
      onClose();
    } catch (error) {
      console.error("Product creation failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="container mx-auto p-6  ">
        <h2 className="text-lg font-bold mb-2">Upload CSV</h2>
        <div className="relative lg:h-40 flex cursor-pointer justify-center items-center gap-4 rounded-md border-[1.8px] px-6 py-5 transition-all duration-300">
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={handleCSV}
          />
          {fileName ? (
            <Text className="text-base font-medium">{fileName}</Text>
          ) : (
            <>
              <UploadIcon className="h-20 w-20" />
              <Text className="text-base font-medium">Drop or select CSV</Text>
            </>
          )}
        </div>

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <h4 className="font-semibold">Errors Found:</h4>
            <ul className="list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex justify-between">
          {jsonData.length > 0 && (
            <button
              onClick={handleUploadConfirm}
              disabled={!isUploadAllowed || loading}
              className={`px-4 py-2 rounded-md ${
                isUploadAllowed
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white`}
            >
              {loading ? "Uploading..." : "Upload Data"}
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CSVUploadModal;
