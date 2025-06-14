import { Select } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { fetchAllShipper } from "@/store/slices/shipperSlice";

interface CustomerInfoProps {
  className?: string;
  formik: any;
}

const paymentOptions = [
  {
    value: "cod",
    label: "COD",
  },
  {
    value: "prepaid",
    label: "Prepaid",
  },
];

export default function CustomerInfo({ className, formik }: CustomerInfoProps) {
  const dispatch = useAppDispatch();
  const { shipperList } = useAppSelector((state) => state.Shipper);

  useEffect(() => {
    dispatch(fetchAllShipper());

  },[])

  const shipperOptions = ensureArray(shipperList)?.map((item: any) => ({
    value: item?.city,
    label: item?.city,
  }));

  useEffect(() => {
    if (shipperOptions.length > 0 && !formik.values.shipperCity) {
      formik.setFieldValue("shipperCity", shipperOptions[0]?.value);
    }
  }, [shipperOptions, formik]);

  useEffect(() => {
    if (paymentOptions.length > 0 && !formik.values.paymentMethod) {
      formik.setFieldValue("paymentMethod", paymentOptions[0]?.value);
    }
  }, [paymentOptions, formik]);

  return (
    <div className={cn("pb-4 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3", className)}>
      <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
        <div className="space-y-4 @lg:space-y-5 @2xl:space-y-6">

          <Select
            dropdownClassName="!z-0"
            options={paymentOptions}
            label="Payment Method"
            value={formik.values.paymentMethod}
            onChange={(option: { label: string }) =>
              formik.setFieldValue("paymentMethod", option.label)
            }
            onBlur={() => formik.setFieldTouched("paymentMethod", true)}
          />

          <div className="relative ">
            {ensureArray(shipperList)?.length === 0 && (
              <Link
                className="absolute right-2 cursor-pointer text-[#3872fa] underline"
                to={"/add-shipper-info"}
              >
                Add Shipper
              </Link>
            )}
            <Select
              dropdownClassName="!z-0"
              options={shipperOptions}
              name="shipperCity"
              label="Shipper Address"
              value={formik?.values?.shipperCity}
              onChange={(option: { value: string }) =>
                formik.setFieldValue("shipperCity", option)
              }
              getOptionValue={(option) => option.value}
              onBlur={() => formik.setFieldTouched("shipperId", true)}
              error={formik?.touched?.shipperId && formik?.errors?.shipperId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
