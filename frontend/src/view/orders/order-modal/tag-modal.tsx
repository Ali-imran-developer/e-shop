import { useState } from "react";
import { Input, Title, Button, Modal } from "rizzui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const tagDetailsSchema = z.object({
  tags: z.string().min(1, "Tags cannot be empty")
});

type TagDetailsInput = z.infer<typeof tagDetailsSchema>;

interface TagModelProps {
  show: boolean;
  onClose: () => void;
  initialData?: {
    tags?: string;
  };
  onUpdate?: (updatedDetails: TagDetailsInput) => void;
}

export default function TagModel({ 
  onClose, 
  show, 
  initialData = {}, 
  onUpdate 
}: TagModelProps) {
  const [isLoading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<TagDetailsInput>({
    resolver: zodResolver(tagDetailsSchema),
    defaultValues: {
      tags: initialData.tags || ''
    }
  });

  const onSubmit: SubmitHandler<TagDetailsInput> = (data) => {
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
          Edit Tags
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            <Input
              type="text"
              label="Tags"
              labelClassName="text-sm font-medium text-gray-900"
              placeholder="Enter tags"
              {...register("tags")}
              error={errors.tags?.message}
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
