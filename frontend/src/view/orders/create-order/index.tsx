import { useEffect, useState } from "react";
import { Title, Text, Input, Button } from "rizzui";

export const CartPageWrapper = ({ formik, selectedProducts }: any) => {

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      const total = selectedProducts.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      );
  
      const orderTaxPrice = Number(formik?.values?.pricing?.orderTax || 0);
      const prepaidPrice = Number(formik?.values?.pricing?.paid || 0);
      const shippingPrice = Number(formik.values.pricing.shipping || 0);
  
      const totalOrderPrice = total + orderTaxPrice + shippingPrice;
      const OriginaltotalPrice = totalOrderPrice - prepaidPrice;
  
      // Only update if values have changed to avoid unnecessary re-renders
      if (formik.values.pricing.totalPrice !== OriginaltotalPrice) {
        formik.setFieldValue("pricing.totalPrice", OriginaltotalPrice);
      }
      if (formik.values.pricing.subTotal !== total) {
        formik.setFieldValue("pricing.subTotal", total);
      }
    }
  }, [selectedProducts, formik.values.pricing.orderTax, formik.values.pricing.paid, formik.values.pricing.shipping]);  
  
  return (
    <div className="@container">
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="@5xl:col-span-8 @6xl:col-span-7"></div>
        <div className="sticky top-24 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <div>
            <Title as="h2" className="pb-4 text-xl font-medium">
              Cart Totals
            </Title>
            <div className="grid grid-cols-1 gap-4 @md:gap-6">
              <div className="flex items-center justify-between">
                <Text className="font-semibold">Subtotal</Text>
                <Input
                  value={formik?.values?.pricing?.subTotal}
                  onChange={(e) => formik?.setFieldValue("pricing.subTotal", Number(e.target.value))}
                  className="w-20 p-0"
                  placeholder="0.00"
                  type="number"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-semibold">Order Tax</Text>
                <Input
                  type="number"
                  // name="pricing.orderTax"
                  value={formik?.values?.pricing?.orderTax}
                  onChange={(e) => formik?.setFieldValue("pricing.orderTax", Number(e.target.value))}
                  className="w-20 p-0"
                  placeholder="0.00"
                  onFocus={() => {
                    if (formik?.values?.pricing?.orderTax === 0) {
                      formik.setFieldValue("pricing.orderTax", "");
                    }
                  }}
                  onBlur={() => {
                    if (formik?.values?.pricing?.orderTax === "") {
                      formik.setFieldValue("pricing.orderTax", 0);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-semibold">Paid Already</Text>
                <Input
                  type="number"
                  value={formik?.values?.pricing?.paid}
                  onChange={(e) =>
                    formik.setFieldValue("pricing.paid", Number(e.target.value))
                  }
                  onFocus={() => {
                    if (formik?.values?.pricing?.paid === 0) {
                      formik.setFieldValue("pricing.paid", "");
                    }
                  }}
                  onBlur={() => {
                    if (formik?.values?.pricing?.paid === "") {
                      formik.setFieldValue("pricing.paid", 0);
                    }
                  }}
                  placeholder="0.00"
                  className="w-20 p-0"
                />
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-semibold">Shipping</Text>
                <Input
                  type="number"
                  value={formik.values.pricing.shipping}
                  placeholder="0.00"
                  onFocus={() => {
                    if (formik.values.pricing.shipping === 0) {
                      formik.setFieldValue("pricing.shipping", "");
                    }
                  }}
                  onBlur={() => {
                    if (formik.values.pricing.shipping === "") {
                      formik.setFieldValue("pricing.shipping", 0);
                    }
                  }}
                  onChange={(e) =>
                    formik.setFieldValue("pricing.shipping", Number(e.target.value))
                  }
                  className="w-20 p-0"
                />
              </div>
              <div className="relative flex items-end mt-4">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  inputClassName="text-sm"
                  className="w-full"
                  value={formik.values.promoCode}
                  onChange={(e) =>
                    formik.setFieldValue("promoCode", e.target.value)
                  }
                  label="Do you have a promo code?"
                />
                <Button
                  type="button"
                  className="ms-3"
                  disabled={!formik.values.promoCode}
                >
                  Apply
                </Button>
              </div>
              <div className="flex items-center justify-between py-4">
                <Text className="font-semibold">Total</Text>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formik.values.pricing.totalPrice}
                  onChange={(e) => formik.setFieldValue("pricing.totalPrice", Number(e.target.value))}
                  className="w-20 p-0"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
