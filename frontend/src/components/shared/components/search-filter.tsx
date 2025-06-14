import { useState, useRef, useEffect } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { Input } from "rizzui";

interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

interface SearchDropdownProps {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  getOptionValue?: (option: OptionType) => string;
  dropdownClassName?: string;
  className?: string;
}

const SearchDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
  getOptionValue = (option) => option?.value,
  dropdownClassName,
  className,
}: SearchDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options?.find((s) => getOptionValue(s) === value)?.label || placeholder;

  const filteredOptions = options?.filter((supplier) =>
    supplier?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className={`w-full justify-between flex items-center hover:border-primary transition duration-200 ring-[0.6px] hover:ring-primary focus:border-primary focus:ring-[0.8px] focus:ring-primary border border-muted ring-muted bg-transparent px-3 py-2 text-sm h-10 rounded-md pe-2.5 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <span className="truncate">{selectedLabel}</span>
          <PiCaretDownBold
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div
            className={`absolute z-30 mt-1 w-full bg-white border rounded-md shadow-md ${dropdownClassName}`}
          >
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border-b text-gray-700 w-full"
            />
            <ul className="divide-y max-h-52 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={getOptionValue(option)}
                    onClick={() => handleSelect(getOptionValue(option))}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SearchDropdown;
