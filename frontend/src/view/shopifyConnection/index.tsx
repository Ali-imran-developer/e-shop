import { metaObject } from "@config/site.config";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { Button, Input } from "rizzui";
import FormGroup from "@shared/form-group";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { routes } from "@/config/routes";
import UploadZone from "./upload-zone";
import { useAppDispatch } from "@/hooks/store-hook";
import { editStore } from "@/store/slices/storeSlice";

export const metadata = {
  ...metaObject("Add Store"),
};

const PersonalInfoView = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const initialValues = {
    storeName: state?.row?.storeName ?? "",
    storeDomain: state?.row?.storeDomain ?? "",
    storeLogo: state?.row?.storeLogo ?? "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("@values", values);
      setIsLoading(true);
      try {
        const response: any = await dispatch(
          editStore({ id: state?.row?._id, formData: values })
        ).unwrap();
        toast.success(response.message);
        navigate(routes.settings.stores.channels);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="@container">
      <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-100 @2xl:gap-9 @3xl:gap-20">
        <FormGroup
          title="Store Info"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            label="Store Domain"
            placeholder="storename.com"
            name="storeDomain"
            value={formik.values.storeDomain}
            onChange={formik.handleChange}
            error={
              (formik.touched.storeDomain && formik.errors.storeDomain
                ? formik.errors.storeDomain
                : undefined) as any
            }
            className="flex-grow"
          />
          <Input
            label="Store Name"
            placeholder="Productions by Arslan"
            name="storeName"
            value={formik.values.storeName}
            onChange={formik.handleChange}
            error={
              (formik.touched.storeName && formik.errors.storeName
                ? formik.errors.storeName
                : undefined) as any
            }
            className="flex-grow"
          />
        </FormGroup>

        <FormGroup
          title="Store Information"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          description="Upload your store image."
        >
          <UploadZone
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

      <div className="flex items-end justify-end border-t-2 border-dashed border-gray-400 py-4">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || imageLoadingState}
          className="w-full @xl:w-auto"
        >
          Update Store
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoView;
