import { Input, Select } from "rizzui";
import FormGroup from "@shared/form-group";
import QuillEditor from "@components/ui/quill-editor";
import cn from "@/utils/helperFunctions/class-names";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useEffect, useState } from "react";
import { fetchAllCategory } from "@/store/slices/categoriesSlice";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

interface ProductSummaryProps {
  className?: string;
  formik?: any;
}

export default function ProductSummary({
  className,
  formik,
}: ProductSummaryProps) {
  const dispatch = useAppDispatch();
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>(null);
  const { categoryList } = useAppSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const categoriesOptions = ensureArray(categoryList)?.map((product) => ({
    value: product,
    label: product?.name,
  }));

  const subCateogry = ensureArray(subCategoryOptions?.subCategory)?.map((sub) => ({
    value: sub?.name,
    label: sub?.name,
  }))

  return (
    <>
      <div className={cn("grid gap-5 @3xl:grid-cols-12", className)}>
        <div className="col-span-full @4xl:col-span-4">
          <h4 className="text-base font-medium">Summary</h4>
          <p className="mt-2">
            Edit your product description and necessary information from here
          </p>
        </div>
        <div className="col-span-full grid gap-3 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-5">
          <Input
            label="Title"
            placeholder="Product title"
            name="name"
            className="col-span-full"
            value={formik?.values?.name}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.name && formik?.errors?.name
                ? formik?.errors?.name
                : undefined
            }
          />

          <Select
            label="Category"
            placeholder="Category"
            options={categoriesOptions}
            getOptionValue={(option) => option?.value}
            dropdownClassName="h-auto"
            name="category"
            value={formik?.values?.category}
            onChange={(selected: any) => {
              formik?.setFieldValue("category", selected?.name);
              setSubCategoryOptions(selected);
            }}
            error={
              formik?.touched?.category && formik?.errors?.category
                ? formik?.errors?.category
                : undefined
            }
          />

          <Select
            label="SubCategory"
            placeholder="SubCategory"
            options={subCateogry}
            getOptionValue={(option) => option?.value}
            dropdownClassName="h-auto"
            name="category"
            value={formik?.values?.subCategory}
            onChange={(selected: any) => {
              formik?.setFieldValue("subCategory", selected);
            }}
            error={
              formik?.touched?.subCategory && formik?.errors?.subCategory
                ? formik?.errors?.subCategory
                : undefined
            }
          />

          <QuillEditor
            value={formik?.values?.description}
            onChange={(content) =>
              formik?.setFieldValue("description", content)
            }
            label="description"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            error={
              formik?.touched?.description && formik?.errors?.description
                ? formik?.errors?.description
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
}
