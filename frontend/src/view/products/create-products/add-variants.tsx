import { Field, FieldArray } from "formik";
import { Button } from "rizzui";
import TrashIcon from "@/components/shared/components/icons/trash";
import cn from "@/utils/helperFunctions/class-names";
import PencilIcon from "@/components/icons/pencil";
import { useEffect } from "react";

const AddVariants = ({
  formik,
  className,
  completedOptions,
  editProduct,
  setCompletedOptions,
}: any) => {
  const handleDoneClick = (index: number) => {
    setCompletedOptions((prev: any) => ({ ...prev, [index]: true }));
  };
  const handleEditClick = (index: number) => {
    setCompletedOptions((prev: any) => ({ ...prev, [index]: false }));
  };

  useEffect(() => {
    if (editProduct?.options?.length) {
      const initialState = editProduct?.options.reduce(
        (acc: any, _: any, index: number) => {
          acc[index] = true;
          return acc;
        },
        {}
      );
      setCompletedOptions(initialState);
    }
  }, [editProduct]);

  return (
    <>
      <div className={cn("grid gap-5 @3xl:grid-cols-12", className)}>
        <div className="col-span-full @4xl:col-span-4">
          <h4 className="text-base font-medium">Variant</h4>
          <p className="mt-2">Add your variant here</p>
        </div>

        <div className="col-span-full grid gap-2 grid-cols-1 @4xl:col-span-8 border p-4 rounded-lg shadow-sm">
          <FieldArray name="options">
            {({ push, remove }) => (
              <>
                {formik.values.options.map((option: any, index: number) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg shadow-sm grid col-span-3"
                  >
                    {/* {
                      console.log(
                        "@completedOptions[index]",
                        !completedOptions[index] &&
                          formik?.values?.options?.[0]?.values.filter(
                            (val: string) => val.trim() !== ""
                          )?.length < 0
                      ) as any
                    } */}
                    {!completedOptions[index] ? (
                      <>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Option Name
                          </label>
                          <TrashIcon
                            className="h-4 w-4 text-red-600 cursor-pointer"
                            onClick={() => remove(index)}
                          />
                        </div>
                        <Field
                          type="text"
                          name={`options.${index}.name`}
                          placeholder="Enter option name"
                          className=" border rounded-md p-2"
                          onChange={formik.handleChange}
                          value={option.name}
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                          Option Values
                        </label>

                        <FieldArray name={`options.${index}.values`}>
                          {({ push, remove }) => (
                            <div className="flex flex-col">
                              <div className="grid grid-cols-3 gap-1">
                                {option.values.map(
                                  (value: string, vIndex: number) => (
                                    <div
                                      key={vIndex}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="relative w-full">
                                        <Field
                                          name={`options.${index}.values.${vIndex}`}
                                        >
                                          {({ field }: any) => (
                                            <input
                                              {...field}
                                              type="text"
                                              placeholder="Enter option value"
                                              className="w-full border rounded-md p-2 pr-8"
                                              onChange={(e) => {
                                                const newValue = e.target.value;
                                                const values = [
                                                  ...formik.values.options[
                                                    index
                                                  ].values,
                                                ];
                                                values[vIndex] = newValue;

                                                if (
                                                  vIndex ===
                                                    values.length - 1 &&
                                                  newValue.trim() !== ""
                                                ) {
                                                  values.push("");
                                                }

                                                if (
                                                  newValue.trim() === "" &&
                                                  values[vIndex + 1] === ""
                                                ) {
                                                  values.splice(vIndex + 1, 1);
                                                }

                                                formik.setFieldValue(
                                                  `options.${index}.values`,
                                                  values
                                                );
                                              }}
                                            />
                                          )}
                                        </Field>

                                        {option.values.length > 1 && (
                                          <TrashIcon
                                            className="h-4 w-4 text-red-600 absolute right-2 top-3.5 cursor-pointer"
                                            onClick={() => remove(vIndex)}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="flex items-end justify-end mt-4">
                                <Button
                                  type="button"
                                  onClick={() => handleDoneClick(index)}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{option.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.values
                              .filter((value: string) => value.trim() !== "")
                              .map((value: string, vIndex: number) => (
                                <span
                                  key={vIndex}
                                  className="px-2 py-1 bg-gray-200 rounded text-sm"
                                >
                                  {value}
                                </span>
                              ))}
                          </div>
                        </div>
                        <PencilIcon
                          className="h-4 w-4 text-blue-500 cursor-pointer"
                          onClick={() => handleEditClick(index)}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div>
                  {formik.values.options.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => push({ name: "", values: [""] })}
                      className="text-blue-500 text-sm"
                    >
                      + Add another option
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => push({ name: "", values: [""] })}
                    >
                      + Add options like size or color
                    </button>
                  )}
                </div>
              </>
            )}
          </FieldArray>
        </div>
      </div>
    </>
  );
};

export default AddVariants;
