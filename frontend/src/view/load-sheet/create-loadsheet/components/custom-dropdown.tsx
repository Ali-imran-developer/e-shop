import { useState, useRef, useEffect } from "react";
import { PiCaretDownBold } from "react-icons/pi";

type Courier = {
  courierId: string;
  name: string;
};

type CourierLogo = {
  _id: string;
  name: string;
  logo: string;
};

type CustomCourierDropdownProps = {
  couriers: Courier[];
  couriersLogo: CourierLogo[];
  onSelect: (courierId: string, id: string) => void;
  selectedCourier: any;
};

export default function CustomCourierDropdown({
  couriers,
  couriersLogo,
  onSelect,
  selectedCourier,
}: CustomCourierDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLogo = couriersLogo.find(
    (logoItem) => logoItem._id === selectedCourier.selectedCourierId
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("@selectedCourier", selectedCourier);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-full h-[5rem]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-2 border rounded shadow-sm bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {selectedLogo && (
            <img
              src={selectedLogo.logo}
              alt="Logo"
              className="w-8 h-8 rounded object-contain"
            />
          )}
          <span>{selectedLogo?.name || "Select a courier"}</span>
        </div>
        <PiCaretDownBold
          className={`text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {couriers.map((courier: any) => {
            const match = couriersLogo.find(
              (logoItem) => logoItem._id === courier.courierId
            );

            return (
              <div
                key={courier.courierId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => {
                  onSelect(courier._id, courier?.courierId);
                  setIsOpen(false);
                }}
              >
                {match && (
                  <img
                    src={match.logo}
                    alt={courier.name}
                    className="w-8 h-8 rounded object-contain"
                  />
                )}
                <span>{courier.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
