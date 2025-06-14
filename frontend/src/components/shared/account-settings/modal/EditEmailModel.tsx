import { useState } from "react";
import toast from "react-hot-toast";
import { Controller, SubmitHandler } from "react-hook-form";
import { Input, Text, Title, Button, Select, Modal } from "rizzui";
import { Form } from "@ui/form";
import {
  EmailTemplateInput,
  emailTemplateSchema,
} from "@utils/validators/email-template.schema";
import { values } from "lodash";

interface Iprops {
  show: boolean;
  onClose: () => void;
}

export default function EditEmailModel({ onClose, show }: Iprops) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  // const onSubmit: SubmitHandler<EmailTemplateInput> = (data) => {
  //   toast.success(
  //     <Text as="b" className="font-semibold">
  //       Team member successfully added!
  //     </Text>
  //   );
  //   // set timeout ony required to display loading state of the create product button
  //   setLoading(true);
  //   closeModal();
  //   setTimeout(() => {
  //     setLoading(false);
  //     console.log(" data ->", data);
  //     setReset({
  //       first_name: "",
  //       last_name: "",
  //       email: "",
  //       role: "",
  //       country: "",
  //     });
  //   }, 600);
  // };

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
      size="md"
    >
      <div className="m-auto p-6">
        <Title as="h3" className="mb-6 text-lg">
          Edit your email
        </Title>
        <Form<EmailTemplateInput>
          validationSchema={emailTemplateSchema}
          resetValues={reset}
          onSubmit={onSubmit}
        >
          {({ register, formState: { errors } }) => (
            <>
              <EmailForm register={register} errors={errors} />
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

export function EmailForm({ register, errors }: any) {
  return (
    <div className="flex flex-col gap-4 text-gray-700">
      {/* <Input
        type="password"
        label="Enter current password"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="*****"
        {...register("password")}
        error={errors.password?.message}
      /> */}
      <Input
        type="email"
        label="Email"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="john@doe.io"
        {...register("email")}
        error={errors.email?.message}
      />
    </div>
  );
}
