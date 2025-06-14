import toast from "react-hot-toast";
import { useFormik } from "formik";
import FormGroup from "@shared/form-group";
import { Input } from "rizzui";
import { PiEnvelopeSimple } from "react-icons/pi";
import FormFooter from "@/components/shared/components/form-footer";
import UploadZone from "./upload-zone";
import { useEffect, useState } from "react";
import { usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";
import { useDispatch } from "react-redux";
import { addNewProfile, editProfile, fetchProfile } from "@/store/slices/profileSlice";
import { useAppSelector } from "@/hooks/store-hook";

const PersonalInfoView = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { maskFormikValue } = usePhoneNumberMask();
  const { profileList } = useAppSelector((state) => state.Profile);

  const initialValues = {
    name: profileList?.name ?? "",
    email: profileList?.email ?? "",
    address: profileList?.address ?? "",
    phoneNumber: profileList?.phoneNumber ?? "",
    image: profileList?.image ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("Submitted values:", values);
      try {
        setLoading(true);
        const profileData = {
          ...values,
          image: uploadedImageUrl || values.image,
        };
        if (!profileList || !profileList._id) {
          const res = await dispatch(addNewProfile(profileData)).unwrap();
          toast.success(res.message);
        } else {
          const res = await dispatch(
            editProfile({ id: profileList._id, formData: profileData })
          ).unwrap();
          toast.success(res.message);
        }
        dispatch(fetchProfile());
      } catch (error) {
        console.log("Error", error);
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    dispatch(fetchProfile());

  }, [dispatch]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="@container">
        <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <FormGroup
            title="Profile Details"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
          >
            <Input
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && (formik.errors.name)}
            />
            <Input
              name="email"
              placeholder="email@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
              error={formik.touched.email && (formik.errors.email)}
            />
            <Input
              name="phoneNumber"
              placeholder="Phone (optional)"
              value={formik.values.phoneNumber}
              onChange={maskFormikValue(
                formik?.handleChange,
                formik?.setFieldValue
              )}
              error={formik.errors.phoneNumber}
            />
            <Input
              name="address"
              placeholder="Address (optional)"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
          </FormGroup>

          <FormGroup
            title="Your Photo"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            description="This will be displayed on your profile."
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
        <FormFooter
          altBtnText="Cancel"
          submitBtnText="Save"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default PersonalInfoView;