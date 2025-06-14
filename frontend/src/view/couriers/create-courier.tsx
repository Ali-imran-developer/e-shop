import { useState } from "react";
import { Input } from "rizzui";
import { useFormik } from "formik";
import FormGroup from "@/components/shared/form-group";
import toast from "react-hot-toast";
import ProductMedia from "./upload-zone";
import { useNavigate } from "react-router-dom";
import FormFooter from "@/components/shared/components/form-footer";
import { useAppDispatch } from "@/hooks/store-hook";
import { addNewCourier } from "@/store/slices/CourierSlice";

export default function SalesChannelModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    logo: "",
    isDefault: false,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        setLoading(true);
        const response: any = await dispatch(addNewCourier(values));
        toast.success(response.message);
        navigate("/courier-management");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="@container">
      <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Store Info"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="text"
            label="Courier Name"
            name="name"
            labelClassName="text-sm font-medium text-gray-900"
            placeholder="Enter store name"
            value={formik?.values?.name ?? ""}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup title="Logo" className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11">
          <ProductMedia
            formik={formik}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
        </FormGroup>
      </div>
      <FormFooter
        altBtnText="Cancel"
        submitBtnText="Save"
        isLoading={isLoading}
        disabled={isLoading || imageLoadingState}
      />
    </form>
  );
}
