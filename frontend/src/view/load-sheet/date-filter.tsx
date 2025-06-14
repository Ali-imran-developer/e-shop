import { useState, useRef, useEffect } from "react";
import { Button, Input } from "rizzui";
import { DatePicker } from "@ui/datepicker";
import { PiCalendarDuotone } from "react-icons/pi";

export default function SingleDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setDatePickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div>
        <Input
          ref={inputRef}
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          readOnly
          placeholder="Select date"
          className="max-w-fit cursor-pointer"
          onClick={() => setDatePickerVisible(true)}
        />
        <div className="absolute lg:left-40 xs:left-40 top-3">
          <PiCalendarDuotone className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      {isDatePickerVisible && (
        <div ref={datePickerRef} className="absolute z-50 mt-1 w-full">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              setDatePickerVisible(false);
            }}
            placeholderText="Select Date"
            inline
          />
          <div className="mt-2 flex justify-end bg pt-2">
            <Button
              type="button"
              variant="text"
              className="text-gray-500"
              onClick={() => {
                setDatePickerVisible(false);
                setSelectedDate(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="button"
              variant="text"
              onClick={() => {
                console.log("Selected Date:", selectedDate);
                setDatePickerVisible(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
