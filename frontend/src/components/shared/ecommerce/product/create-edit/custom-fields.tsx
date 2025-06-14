import { FieldArray } from "formik";
import { Input, Button, ActionIcon } from "rizzui";
import TrashIcon from "@shared/components/icons/trash";
import { PiPlusBold } from "react-icons/pi";

export default function Identifiers({ formik }: { formik: any }) {
  return (
    <FieldArray name="identifiers.custom">
      {({ push, remove }) => (
        <>
          {formik?.values?.identifiers?.custom?.map(
            (item: any, index: number) => (
              <div key={index} className="col-span-full flex gap-4 xl:gap-7">
                <Input
                  label="Custom Field Name"
                  placeholder="Custom field name"
                  className="flex-grow"
                  name={`identifiers.custom[${index}].name`}
                  value={
                    formik?.values?.identifiers?.custom?.[index]?.name || ""
                  }
                  onChange={formik?.handleChange}
                  error={formik?.errors?.identifiers?.custom?.[index]?.name}
                />
                <Input
                  label="Custom Field Value"
                  placeholder="Custom field value"
                  className="flex-grow"
                  name={`identifiers.custom[${index}].value`}
                  value={
                    formik?.values?.identifiers?.custom?.[index]?.value || ""
                  }
                  onChange={formik?.handleChange}
                  error={formik?.errors?.identifiers?.custom?.[index]?.value}
                />
                {formik?.values?.identifiers?.custom?.length > 1 && (
                  <ActionIcon
                    onClick={() => remove(index)}
                    variant="flat"
                    className="mt-7 shrink-0"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </ActionIcon>
                )}
              </div>
            )
          )}
          <Button
            onClick={() => push({ name: "", value: "" })}
            variant="outline"
            className="col-span-full ml-auto w-auto"
          >
            <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
          </Button>
        </>
      )}
    </FieldArray>
  );
}
