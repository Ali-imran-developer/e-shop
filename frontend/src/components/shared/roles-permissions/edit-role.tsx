import { useState } from "react";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import { Controller, SubmitHandler } from "react-hook-form";
import { permissions, roles } from "@components/shared/roles-permissions/utils";
import {
  ActionIcon,
  AdvancedCheckbox,
  Title,
  Button,
  CheckboxGroup,
} from "rizzui";
import { Form } from "@ui/form";
import {
  RolePermissionInput,
  rolePermissionSchema,
} from "@utils/validators/edit-role.schema";

interface EditRoleProps {
  onClose: () => void;
}

export default function EditRole({ onClose }: EditRoleProps) {
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RolePermissionInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log("data", data);
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <Form<RolePermissionInput>
      onSubmit={onSubmit}
      validationSchema={rolePermissionSchema}
      useFormProps={{
        defaultValues: {}, // Remove initial permissions
      }}
      className="grid grid-cols-1 gap-6 p-6 @container [&_.rizzui-input-label]:font-bold [&_.rizzui-input-label]:text-gray-900"
    >
      {/* className="grid grid-cols-1 gap-6 p-6 w-[calc(100%+200px)] @container [&_.rizzui-input-label]:font-bold [&_.rizzui-input-label]:text-gray-900" */}

      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="col-span-full flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Edit Role
            </Title>
            <ActionIcon size="sm" variant="text" onClick={onClose}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>

          <div className="grid gap-4 divide-y divide-y-reverse divide-gray-200">
            <Title as="h5" className="mb-2 text-base font-semibold">
              Role Access
            </Title>
            {roles.map(({ label, value }) => {
              const parent = value.toLowerCase();
              return (
                <div
                  key={value}
                  className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                >
                  <Title
                    as="h6"
                    className="font-medium text-gray-700 2xl:text-sm"
                  >
                    {label}
                  </Title>
                  <Controller
                    name={value.toLowerCase() as any}
                    control={control}
                    render={({ field: { onChange, value = [] } }) => (
                      <CheckboxGroup
                        values={value}
                        setValues={onChange}
                        className="grid grid-cols-3 gap-4 md:flex"
                      >
                        {permissions.map(({ value, label }) => (
                          <AdvancedCheckbox
                            key={value}
                            name={`${parent}.${value.toLowerCase()}`}
                            value={value}
                            inputClassName="[&:checked~span>.icon]:block"
                            contentClassName="flex items-center justify-center"
                          >
                            <PiCheckBold className="icon me-1 hidden h-[14px] w-[14px] md:h-4 md:w-4" />
                            <span className="font-medium">{label}</span>
                          </AdvancedCheckbox>
                        ))}
                      </CheckboxGroup>
                    )}
                  />
                </div>
              );
            })}
          </div>

          <div className="col-span-full flex items-center justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full md:w-auto"
            >
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
