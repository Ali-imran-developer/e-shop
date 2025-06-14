import { useState } from "react";
import { Input, Button, ActionIcon } from "rizzui";
import { PiPlusBold } from "react-icons/pi";
import TrashIcon from "@/components/shared/components/icons/trash";

interface CustomField {
  label: string;
  value: string;
}

export default function CustomFields() {
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { label: "", value: "" },
  ]);

  const handleChange = (index: number, field: keyof CustomField, value: string) => {
    setCustomFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][field] = value;
      return updatedFields;
    });
  };

  const addCustomField = () => {
    setCustomFields((prevFields) => [...prevFields, { label: "", value: "" }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return (
    <>
      {customFields.map((item, index) => (
        <div key={index} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            // label="Custom Field Name"
            // placeholder="Custom field name"
            className="flex-grow"
            value={item.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
          />
          {customFields.length > 1 && (
            <ActionIcon
              onClick={() => removeCustomField(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} />
      </Button>
    </>
  );
}
