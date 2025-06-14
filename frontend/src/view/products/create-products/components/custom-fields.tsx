import { Input } from "rizzui";

export default function CustomFields({ formik }: { formik: any }) {
  return (
    // <FieldArray name="customFields">
    //   {({ push, remove }) => (
    //     <>
    //       {formik?.values?.customFields?.map((item: any, index: number) => (
            <div className="col-span-full flex gap-4 xl:gap-7">
              <Input
                label="Custom Field Name"
                placeholder="custom field name"
                className="flex-grow"
                name="identifiers.custom[0].name"
                value={formik?.values?.identifiers?.custom[0].name}
                onChange={formik?.handleChange}
                error={formik?.errors?.identifiers?.custom[0].name}
              />
              <Input
                label="Custom Field Value"
                placeholder="custom field value"
                className="flex-grow"
                name="identifiers.custom[0].value"
                value={formik?.values?.identifiers?.custom[0].value}
                onChange={formik?.handleChange}
                error={formik?.errors?.identifiers?.custom[0].value}
              />
            </div>
    //           {/* {formik.values.customFields.length > 1 && (
    //             <ActionIcon
    //               onClick={() => remove(index)}
    //               variant="flat"
    //               className="mt-7 shrink-0"
    //             >
    //               <TrashIcon className="h-4 w-4" />
    //             </ActionIcon>
    //           )}
    //         </div>
    //       ))}
    //       <Button
    //         onClick={() => push({ name: "", value: "" })}
    //         variant="outline"
    //         className="col-span-full ml-auto w-auto"
    //       >
    //         <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> Add Item
    //       </Button>
    //     </>
    //   )}
    // </FieldArray> */}
  )
}
