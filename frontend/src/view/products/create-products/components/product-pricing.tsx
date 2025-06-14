import cn from "@/utils/helperFunctions/class-names";
import { Input } from "rizzui";
import FormGroup from "@/components/shared/form-group";

export default function ProductPricing({ formik, className }: { formik: any; className?: string }){

  return (
    <>
      <FormGroup
        title="Pricing"
        description="Add your product pricing here"
        className={cn(className)}
      >
        <div className="grid gap-4 @2xl:grid-cols-2 col-span-full">
          <Input
            label="Price"
            name="price"
            placeholder="10000"
            value={formik?.values?.price}
            onChange={(e) =>
              formik.setFieldValue("price", e.target.value)
            }
            onFocus={() => {
              if (formik?.values?.price === 0) {
                formik.setFieldValue("price", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.price === "") {
                formik.setFieldValue("price", 0);
              }
            }}
            prefix={"Rs. "}
            type="number"
          />

          <Input
            label="Compare-at Price"
            name="variants[0].compareAtPrice"
            placeholder="15000"
            value={formik?.values?.variants[0]?.compareAtPrice}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            onFocus={() => {
              if (formik?.values?.variants[0]?.compareAtPrice === 0) {
                formik.setFieldValue("variants[0].compareAtPrice", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.variants[0]?.compareAtPrice === "") {
                formik.setFieldValue("variants[0].compareAtPrice", 0);
              }
            }}
            type="number"
          />
        </div>

        <div className="grid gap-4 @2xl:grid-cols-3 col-span-full">
          <Input
            label="Cost per item"
            name="variants[0].costPerItem"
            placeholder="6000"
            value={formik?.values?.variants[0]?.costPerItem}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            onFocus={() => {
              if (formik?.values?.variants[0]?.costPerItem === 0) {
                formik.setFieldValue("variants[0].costPerItem", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.variants[0]?.costPerItem === "") {
                formik.setFieldValue("variants[0].costPerItem", 0);
              }
            }}
            type="number"
          />
          
        </div>
      </FormGroup>
    </>
  );
}
