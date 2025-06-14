import { useState } from "react";
import { PiLockBold, PiGlobeBold } from "react-icons/pi"; // Icons for Public and Private
import { Select, SelectOption, Text } from "rizzui";

export function StatusSelect({
  selectItem,
  options,
}: {
  selectItem?: string;
  options: SelectOption[];
}) {
  const selectItemValue = options.find((option) => option.label === selectItem);
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      placeholder="Select Status"
      options={options}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) => renderOptionDisplayValue(option.value as string)}
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case "Public":
      return (
        <div className="flex items-center">
          <PiGlobeBold className="shrink-0 fill-blue-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
    case "Private":
      return (
        <div className="flex items-center">
          <PiLockBold className="shrink-0 fill-gray-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
    default:
      return null; 
  }
}
