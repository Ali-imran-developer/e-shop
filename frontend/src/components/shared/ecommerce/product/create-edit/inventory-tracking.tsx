import { useState } from "react";
import { Input, Checkbox } from "rizzui";

interface InventoryTracingProps {
  formik: {
    values: {
      stock: {
        trackStockNull?: boolean;
        available?: number;
        inHand?: number;
      };
    };
    setFieldValue: (field: string, value: any) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: {
      stock?: {
        available?: string;
        inHand?: string;
      };
    };
  };
  className?: string;
}

export default function InventoryTracing({ formik }: InventoryTracingProps) {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  return (
    <div className="grid gap-5 @3xl:grid-cols-12 pt-4">
      <div className="col-span-full @4xl:col-span-4">
        <h4 className="text-base font-medium">Inventory Tracking</h4>
        <p className="mt-2">Add your product inventory info here</p>
      </div>
      <div className="col-span-full grid gap-4 @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
        <div>
          <div className="flex flex-col gap-4">
            <Checkbox
              size="md"
              label="Track quantity"
              className="font-semibold"
              checked={isTrackingEnabled}
              onChange={() => setIsTrackingEnabled((prev) => !prev)}
            />

            {isTrackingEnabled && (
              <>
                <Checkbox
                  size="md"
                  label="Take order when out of stock"
                  className="font-semibold"
                  checked={formik?.values?.stock?.trackStockNull}
                  onChange={(e) =>
                    formik.setFieldValue("stock.trackStockNull", e.target.checked)
                  }
                />

                <div className="pt-4 grid gap-4 @2xl:grid-cols-2 col-span-full">
                  <Input
                    type="number"
                    label="Available"
                    placeholder="150"
                    name="stock.available"
                    value={formik?.values?.stock?.available}
                    onChange={formik?.handleChange}
                    error={formik?.errors?.stock?.available}
                  />
                  <Input
                    type="number"
                    label="On Hand"
                    placeholder="20"
                    name="stock.inHand"
                    value={formik?.values?.stock?.inHand}
                    onChange={formik?.handleChange}
                    error={formik?.errors?.stock?.inHand}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
