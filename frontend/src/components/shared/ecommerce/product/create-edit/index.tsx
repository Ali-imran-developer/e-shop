import { useState } from "react";
import cn from "@utils/helperFunctions/class-names";
import ProductSummary from "@shared/ecommerce/product/create-edit/product-summary";
import ProductMedia from "@shared/ecommerce/product/create-edit/product-media";
import PricingInventory from "@shared/ecommerce/product/create-edit/pricing-inventory";
import ProductIdentifiers from "@shared/ecommerce/product/create-edit/product-identifiers";
import ShippingInfo from "@shared/ecommerce/product/create-edit/shipping-info";
import ProductSeo from "@shared/ecommerce/product/create-edit/product-seo";
import ProductTaxonomies from "@shared/ecommerce/product/create-edit/product-tags";
import { useFormik } from "formik";
import { Button } from "rizzui";
import ProductController from "@/controllers/productController";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const CreateEditProduct = () => {
  const location = useLocation();
  const { state } = location;
  console.log("@location", state?.row.title);
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    title: state?.row?.title ?? "",
    productType: "",
    description: "",
    images: [],
    // availability: [],
    tags: [],
    status: "active",
    createdAt: "",
    seo: {
      title: "",
      metaKeywords: "",
      metaDescription: "",
      productUrl: "",
    },
    shipping: {
      isCost: false,
      price: null,
      isLocationBased: false,
      ShippingLocation: [
        {
          name: "",
          price: null,
        },
      ],
    },
    identifiers: {
      globalTradeItemNumber: null,
      manufacturerNumber: null,
      brandName: "",
      productUpc: null,
      custom: [{ name: "", value: "" }],
    },
    stock: {
      trackStockNull: false,
      available: null,
      inHand: null,
    },
    variants: [
      {
        sku: "",
        price: null,
        compareAtPrice: null,
        costPerItem: null,
        weight: null,
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("@values", values);
      setLoading(true);
      try {
        const payload = [values];
        const response = await ProductController.createProduct(payload);
        toast.success(response?.message || "Product created successfully!");
      } catch (error) {
        console.error("Error submitting product:", error);
        toast.error("Failed to create product. Please try again.");
      } finally {
        setLoading(false);
        setSubmitting(false);
        // resetForm();
      }
    },
  });

  return (
    <div className="@container">
      <form
        onSubmit={formik.handleSubmit}
        className={cn("relative z-[19] [&_label.block>span]:font-medium")}
      >
        <div className="mb-10 flex flex-col gap-6 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <ProductSummary formik={formik} />
          <ProductMedia className="py-4" formik={formik} />
          <PricingInventory className="py-4" formik={formik} />
          {/* <ProductIdentifiers className="py-4" formik={formik} /> */}
          <ShippingInfo className="py-4" formik={formik} />
          <ProductSeo className="py-4" formik={formik} />
          <ProductTaxonomies className="py-4" formik={formik} />
        </div>
        <div
          className={cn(
            "sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50"
          )}
        >
          <Button variant="outline" className="w-full @xl:w-auto">
            Save as Draft
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full @xl:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditProduct;
