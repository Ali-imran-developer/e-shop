import { Suspense, useState } from "react";
import { Input, Title, Button, Select, Modal, Loader } from "rizzui";
import { Form } from "@ui/form";
import { PayNowInput, PayNowSchema } from "@/utils/validators/payNowSchema";
import FormGroup from "@/components/shared/form-group";
import AvatarUpload from "@/components/ui/file-upload/avatar-upload";
import { Controller } from "react-hook-form";
import { methods } from "@data/forms/method-details";
import { current } from "@reduxjs/toolkit";

let currentDate = new Date(); //get date

interface Iprops {
  show: boolean;
  onClose: () => void;
}

export default function PayNowModel({ onClose, show }: Iprops) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (value: any) => {
    console.log("values", value);
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
      containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
      className="z-[9999]"
      size="lg"
    >
      <div className="m-auto p-6">
        <Title as="h3" className="mb-6 text-lg">
          Pay Now
        </Title>
        <Form<PayNowInput>
          validationSchema={PayNowSchema}
          resetValues={reset}
          onSubmit={onSubmit}
        >
          {({
            register,
            control,
            setValue,
            getValues,
            formState: { errors },
          }) => (
            <>
              <PayNowform
                register={register}
                control={control}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
              />
              <div className="mt-8 flex justify-end gap-3">
                <Button className="w-auto" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} className="w-auto">
                  Confirm
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </Modal>
  );
}

export function PayNowform({

  register,
  control,
  setValue,
  getValues,
  errors,
}: any) {
  return (
    <>
      <div className="flex flex-col gap-4 text-gray-700">
        <Input
          type="number"
          label="Amount"
          labelClassName="text-sm font-medium text-gray-900"
          placeholder="Rs 659.5"
          disabled
          {...register("amount")}
          //error={errors.amount?.message}
        />
        <Input
          type="Text"
          label="Date"
          labelClassName="text-sm font-medium text-gray-900"   
          placeholder= {currentDate.getDate() +"/"+ currentDate.getMonth()+1 +"/"+ currentDate.getFullYear()}
          disabled
          {...register("date")}
          error={errors.date?.message}
        />
        <FormGroup
          title="Method of payment"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Controller
            control={control}
            name="methods"
            render={({ field: { onChange, value } }) => (
              <Suspense fallback={<Loader />}>
                <Select
                  dropdownClassName="!z-10 h-auto"
                  inPortal={false}
                  placeholder="Select Method"
                  options={methods}
                  onChange={onChange}
                  value={value}
                  className="col-span-full"
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    methods?.find((con) => con.value === selected)?.label ?? ""
                  }
                  error={errors?.method?.message as string}
                />
              </Suspense>
            )}
          />
        </FormGroup>
        <FormGroup
          title="Proof of Payment"
          //   description="Kindly attach screenshot of payment"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <div className="flex flex-col gap-6 @container @3xl:col-span-2">
            <AvatarUpload
              name="avatar"
              setValue={setValue}
              getValues={getValues}
              error={errors?.proofPayment?.message as string}
            />
          </div>
        </FormGroup>

        <Input
          type="text"
          label="Transaction ID"
          labelClassName="text-sm font-medium text-gray-900"
          placeholder=""
          {...register("transactionID")}
          error={errors.transactionID?.message}
        />

        <Input
          type="text"
          label="Name of Payee"
          labelClassName="text-sm font-medium text-gray-900"
          placeholder=""
          {...register("namePayee")}
          error={errors.namePayee?.message}
        />
      </div>
    </>
  );
}
