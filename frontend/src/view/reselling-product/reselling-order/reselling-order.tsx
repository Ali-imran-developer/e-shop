import { useEffect, useState } from "react";
import { useFormik } from "formik";
import DifferentBillingAddress from "./different-billing-address";
import CustomerInfo from "./customer-info";
import AddressInfo from "./address-info";
import cn from "@utils/helperFunctions/class-names";
import OrderNote from "./order-note";
import { CartPageWrapper } from "./index";
import { SelectProduct } from "./selectProduct/index";
import { Button } from "rizzui";
import toast from "react-hot-toast";
import OrdersController from "@/controllers/ordersController";
import ShipperInfoController from "@/controllers/shipper-info";
import { useNavigate, useLocation } from "react-router-dom";
import { values } from "lodash";
import {
  shipmentDetailsResellingSchema,
  shipmentDetailsSchema,
} from "@/validators/create-order.schema";

const initialValues = {
  lineItems: [],
  // currentTotalPrice: 0,
  tags: [],
  paymentMethod: "COD",
  shipmentDetails: {
    email: "",
    addresses: [
      {
        name: "",
        phone: "",
        city: { city: "" },
        address1: "",
        address2: "",
        company: "",
        // province: "",
        country: "Pakistan",
        // zip: "",
      },
    ],
  },
  financialStatus: "pending",
  status: "reselling",
  pricing: {
    subTotal: 0,
    currentTotalPrice: 0,
    paid: 0,
    balance: 0,
    shipping: 0,
    taxPercentage: 0,
    taxValue: 0,
    // extra: {
    //   key: "",
    //   value: 0,
    // },
    profit: 0,
    paidAlready: 0,
  },
  createdAt: new Date().toISOString().split("T")[0],
};

export default function CreateOrder() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPrepaid, setIsPrepaid] = useState(false);
  const productsFromLocation = location.state?.product;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: shipmentDetailsResellingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values before modification:", values);
      setLoading(true);
      try {
        const lineItems = products[0]?.variants?.map(
          (item: any, index: number) => ({
            variantId: item?.id ?? "",
            sku: item?.sku ?? "",
            quantity: item?.quantity ?? 1,
            name: item?.title ?? "",
            price: item?.price ?? 0,
            image: "",
            vendor: item?.vendor ?? "",
            weight: item?.weight ?? 0,
          })
        );
        formik.setFieldValue("lineItems", lineItems);
        const productId = productsFromLocation[0]._id;
        formik.setFieldValue("productId", productId);
        const updatedValues = {
          ...values,
          lineItems,
          productId,
        };
        console.log("values after modification:", updatedValues);
        const response = await OrdersController.createOrder(updatedValues);
        toast.success(response?.message || "Order created successfully!");
        navigate("/reselling-orders");
      } catch (error) {
        console.error("Error submitting order:", error);
        toast.error("Failed to create order. Please try again.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik?.values?.paymentMethod === "Prepaid") {
      setIsPrepaid(true);
    } else {
      setIsPrepaid(false);
    }
  }, [formik?.values?.paymentMethod]);
  const [showCities, setCities] = useState([]);
  useEffect(() => {
    const getShopilamCouriers = async () => {
      try {
        const response = await OrdersController.getAllShopilamCities();
        const formattedCities = response.map((item: string) => ({
          label: item,
          value: item,
        }));
        setCities(formattedCities);
      } catch (error) {
        console.log("@error", error);
      }
    };
    getShopilamCouriers();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        "isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium"
      )}
    >
      <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="flex-grow @5xl:col-span-8 @5xl:pb-2 @6xl:col-span-7">
          <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
            <SelectProduct
              formik={formik}
              // products={products}
              setProducts={setProducts}
            />
            <AddressInfo
              formik={formik}
              type="billingAddress"
              title="Shipping Information"
              showCities={showCities}
            />
            <DifferentBillingAddress formik={formik} />
            {/* <AddressInfo type="shippingAddress" formik={formik} /> */}
            {/* <OrderNote formik={formik} /> */}
          </div>
        </div>

        <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
          <CustomerInfo formik={formik} isPrepaid={isPrepaid} />
          <CartPageWrapper
            products={products}
            formik={formik}
            isPrepaid={isPrepaid}
          />
        </div>
      </div>
      <div className="ml-auto">
        <Button
          size="lg"
          rounded="pill"
          className="w-60"
          type="submit"
          isLoading={isLoading}
          // disabled={isLoading || formik.isSubmitting}
        >
          Create Order
        </Button>
      </div>
    </form>
  );
}
