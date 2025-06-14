import { useState } from "react";
import { Input, Title, Button, Modal, Text } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const shipPriceSchema = z.object({
  shipping_price: z.string().min(3, "Address must be at least 3 characters"),
});

type ShipPriceInput = z.infer<typeof shipPriceSchema>;

interface ShipPriceProps {
  show: boolean;
  onClose: () => void;
  initialData?: {
    shipping_price?: string;
  };
  onUpdate?: (updatedDetails: ShipPriceInput) => void;
}

export default function RemoveItemModel({ 
  onClose, 
  show, 
  initialData = {}, 
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
      shipping_price: initialData.shipping_price || '',
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Title as="h6">Are u really want to delete this item ?</Title>
            <div className="mt-4 flex justify-end gap-3">
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
