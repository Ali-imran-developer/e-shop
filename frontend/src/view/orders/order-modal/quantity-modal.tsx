import { useState } from "react";
import { Input, Title, Button, Modal } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const quantitySchema = z.object({
    quantity: z.string().min(3, "Address must be at least 3 characters"),
});

type QuantityInput = z.infer<typeof quantitySchema>;

interface QuantityProps {
  show: boolean;
  data: any;
  onClose: () => void;
  initialData?: {
    quantity?: string;
  };
  onUpdate?: (updatedDetails: QuantityInput) => void;
}

export default function QuantityModel({ 
  onClose, 
  show, 
  initialData = {}, 
  onUpdate,
  data
}: QuantityProps) {
  const [isLoading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<QuantityInput>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: initialData.quantity || data?.quantity?.toString() || '',
    }
  });

  const onSubmit: SubmitHandler<QuantityInput> = (formData: any) => {
    setLoading(true);
    try {
      if (onUpdate) {
        onUpdate({ quantity: formData.quantity });
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
            Adjust quantity
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Input
              type="text"
              label="Quantity"
              labelClassName="text-sm font-medium text-gray-900"
              placeholder="Enter Quantity"
              {...register("quantity")}
              error={errors.quantity?.message}
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
