import { useEffect, useState } from "react";
import { Select, SelectOption } from "rizzui";

export function StatusSelect({
  selectItem,
  options= [],
  onChange,
}: {
  selectItem?: string;
  options: SelectOption[];
  onChange?: (selectedValue: string) => void;
}) {
  useEffect(() => {
    const selectItemValue =
      options?.find((option) => option.label === selectItem) || null;
    setValue(selectItemValue);
  }, []);

  const [value, setValue] = useState<any>();

  const handleChange = (selectedOption: any) => {
    setValue(selectedOption);
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[90px]"
      placeholder="Select Role"
      options={options}
      value={value}
      onChange={handleChange}
      displayValue={(option: { value: any }) => option?.value as string}
    />
  );
}
