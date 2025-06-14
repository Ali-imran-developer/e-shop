import { lazy, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler, Controller } from "react-hook-form";
import { PiClock, PiEnvelopeSimple } from "react-icons/pi";
import { Form } from "@ui/form";
import { Loader, Text, Input, Button, Select } from "rizzui";
import FormGroup from "@shared/form-group";
import FormFooter from "@components/form-footer";
import {
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from "@utils/validators/personal-info.schema";
import EditEmailModel from "@components/shared/account-settings/modal/EditEmailModel";
import EditPasswordModel from "@components/shared/account-settings/modal/EditPasswordModel";
import { countries, language, region, timezones } from "@data/forms/my-details";
import AvatarUpload from "@ui/file-upload/avatar-upload";
import { useModal } from "../modal-views/use-modal";
import { useAuth } from "@/hooks/auth-hooks";

const PersonalInfoView = () => {
  const {
    onClose: closeEditEmail,
    show: showEditEmail,
    onOpen: openEditEmail,
  } = useModal();
  const [showEditPasswordModel, setShowEditPasswordModel] = useState(false);
  const { handleLogout, user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState(null); 
  console.log("@user", user);
  const initialValues: any = {
    firstName: "",
    lastName: "",
    email: user?.email,
    country: "Pk",
    language: "eng",
    region: "",
    timezone: "Pak",
  };

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success("Successfully added");
    console.log("Profile settings data ->", {
      ...data,
      profileImage: file,
    });
  };

  const handleImageChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile));
    }
  };

  return (
    <>
      <Form<PersonalInfoFormTypes>
        // validationSchemba={personalInfoFormSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          setValue,
          getValues,
          formState: { errors },
        }) => (
          <>
            <div className="flex items-center justify-between">
              <FormGroup
                title="Personal Info"
                description="Update your photo and personal details here"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              />
              <Button type="button" onClick={openEditEmail as any}>
                Edit Email
              </Button>
            </div>

            <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Profile Details"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Last Name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  className="flex-grow"
                />

                <Input
                  className="flex-grow"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  disabled
                  type="email"
                  placeholder="email@gmail.com"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <Input
                  placeholder="Phone (optional)"
                  {...register("phone")}
                  error={errors.phone?.message}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup
                title="Your Photo"
                description="This will be displayed on your profile."
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="flex flex-col items-center gap-6">
                  <label htmlFor="file-upload" className="relative w-32 h-32 cursor-pointer">
                    {image ? (
                      <img
                        src={image}
                        alt="Profile Preview"
                        className="w-20 h-20 object-cover rounded-full border border-gray-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                        Upload Photo
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </FormGroup>

              <FormGroup
                title="Preferred Language"
                description="You will see Shopilam in the language you select here. 
                It shall not affect the language your customers see on your online store."
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="language"
                  render={({ field: { onChange, value } }) => (
                    <Suspense fallback={<Loader />}>
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        placeholder="Select Language"
                        options={language}
                        disabled
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          language?.find((con) => con.value === selected)
                            ?.label ?? ""
                        }
                        error={errors?.language?.message as string}
                      />
                    </Suspense>
                  )}
                />
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Suspense fallback={<Loader />}>
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        placeholder="Select Country"
                        options={countries}
                        onChange={onChange}
                        value={value}
                        disabled
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          countries?.find((con) => con.value === selected)
                            ?.label ?? ""
                        }
                        error={errors?.country?.message as string}
                      />
                    </Suspense>
                  )}
                />
                <Controller
                  control={control}
                  name="region"
                  render={({ field: { onChange, value } }) => (
                    <Suspense fallback={<Loader />}>
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        placeholder="Select Region"
                        options={region}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          region?.find((con) => con.value === selected)
                            ?.label ?? ""
                        }
                        error={errors?.region?.message as string}
                      />
                    </Suspense>
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Timezone"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 disabled:"
              >
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field: { onChange, value } }) => (
                    <Suspense fallback={<Loader />}>
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                        placeholder="Select Timezone"
                        options={timezones}
                        onChange={onChange}
                        disabled
                        value={value}
                        className="col-span-full disabled"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          timezones?.find((tmz) => tmz.value === selected)
                            ?.label ?? ""
                        }
                        error={errors?.timezone?.message as string}
                      />
                    </Suspense>
                  )}
                />
              </FormGroup>
            </div>

            <FormFooter altBtnText="Cancel" submitBtnText="Save" />
          </>
        )}
      </Form>

      {/* Modals */}
      <EditEmailModel show={showEditEmail} onClose={closeEditEmail} />
      <EditPasswordModel
        show={showEditPasswordModel}
        onClose={() => setShowEditPasswordModel(false)}
      />
    </>
  );
};
export default PersonalInfoView;
