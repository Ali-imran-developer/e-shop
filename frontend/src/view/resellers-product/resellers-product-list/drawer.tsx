import TrashIcon from "@/components/shared/components/icons/trash";
import SearchDropdown from "@/components/shared/components/search-filter";
import { routes } from "@/config/routes";
import ResaleProductController from "@/controllers/resaleProductController";
import { useCategories } from "@/hooks/categories";
import { useAppSelector } from "@/hooks/store-hook";
import cn from "@/utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { validationSchema } from "@/validators/listProduct-schema";
import { Field, FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Input, Select, Text, Title } from "rizzui";

export default function ResellersDrawer({
  isDrawerOpen,
  closeDrawer,
  row,
  allRows,
}: {
  isDrawerOpen: any;
  row?: any;
  allRows?: any;
  closeDrawer: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useAppSelector((state) => state.Categories);
  const [publicCategories, setPublicCategories] = useState([]);
  const { handleGetPublicCategories } = useCategories();
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetPublicCategories().then((e) => setPublicCategories(e));
  }, []);

  const initialValues = {
    category: "",
    subCategory: "",
    isList: true,
    discount: null,
    inventory: null,
    threshold: 0,
    shippingCharges: [{ fromPrice: 0, toPrice: 0, totalPrice: 0 }],
  };

  const CategoriesOptions = ensureArray(publicCategories)?.map((product) => ({
    value: product,
    label: product?.name,
  }));

  console.log("@subCategoryOptions", subCategoryOptions);

  const SubCategoriesOptions = ensureArray(
    subCategoryOptions?.subCategory
  )?.map((product) => ({
    value: product,
    label: product,
  }));

  const handleSubmit = async (values: any) => {
    try {
      console.log("@values", values);
      setIsLoading(true);
      const idList = allRows?.length > 0 ? allRows : [row];
      const allApiCalls = ensureArray(idList).map((productId: string) => {
        console.log("API calling for:", values, productId);
        return ResaleProductController.getResaleProducts(values, productId);
      });
      const responses = await Promise.all(allApiCalls);
      console.log("responses", responses);
      toast.success("Product listed successfully!");
      navigate(routes.reselling.showCase);
    } catch (error) {
      console.error("Error listing products:", error);
      toast.error("Failed to list products!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="@container">
      <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => {
            const handleDiscountChange = (e: any) => {
              let value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                const numericValue = parseFloat(value);
                if (value === "" || (numericValue >= 1 && numericValue <= 99)) {
                  formik.setFieldValue(
                    "discount",
                    value === "" ? null : numericValue
                  );
                }
              }
            };

            const handleInventoryChange = (e: any) => {
              let value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                const numericValue = parseFloat(value);
                if (value === "" || (numericValue >= 1 && numericValue <= 99)) {
                  formik.setFieldValue(
                    "inventory",
                    value === "" ? null : numericValue
                  );
                }
              }
            };

            return (
              <form
                onSubmit={formik.handleSubmit}
                className={cn(
                  "space-y-3 !h-full py-6 px-3 flex flex-col justify-between"
                )}
              >
                <div className="space-y-3">
                  <Title as="h3" className="pb-2">
                    List Products:
                  </Title>

                  <div className="flex flex-col space-y-3">
                    <Input
                      label="Discount"
                      type="number"
                      placeholder="0.00"
                      name="discount"
                      value={formik?.values?.discount as any}
                      onChange={handleDiscountChange}
                      suffix="%"
                      error={
                        formik?.touched?.discount && formik?.errors?.discount
                          ? formik?.errors?.discount
                          : undefined
                      }
                      className="flex-grow"
                    />
                    <Input
                      label="Inventory"
                      type="number"
                      placeholder="Inventory"
                      name="inventory"
                      value={formik?.values?.inventory as any}
                      onChange={handleInventoryChange}
                      suffix="%"
                      error={
                        formik?.touched?.inventory && formik?.errors?.inventory
                          ? formik?.errors?.inventory
                          : undefined
                      }
                      className="flex-grow"
                    />
                    {/* <Input
                    label="Threshold"
                    placeholder="Threshold"
                    name="threshold"
                    value={formik?.values?.threshold}
                    onChange={formik?.handleChange}
                    error={
                      formik?.touched?.threshold && formik?.errors?.threshold
                        ? formik?.errors?.threshold
                        : undefined
                    }
                    className="flex-grow"
                  /> */}

                    <Select
                      options={CategoriesOptions}
                      value={formik?.values?.category}
                      name="category"
                      label="Categories"
                      placeholder="Select Category"
                      onChange={(selected: any) => {
                        formik?.setFieldValue("category", selected?.name);
                        setSubCategoryOptions(selected);
                      }}
                      getOptionValue={(option) => option?.value}
                      dropdownClassName="h-auto"
                      error={
                        formik?.touched?.category && formik?.errors?.category
                          ? formik?.errors?.category
                          : undefined
                      }
                    />

                    <SearchDropdown
                      label="Sub Category"
                      options={SubCategoriesOptions}
                      value={formik?.values?.subCategory}
                      placeholder="Select SubCategory"
                      getOptionValue={(option) => option?.value}
                      onChange={(value) => {
                        formik.setFieldValue("subCategory", value);
                      }}
                      dropdownClassName="h-auto"
                      error={
                        formik?.touched?.subCategory &&
                        formik?.errors?.subCategory
                          ? formik?.errors?.subCategory
                          : undefined
                      }
                    />

                    {/* <div className="flex flex-col space-y-3">
                      <Input
                        label="Discount"
                        type="number"
                        placeholder="0.00"
                        name="discount"
                        value={formik?.values?.discount ?? ""}
                        onChange={formik?.handleChange}
                        suffix="%"
                        error={
                          formik?.touched?.discount && formik?.errors?.discount
                            ? formik?.errors?.discount
                            : undefined
                        }
                        className="flex-grow"
                      />
                      <Input
                        label="Inventory"
                        type="number"
                        placeholder="Inventory"
                        name="inventory"
                        value={formik?.values?.inventory ?? ""}
                        onChange={formik?.handleChange}
                        suffix="%"
                        error={
                          formik?.touched?.inventory &&
                          formik?.errors?.inventory
                            ? formik?.errors?.inventory
                            : undefined
                        }
                        className="flex-grow"
                      />
                      <Select
                        options={CategoriesOptions}
                        value={formik?.values?.category}
                        name="category"
                        label="Categories"
                        placeholder="Select Category"
                        onChange={(selected: any) => {
                          console.log("@selected", selected);
                          formik?.setFieldValue("category", selected?.name);
                          setSubCategoryOptions(selected);
                        }}
                        getOptionValue={(option) => option?.value}
                        dropdownClassName="h-auto"
                        error={
                          formik?.touched?.category && formik?.errors?.category
                            ? formik?.errors?.category
                            : undefined
                        }
                      />

                      <SearchDropdown
                        label="Sub Category"
                        options={SubCategoriesOptions}
                        value={formik?.values?.subCategory}
                        placeholder="Select SubCategory"
                        getOptionValue={(option) => option?.value}
                        onChange={(value) => {
                          formik.setFieldValue("subCategory", value);
                        }}
                        dropdownClassName="h-auto"
                        error={
                          formik?.touched?.subCategory &&
                          formik?.errors?.subCategory
                            ? formik?.errors?.subCategory
                            : undefined
                        }
                      />
                    </div> */}

                    <Text className="font-semibold py-2 text-black">
                      Shipping Charges
                    </Text>

                    <div className="grid grid-cols-3 gap-4 xl:gap-7 text-sm text-gray-500 font-medium px-1">
                      <span>From Price</span>
                      <span>To Price</span>
                      <span>Total Price</span>
                    </div>

                    <FieldArray name="shippingCharges">
                      {(arrayHelpers) => (
                        <div className="max-h-[150px] overflow-y-auto pr-2 space-y-2">
                          {formik.values.shippingCharges.map((_, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-3 gap-2 items-center relative"
                            >
                              <Input
                                name={`shippingCharges.${index}.fromPrice`}
                                type="number"
                                className="w-full my-1 ms-1 me-1"
                                placeholder="Rs 0.00"
                                // error={
                                //   formik?.touched?.shippingCharges?.[index]
                                //     ?.fromPrice &&
                                //   formik?.errors?.shippingCharges?.[index]
                                //     ?.fromPrice
                                // }
                              />
                              <Input
                                name={`shippingCharges.${index}.toPrice`}
                                type="number"
                                className="w-full my-1 ms-1 me-1"
                                placeholder="Rs 0.00"
                              />
                              <div className="flex items-center gap-2">
                                <Input
                                  name={`shippingCharges.${index}.totalPrice`}
                                  type="number"
                                  className="w-full my-1 ms-1 me-1"
                                  placeholder="Rs 0.00"
                                />
                                {/* <Field
                                  name={`shippingCharges.${index}.toPrice`}
                                  type="number"
                                  className="w-full border border-gray-200 rounded-lg focus:border-gray-200 focus:rounded-lg my-1 ms-1 me-1"
                                  placeholder="Rs 0.00"
                                /> */}
                                {/* <div className="flex items-center gap-2"> */}
                                {/* <Field
                                    name={`shippingCharges.${index}.totalPrice`}
                                    type="number"
                                    className="w-full border border-gray-200 rounded-lg focus:border-gray-200 focus:rounded-lg my-1 ms-1 me-1"
                                    placeholder="Rs 0.00"
                                  /> */}

                                {formik.values.shippingCharges.length > 1 &&
                                  index !==
                                    formik.values.shippingCharges.length -
                                      1 && (
                                    <TrashIcon
                                      className="h-5 w-5 hover:cursor-pointer"
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  )}

                                {index ===
                                  formik.values.shippingCharges.length - 1 && (
                                  <PiPlusBold
                                    className="h-5 w-5 hover:cursor-pointer"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        fromPrice: "",
                                        toPrice: "",
                                        totalPrice: "",
                                      })
                                    }
                                  />
                                )}
                                {/* </div> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="flex space-x-6">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      type="button"
                      onClick={closeDrawer}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="text-white bg-black flex-1"
                      size="lg"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </Drawer>
    </div>
  );
}
