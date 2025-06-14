import { useState } from "react";
import { Input, Title, Button, Modal, Flex } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const discountSchema = z.object({
  discount_type: z.string().min(3, "Address must be at least 3 characters"),
  discount_value: z.string().min(3, "Address must be at least 3 characters"),
  discount_reason: z.string().min(3, "Address must be at least 3 characters"),
});

type DiscountInput = z.infer<typeof discountSchema>;

interface DiscountProps {
  show: boolean;
  onClose: () => void;
  initialData?: {
    discount_type?: string;
    discount_value?: string;
    discount_reason?: string;
  };
  onUpdate?: (updatedDetails: DiscountInput) => void;
}

export default function DiscountModel({
  onClose,
  show,
  initialData = {},
  onUpdate,
}: DiscountProps) {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiscountInput>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discount_type: initialData.discount_type || "",
      discount_value: initialData.discount_value || "",
      discount_reason: initialData.discount_reason || "",
    },
  });

  const onSubmit: SubmitHandler<DiscountInput> = (data) => {
    setLoading(true);
    try {
      if (onUpdate) {
        onUpdate(data);
      }
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
      containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
      className="z-[9999]"
      size="md"
    >
      <div className="m-auto p-6">
        <Title as="h3" className="mb-6 text-lg">
            Apply discount to item
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Flex>
              <Input
                type="text"
                label="Discount type"
                labelClassName="text-sm font-medium text-gray-900"
                placeholder="Enter Discount type"
                {...register("discount_type")}
                error={errors.discount_type?.message}
              />
              <Input
                type="text"
                label="Discount value"
                labelClassName="text-sm font-medium text-gray-900"
                placeholder="Enter Discount value"
                {...register("discount_value")}
                error={errors.discount_value?.message}
              />
            </Flex>
            <Input
                type="text"
                label="Reason for discount"
                labelClassName="text-sm font-medium text-gray-900"
                placeholder=""
                {...register("discount_reason")}
                error={errors.discount_reason?.message}
              />
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
