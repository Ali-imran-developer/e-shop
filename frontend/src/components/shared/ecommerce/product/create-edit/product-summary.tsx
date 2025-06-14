import { AdvancedRadio, Input, RadioGroup, Select, Switch } from "rizzui";
import FormGroup from "@shared/form-group";
import { categoryOption } from "@shared/ecommerce/product/create-edit/form-utils";
import QuillEditor from "@components/ui/quill-editor";
import { DatePicker } from "@/components/ui/datepicker";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

interface ProductSummaryProps {
  className?: string;
  formik?: any;
}

const statusOptions = [
  { value: "active", name: "Status Active" },
  { value: "inActive", name: "Status In-Active" },
];

export default function ProductSummary({
  className,
  formik,
}: ProductSummaryProps) {
  return (
    <>
      <FormGroup
        title="Summary"
        description="Edit your product description and necessary information from here"
        className={className}
      >
        <Input
          label="Title"
          placeholder="Product title"
          name="title"
          value={formik?.values?.title}
          onChange={formik?.handleChange}
          error={formik?.errors?.title}
          className="col-span-full"
        />
        <Input
          label="SKU"
          placeholder="Product SKU"
          type="text"
          name={`variants[0].sku`}
          value={formik?.values?.variants?.[0]?.sku}
          onChange={formik?.handleChange}
          error={formik?.errors?.variants?.[0]?.sku}
        />

        <Input
          label="Weight"
          type="number"
          placeholder="6700 gram"
          name={`variants[0].weight`}
          value={formik?.values?.variants?.[0]?.weight}
          onChange={formik?.handleChange}
          error={formik?.errors?.variants?.[0]?.weight}
        />

        <Select
          options={categoryOption}
          value={formik?.values?.productType}
          onChange={(selected) =>
            formik?.setFieldValue("productType", selected)
          }
          label="Categories"
          error={formik?.errors?.productType}
          getOptionValue={(option) => option?.value}
          dropdownClassName="h-auto"
        />

        <DatePicker
          inputProps={{ label: "Order date" }}
          placeholderText="Select Date"
          dateFormat="MM/dd/yyyy"
          selected={
            formik.values.createdAt ? new Date(formik.values.createdAt) : null
          }
          onChange={(date) =>
            formik.setFieldValue(
              "createdAt",
              date ? date.toISOString().slice(0, 19) : ""
            )
          }
          onBlur={() => formik.setFieldTouched("createdAt", true)}
          wrapperClassName="w-full"
        />

        <QuillEditor
          value={formik?.values?.description}
          onChange={(content) => formik?.setFieldValue("description", content)}
          label="Description"
          className="col-span-full [&_.ql-editor]:min-h-[100px]"
          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
        />

        {/* <Switch
          label="Status Active"
          checked={formik?.values?.status}
          onChange={(e) => formik?.setFieldValue("status", e.target.checked)}
        /> */}

        <RadioGroup
          value={formik?.values?.status}
          setValue={(value) => formik?.setFieldValue("status", value)}
          className="col-span-full grid gap-4 @2xl:grid-cols-3 @4xl:gap-6"
        >
          {ensureArray(statusOptions)?.map((item: any) => (
            <AdvancedRadio
              key={item?.value}
              value={item?.value}
              contentClassName="px-4 py-6 flex items-center justify-between"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200"
            >
              <span>{item?.name}</span>
            </AdvancedRadio>
          ))}
        </RadioGroup>
      </FormGroup>
    </>
  );
}
