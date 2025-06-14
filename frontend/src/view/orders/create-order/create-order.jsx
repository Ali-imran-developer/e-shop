import { useState } from "react";
import { useFormik } from "formik";
import DifferentBillingAddress from "./different-billing-address";
import AddressInfo from "./address-info";
import cn from "@utils/helperFunctions/class-names";
import { CartPageWrapper } from "./index";
import { SelectProduct } from "./selectProduct/index";
import { Button } from "rizzui";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewOrder, editOrder } from "@/store/slices/ordersSlice";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import CustomerInfo from "./customer-info";

export default function CreateOrder() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProducts = ensureArray(products)?.filter((p) => p?.checked);

  const initialValues = {
    tags: [],
    products: [
      {
        productId: "",
        productQty: 1,
      },
    ],
    status: "open",
    promoCode: "",
    paymentMethod: "",
    shipperCity: "",
    shipmentDetails: {
      email: "",
      name: "",
      phone: "",
      city: "",
      address: "",
    },
    pricing: {
      subTotal: 0,
      orderTax: 0,
      paid: 0,
      shipping: 0,
      totalPrice: 0,
    },
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: shipmentDetailsSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        setLoading(true);
        const res = await dispatch(addNewOrder(values))?.unwrap();
        toast.success(res.message);
        navigate(routes.orders.orders);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        "isomorphic-form flex flex-grow flex-col @container [&_label.block>span]:font-medium"
      )}
    >
      <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="flex-grow @5xl:col-span-8 @6xl:col-span-7">
          <div className="flex flex-col gap-4 @xs:gap-7 @5xl:gap-9">
            <SelectProduct
              formik={formik}
              products={products}
              setProducts={setProducts}
            />
            <AddressInfo
              formik={formik}
              type="billingAddress"
              title="Shipping Information"
            />
            <DifferentBillingAddress formik={formik} />
          </div>
        </div>

        <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
          <CustomerInfo className="" formik={formik} />
          <CartPageWrapper
            formik={formik}
            selectedProducts={selectedProducts}
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
          disabled={isLoading}
        >
          Create Order
        </Button>
      </div>
    </form>
  );
}
