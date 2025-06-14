
import React from "react";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";


interface SearchInputProps {
  value: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onSearch, onClear }) => {
  return (
    <Input
      type="search"
      clearable={true}
      inputClassName="h-[36px]"
      placeholder="Search all fields..."
      onClear={onClear}
      value={value}
      prefix={<PiMagnifyingGlassBold className="size-4" />}
      onChange={onSearch}
      className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2"
    />
  );
};

export default SearchInput;
