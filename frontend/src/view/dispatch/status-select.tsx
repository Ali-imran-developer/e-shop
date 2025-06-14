import { sellingOnlineSchema } from "@/validators/multistep-form.schema";
import { useEffect, useState } from "react";
import { Select, SelectOption } from "rizzui";

export const StatusSelect = ({
  options,
  onChange,
  name,
  placeholder,
}: {
  selectItem?: string;
  options: SelectOption[];
  name?: string;
  placeholder?: string;
  onChange?: (selectedValue: string) => void;
}) => {
  const [value, setValue] = useState<any>();

  const handleChange = (selectedOption: { value: string }) => {
    setValue((prev: any) => {
      const updatedValue = name
        ? { ...prev, [name]: selectedOption.value }
        : selectedOption.value;
      if (onChange) {
        onChange(updatedValue);
      }
      return updatedValue;
    });
  };

  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[90px]"
      placeholder={placeholder}
      options={options}
      value={options.find((item) =>
        typeof value === "string"
          ? item.value === value
          : name !== undefined && item.value === value?.[name]
      )}
      onChange={handleChange}
      displayValue={(option: { label: any }) => option?.label as string}
    />
  );
};
