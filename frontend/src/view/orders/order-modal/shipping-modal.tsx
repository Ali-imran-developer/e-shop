import { useState } from "react";
import { Input, Title, Button, Modal } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const shippingDetailsSchema = z.object({
  address: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters")
});

type ShippingDetailsInput = z.infer<typeof shippingDetailsSchema>;

interface ShippingModelProps {
  show: boolean;
  onClose: () => void;
  initialData?: {
    address?: string;
    city?: string;
  };
  onUpdate?: (updatedDetails: ShippingDetailsInput) => void;
}

export default function ShippingModel({ 
  onClose, 
  show, 
  initialData = {}, 
  onUpdate 
}: ShippingModelProps) {
  const [isLoading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ShippingDetailsInput>({
    resolver: zodResolver(shippingDetailsSchema),
    defaultValues: {
      address: initialData.address || '',
      city: initialData.city || ''
    }
  });

  const onSubmit: SubmitHandler<ShippingDetailsInput> = (data) => {
    setLoading(true);
    try {
      if (onUpdate) {
        onUpdate(data);
      }
      onClose();
    } catch (error) {
      console.error('Update failed', error);
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
          Edit Shipping Details
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Input
              type="text"
              label="Shipping Address"
              labelClassName="text-sm font-medium text-gray-900"
              placeholder="A.H Colony, faisalabad"
              {...register("address")}
              error={errors.address?.message}
            />
            <Input
              type="text"
              label="Shipping City"
              labelClassName="text-sm font-medium text-gray-900"
              placeholder="Faisalabad"
              {...register("city")}
              error={errors.city?.message}
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
              <Button 
                type="submit" 
                isLoading={isLoading} 
                className="w-auto"
              >
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
