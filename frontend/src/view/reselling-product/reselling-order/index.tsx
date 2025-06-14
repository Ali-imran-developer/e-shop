import { useEffect, useState } from "react";
import { Title, Input, Text } from "rizzui";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import UploadZone from "@/components/ui/file-upload/upload-zone";

interface CartPageWrapperProps {
  formik: any;
  isPrepaid?: boolean;
  products?: any[];
}

export const CartPageWrapper = ({
  products,
  formik,
  isPrepaid,
}: CartPageWrapperProps) => {
  const [subtotal, setSubtotal] = useState<any>(0);
  const [shipping, setShipping] = useState<string>("");
  console.log("products",products)

  useEffect(() => {
    const calculateTotalAmount = () => {
      let shippingTotal = 0;
  
      const total = ensureArray(products).reduce((acc: number, item: any) => {
        const variants = ensureArray(item?.variants);
  
        const variantTotal = variants.reduce((sum: number, variant: any) => {
          const quantity = variant?.quantity ?? 1;
          const price = parseFloat(variant?.price) || 0;
          return sum + price * quantity;
        }, 0);
  
        return acc + variantTotal;
      }, 0);
  
      return total > 0 ? total : 0;
    };
  
    const totalPrice = calculateTotalAmount();
    setSubtotal(totalPrice);
  

    let shippingTotal = 0;
  
    // Assuming only one product's shipping charges matter, or you can adjust if multiple products have shipping rules
    if (products && products.length > 0) {
      const shippingChargesArray = products[0]?.listForResale?.shippingCharges || [];
  
      if (Array.isArray(shippingChargesArray)) {
        const matchedShipping = shippingChargesArray.find((shippingRange: any) => {
          return (
            totalPrice >= shippingRange.fromPrice && totalPrice <= shippingRange.toPrice
          );
        });
  
        if (matchedShipping) {
          shippingTotal = matchedShipping.totalPrice;
        }
      }
    }
  
    
    formik.setFieldValue("pricing.subTotal", totalPrice);
    formik.setFieldValue(
      "pricing.currentTotalPrice",
      totalPrice +
        shippingTotal +
        formik.values.pricing.profit +
        (isPrepaid ? formik.values.pricing.paidAlready : 0)
    );
  
    setShipping(shippingTotal.toString());
  }, [products]);
  

  return (
    <div className="@container">
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="@5xl:col-span-8 @6xl:col-span-7"></div>
        <div className="sticky top-24 mt-4 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <div>
            <Title
              as="h2"
              className="border-b border-muted pb-4 text-lg font-medium"
            >
              Cart Totals
            </Title>
            <div className="mt-6 grid grid-cols-1 gap-4 @md:gap-6">
              <div className="flex items-center justify-between">
                Subtotal
                <span className="font-medium text-gray-1000">
                  {subtotal !== null ? `${subtotal}` : "--"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                Shipping
                <span className="font-medium text-gray-1000">{shipping}</span>
              </div>

              <div className="flex items-center justify-between border-t-2 py-4">
                <Text className="font-semibold">your profit</Text>
                <Input
                  type="number"
                  value={formik?.values?.pricing?.profit}
                  name="pricing.profit"
                  onChange={formik?.handleChange}
                  className="max-w-28 w-full max-h-8 h-full"
                />
              </div>

              {isPrepaid && (
                <>
                  <div className="flex items-center justify-between pb-2">
                    <Text className="font-semibold">Paid Already</Text>
                    <Input
                      type="number"
                      value={formik?.values?.pricing?.paidAlready}
                      name="pricing.paidAlready"
                      onChange={formik?.handleChange}
                      className="max-w-28 w-full max-h-8 h-full"
                    />
                  </div>
                  <div className="">
                    <UploadZone formik={formik} name={""} />
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <Text className="font-medium text-gray-1000">
                      Total COD
                    </Text>
                    <Text className="font-medium text-lg text-gray-1000">
                      Rs. {120}
                    </Text>
                  </div> */}
                </>
              )}

              <div className="flex items-center justify-between border-t border-muted py-3 font-semibold text-gray-1000">
                Order Total
                <span className="font-medium text-lg text-gray-1000">
                  Rs.{" "}
                  {subtotal +
                    parseFloat(shipping) +
                    formik?.values?.pricing?.profit - (isPrepaid ? formik.values.pricing.paidAlready : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
