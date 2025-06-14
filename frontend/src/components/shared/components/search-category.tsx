import { useState, useMemo, useEffect, useRef } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { Input } from "rizzui";

interface CategoryOption {
  categoryId: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: CategoryOption) => void;
  options: CategoryOption[];
  placeholder?: string;
}

const CategorySelectInput = ({
  value,
  onChange,
  options,
  placeholder = "Select a category",
}: Props) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  // Sync search display with value
  useEffect(() => {
    const selected = options.find((opt) => opt.categoryId === value);
    if (selected) {
      setSearch(selected.name);
    } else {
      setSearch("");
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filtered = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  const handleSelect = (val: CategoryOption) => {
    onChange(val);
    setSearch(val.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative z-20" ref={inputRef}>
      <Input
      label = "Select Parant Category"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full"
      />
      <div className="pointer-events-none absolute right-4 top-12 -translate-y-1/2 text-gray-500">
        <PiCaretDownBold
          className={`transition-transform duration-300 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </div>

      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 w-full max-h-48 overflow-auto bg-white border border-gray-300 rounded-md shadow-sm mt-1"
        >
          {filtered.map((item) => (
            <li
              key={item.categoryId}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelectInput;
