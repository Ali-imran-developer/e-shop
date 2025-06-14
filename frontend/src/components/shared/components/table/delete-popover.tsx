import { Text, ActionIcon, Button, Popover } from "rizzui";
import TrashIcon from "../icons/trash";

type DeletePopoverProps = {
  // title?: string;
  description?: string;
  onDelete?: () => void;
};

export default function DeletePopover({
  description,
  onDelete,
}: DeletePopoverProps) {
  return (
    <Popover placement="left">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={"Delete Item"}
          className="cursor-pointer"
        >
          <TrashIcon className="size-4 text-red-600" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-10">
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7 bg-red-600 hover:bg-red-500"
                onClick={() => {
                  onDelete && onDelete();
                  setOpen(false);
                }}
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
