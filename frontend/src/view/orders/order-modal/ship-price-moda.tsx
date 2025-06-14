import { useState } from "react";
import { Input, Title, Button, Modal } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const shipPriceSchema = z.object({
  shipping: z.string().min(1, "Shipping price is required"),
});

type ShipPriceInput = z.infer<typeof shipPriceSchema>;

interface ShipPriceProps {
  show: boolean;
  onClose: () => void;
  initialData?: {
    shipping: string;
  };
  onUpdate?: (updatedDetails: ShipPriceInput) => void;
}

export default function ShipPriceModel({ 
  onClose, 
  show, 
  initialData = { shipping: '' },
  onUpdate
}: ShipPriceProps) {
  const [isLoading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ShipPriceInput>({
    resolver: zodResolver(shipPriceSchema),
    defaultValues: {
      shipping: initialData.shipping || '',
    }
  });

  const onSubmit: SubmitHandler<ShipPriceInput> = (data) => {
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
          Shipping Fees
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Input
              type="text"
              label="Edit Shipping Fees"
              labelClassName="text-sm font-medium text-gray-900"
              placeholder="Enter shipping fees"
              {...register("shipping")}
              error={errors.shipping?.message}
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
