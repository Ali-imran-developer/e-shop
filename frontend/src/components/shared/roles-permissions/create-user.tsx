import { useEffect, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input, Button, Title, Select } from "rizzui";
import {
  CreateUserInput,
  createUserSchema,
} from "../../../utils/validators/create-user.schema";
import {
  permissions,
  roles,
  statuses,
} from "@components/shared/roles-permissions/utils";
import { useRoles } from "@/hooks/roles-hook";
import toast from "react-hot-toast";

interface CreateUserProps {
  onClose: () => void;
}

export default function CreateUser({ onClose }: CreateUserProps) {
  const [isLoading, setLoading] = useState(false);
  const { handleCreateRoles } = useRoles();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      permissions: "",
      status: "",
    },
  });

  // const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
  //   const formattedData = {
  //     ...data,
  //     createdAt: new Date(),
  //   };
  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log("formattedData", formattedData);
  //     setLoading(false);
  //     reset();
  //     onClose();
  //   }, 600);
  // };

  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    try {
      setLoading(true);
      const payload = {
        name: data.role,
        permissions: Array.isArray(data?.permissions) ? data?.permissions : [data?.permissions],
      };
      const response = await handleCreateRoles(payload as any);

      reset();
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Modal opened");
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
    >
      <div className="col-span-full flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add a new User
        </Title>
        <button type="button" onClick={onClose}>
          <PiXBold className="h-auto w-5" />
        </button>
      </div>

      <Input
        label="Full Name"
        placeholder="Enter user's full name"
        {...register("fullName")}
        className="col-span-full"
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        placeholder="Enter user's Email Address"
        className="col-span-full"
        {...register("email")}
        error={errors.email?.message}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={roles}
            label="Role"
            className="col-span-full"
            error={errors.role?.message}
            displayValue={(selected) =>
              roles.find((option) => option.value === selected)?.label ?? ""
            }
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={statuses}
            label="Status"
            error={errors.status?.message}
            displayValue={(selected) =>
              statuses.find((option) => option.value === selected)?.label ?? ""
            }
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <Controller
        name="permissions"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={permissions}
            label="Permissions"
            error={errors.permissions?.message}
            displayValue={(selected) =>
              permissions.find((option) => option.value === selected)?.label ??
              ""
            }
            getOptionValue={(option) => option.value}
          />
        )}
      />

      <div className="col-span-full flex items-center justify-end gap-4">
        <Button variant="outline" onClick={onClose} className="w-full @xl:w-auto">
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} className="w-full @xl:w-auto">
          Create User
        </Button>
      </div>
    </form>
  );
}
