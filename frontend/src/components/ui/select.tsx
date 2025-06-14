import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface DynamicSelectProps {
  options: Option[];
  value?: string | number;
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange} className="border-gray-400 rounded-lg">
      <option value="" disabled>
        {placeholder}
      </option>
      {ensureArray(options)?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default DynamicSelect;