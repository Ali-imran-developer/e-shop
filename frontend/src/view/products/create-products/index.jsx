import { useState } from "react";
import cn from "@utils/helperFunctions/class-names";
import ProductSummary from "./product-summary";
import ProductMedia from "./product-media";
import PricingInventory from "./pricing-inventory";
import { Formik } from "formik";
import { Button } from "rizzui";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validationProductSchema } from "@/validators/create-product-schema";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/slices/productSlice";
import { useAppDispatch } from "@/hooks/store-hook";

const CreateEditProduct = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = Boolean(id && state?.row);

  const initialValues = {
    name: state?.row?.name ?? "",
    description: state?.row?.description ?? "",
    price: state?.row?.price ?? 0,
    image: state?.row?.image ?? "",
    category: state?.row?.category ?? "",
    subCategory: state?.row?.subCategory ?? "",
    stock: state?.row?.stock ?? 0,
    available: state?.row?.available ?? 0,
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("values", values);
    if (imageLoadingState) {
      toast.error("Please wait for image upload to complete");
      return;
    }
    if (!values.name || values.price <= 0 || values.stock <= 0) {
      toast.error("Please fill all required fields (name, price, stock)");
      return;
    }
    try {
      setIsLoading(true);
      if (isEdit) {
        const res = await dispatch(editProduct({  id: state.row._id,  formData: values  })).unwrap();
        toast.success(res.message);
      } else {
        const productData = { ...values, image: uploadedImageUrl ?? values.image };
        const res = await dispatch(addNewProduct(productData)).unwrap();
        toast.success(res.message);
      }
      navigate(routes.products.products);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  return (
    <div className="@container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        // validationSchema={validationProductSchema}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className={cn("relative z-[19] [&_label.block>span]:font-medium")}
          >
            <div className="mb-10 flex flex-col gap-6 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <ProductSummary formik={formik} />
              <ProductMedia
                currentEditedId={isEdit}
                className="py-4"
                formik={formik}
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
              />
              <PricingInventory className="py-4" formik={formik} />
            </div>
            <div
              className={cn(
                "sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50"
              )}
            >
              <Button
                variant="outline"
                className="w-full @xl:w-auto"
                onClick={() => navigate(routes.products.products)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
                disabled={isLoading || imageLoadingState}
              >
                {isEdit ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEditProduct;