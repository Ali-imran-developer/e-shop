import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@ui/form";
import { Input } from "rizzui";
import FormGroup from "@shared/form-group";
import FormFooter from "@components/form-footer";
import {
  AddShopifyInfoFormTypes,
} from "@utils/validators/addShopifyStore.schema";
import { CALLBACK_STATUS } from "@/config/enums";
import { useStores } from "@/hooks/sotres-hook";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { trimObjectValues } from "@/utils/helperFunctions/formater-helper";
import { routes } from "@/config/routes";

const initialValues: any = {
  accessToken: "",
  domainName: "",
  apiKey: "",
  sharedSecretKey: "",
};

const StoreValidationSchema: any = z.object({
  domainName: z.string().min(1, "Domain Name is required").trim(),
  accessToken: z.string().min(1, "Access Token is required").trim(),
  apiKey: z.string().min(1, "API Key is required").trim(),
  sharedSecretKey: z.string().min(1, "Shared Secret Key is required").trim(),
  // storeName: z.string().min(1, "Store Name is required").trim(),
  // url: z.string().min(1, "URL is required").trim(),
  // email: z.string().email("Invalid email format").trim(),
  // phoneNumber: z.string().min(1, "Phone Number is required").trim(),
});

const PersonalInfoView = () => {
  const { handleAddStores, handleBulkOperation } = useStores();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const functionCallBackBulk: any = {
    [CALLBACK_STATUS.LOADING]: (payload: any) => {
      // setIsLoading(payload);
    },
    [CALLBACK_STATUS.SUCCESS]: async (payload: {
      message: string;
      store: any;
    }) => {
      toast.success(payload?.message);

      // navigate("/orders");
    },
    [CALLBACK_STATUS.ERROR]: (payload: any) => {
      toast.error(payload.message);
      console.log("@payload", payload);
      // setIsLoading(false);
    },
  };

  const functionCallBack: any = {
    [CALLBACK_STATUS.LOADING]: (payload: any) => {
      setIsLoading(payload);
    },
    [CALLBACK_STATUS.SUCCESS]: async (message: string) => {
      console.log("@message", message);

      toast.success(message);

      // navigate("/orders");
      navigate(routes.settings.couriers.courierManagement);
    },
    [CALLBACK_STATUS.ERROR]: (payload: any) => {
      toast.error(payload?.message);
      console.log("@payload", payload);
      setIsLoading(false);
    },
  };

  const onSubmit: SubmitHandler<AddShopifyInfoFormTypes> = (data) => {
    console.log("@data", data);
    // const trimmedData = ;
    // console.log("Trimmed Data:", trimmedData);

    handleAddStores(trimObjectValues(data), (status: string, payload: any) =>
      functionCallBack[status](payload)
    );
  };

  const handleURLChange = (
    evt: React.ClipboardEvent<HTMLInputElement>,
    setValue: (name: string, value: any) => void
  ) => {
    evt.preventDefault();

    let pasted = evt.clipboardData.getData("text/plain").trim();
    if (pasted.includes(".myshopify.com")) {
      const match = pasted.match(/(https?:\/\/)?([\w-]+\.myshopify\.com)/);
      if (match && match[2]) {
        setValue("domainName", match[2]);
      } else {
        toast.error("Invalid Shopify domain format.");
      }
    } else {
      toast.error("Please use a Shopify store only.");
    }
  };

  return (
    <>
      <Form
        validationSchema={StoreValidationSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, setValue, getValues, formState: { errors } }: any) => (
          <>
            <div className="mb-24 grid gap-7 divide-y divide-dashed divide-gray-100 @2xl:gap-9 @3xl:gap-20">
              <FormGroup
                title="Shopify Store App Info"
                description="If you have not installed Shopilam App in your Shopify Store, please follow these steps"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  label="Shopify Store Domain"
                  onPaste={(e) => handleURLChange(e, setValue)}
                  placeholder="storename.myshopify.com"
                  {...register("domainName")}
                  error={errors.domainName?.message}
                  className="flex-grow"
                />
                <Input
                  label="Admin API Access Token"
                  placeholder="Admin API Access Token"
                  {...register("accessToken")}
                  error={errors.accessToken?.message}
                  className="flex-grow"
                />
                <Input
                  label="API Key"
                  placeholder="API Key"
                  {...register("apiKey")}
                  error={errors.apiKey?.message}
                  className="flex-grow"
                />
                <Input
                  label="API Secret Key"
                  placeholder="API Secret Key"
                  {...register("sharedSecretKey")}
                  error={errors.sharedSecretKey?.message}
                  className="flex-grow"
                />
              </FormGroup>

              {/* <FormGroup
                title="Store Information"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  label="URL"
                  placeholder="myshopifystore.com"
                  {...register("url")}
                  // error={errors.url?.message}
                  className="flex-grow"
                />
                <Input
                  label="Email"
                  placeholder="flores@doe.io"
                  {...register("email")}
                  // error={errors.email?.message}
                  className="flex-grow"
                />
              </FormGroup> */}
            </div>

            <FormFooter
              altBtnText="Save as Draft"
              submitBtnText="Add Store"
              isLoading={isLoading}
            />
          </>
        )}
      </Form>
    </>
  );
};
export default PersonalInfoView;
