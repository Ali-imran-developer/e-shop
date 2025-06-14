import React from "react";
import { Field } from "formik";
import cn from "@/utils/helperFunctions/class-names";
import { Input } from "rizzui";

function cartesianProduct<T>(arrays: T[][]): T[][] {
  return arrays?.reduce<T[][]>(
    (acc, curr) => {
      const result: T[][] = [];
      acc?.forEach((prev) => {
        curr?.forEach((value) => {
          result?.push([...prev, value]);
        });
      });
      return result;
    },
    [[]]
  );
}

const VariantTable = ({ formik, setBase64Images }: any) => {
  const valuesArrays = formik?.values?.options
    ?.filter((opt: any) => Array.isArray(opt?.values) && opt.values.length > 0)
    ?.map((opt: any) => opt.values.filter((val: string) => val.trim() !== ""));

  const combinations = cartesianProduct(valuesArrays);
  const optionNames = formik?.values?.options?.map((opt: any) => opt?.name);
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const id = Date.now();
        const newImage = {
          id: id,
          url: base64String,
        };

        formik.setFieldValue("images", [...formik.values.images, newImage]);
        setBase64Images((prev: any) => [...prev, newImage]);
        const currentVariant = formik.values.variants[index] || {};
        formik.setFieldValue(`variants.${index}`, {
          ...currentVariant,
          imageId: id,
          stock: currentVariant.stock || {
            available: currentVariant.stock?.available ?? 0,
            inHand: currentVariant.stock?.inHand ?? 0,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("grid gap-5 @3xl:grid-cols-12 py-4")}>
      <div className="col-span-full @4xl:col-span-4">
        <h4 className="text-base font-medium">Display Variant</h4>
        <p className="mt-2">Display your variant here</p>
      </div>
      <div className="col-span-full grid gap-2 grid-cols-1 @4xl:col-span-8 border p-4 rounded-lg shadow-sm">
        {
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Image</th>

                {optionNames.map((name: string, idx: number) => (
                  <th
                    key={idx}
                    style={{ textAlign: "left", padding: "0.5rem" }}
                  >
                    {/* {name} */}
                  </th>
                ))}
                <th style={{ textAlign: "left", padding: "0.5rem" }}>SKU</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Price</th>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>
                  Available
                </th>
              </tr>
            </thead>
            <tbody>
              {combinations?.map((combo: any, index: number) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}>
                    {" "}
                    <label className="cursor-pointer flex justify-center">
                      <div
                        className={cn(
                          "cursor-pointer w-full max-w-[50px] min-h-[50px] rounded-md flex justify-center items-center bg-white",
                          formik.values.variants[index]?.imageId
                            ? ""
                            : "border-2 border-dashed border-[#ebebeb]"
                        )}
                      >
                        {formik.values.variants[index]?.imageId ? (
                          <img
                            src={
                              formik.values.images.find(
                                (item: { id: number }) =>
                                  item.id ===
                                  formik.values.variants?.[index]?.imageId
                              )?.url
                            }
                            alt="variant preview"
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <img
                            src="/assets/images/variantPlaceHolder.svg"
                            alt="variant placeholder"
                            width={15}
                            height={15}
                          />
                        )}
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, index)}
                      />
                    </label>
                  </td>

                  {combo.map((value: string, idx: number) => {
                    return (
                      <td
                        key={idx}
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {value}
                        {idx !== combo.length - 1 && "-"}
                      </td>
                    );
                  })}

                  <td style={{ padding: "0.5rem" }}>
                    <Input
                      name={`variants.${index}.sku`}
                      placeholder={`SKU-${combo.join("-")}`}
                      className="w-full border rounded-md"
                      value={
                        formik.values.variants?.[index]?.sku ||
                        `SKU-${combo.join("-")}`
                      }
                      onChange={(e) =>
                        formik.setFieldValue(
                          `variants.${index}.sku`,
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td style={{ padding: "0.5rem" }}>
                    <Field
                      name={`variants.${index}.price`}
                      type="number"
                      className="w-full border rounded-md p-2"
                      placeholder="Rs 0.00"
                    />
                  </td>
                  <td style={{ padding: "0.5rem" }}>
                    <Field
                      name={`variants.${index}.stock.available`}
                      type="number"
                      placeholder="0"
                      className="w-full border rounded-md p-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default VariantTable;