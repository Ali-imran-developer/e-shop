import SearchDropdown from "@/components/shared/components/search-filter";
import { useState } from "react";

const suppliers = [
  { label: "ABC Suppliers 1", value: "supplier-1" },
  { label: "ABC Suppliers 2", value: "supplier-2" },
  { label: "ABC Suppliers 3", value: "supplier-3" },
  { label: "ABC Suppliers 4", value: "supplier-4" },
];

const destination = [
  { label: "Lahore", value: "lahore" },
  { label: "Faisalabad", value: "faisalabad" },
  { label: "Multan", value: "multan" },
  { label: "Karachi", value: "karachi" },
];

const SupplierCard = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  const handleChange = (name: "supplier" | "destination", value: string) => {
    if (name === "supplier") {
      setSelectedSupplier(value);
    } else {
      setSelectedDestination(value);
    }
  };

  return (
    <div className="flex w-full flex-col drop-shadow-lg gap-4 rounded-lg border bg-white p-6 shadow-sm lg:flex-row relative">
      <div className="w-full lg:w-1/2">
        <SearchDropdown
          value={selectedSupplier}
          label="Supplier"
          placeholder="Select Supplier"
          options={suppliers}
          onChange={(val: string) => handleChange("supplier", val)}
        />
      </div>

      <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>

      <div className="w-full lg:w-1/2 lg:pl-4">
        <SearchDropdown
          value={selectedDestination}
          label="Destination"
          placeholder="Select destination"
          options={destination}
          onChange={(val: string) => handleChange("destination", val)}
        />
      </div>
    </div>
  );
};

export default SupplierCard;