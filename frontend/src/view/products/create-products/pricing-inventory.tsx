import FormGroup from "@/components/shared/form-group";
import cn from "@/utils/helperFunctions/class-names";
import { Input } from "rizzui";

export default function PricingInventory({ className, formik }: any) {

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
            onChange={(e) => formik.setFieldValue("price", Number(e.target.value))}
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
            label="Stock"
            name="stock"
            placeholder="15000"
            value={formik?.values?.stock}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            onFocus={() => {
              if (formik?.values?.stock === 0) {
                formik.setFieldValue("stock", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.stock === "") {
                formik.setFieldValue("stock", 0);
              }
            }}
            type="number"
          />
        </div>

        <div className="grid gap-4 @2xl:grid-cols-3 col-span-full">
          <Input
            label="Available"
            name="available"
            placeholder="6000"
            value={formik?.values?.available}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            onFocus={() => {
              if (formik?.values?.available === 0) {
                formik.setFieldValue("available", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.available === "") {
                formik.setFieldValue("available", 0);
              }
            }}
            type="number"
          />
        </div>
      </FormGroup>
    </>
  );
}
