import PencilIcon from "@shared/components/icons/pencil";
import { ActionIcon, Box, Button, Flex, Input, Tooltip } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { useModal } from "../../../../components/shared/modal-views/use-modal";
import SKUModal from "./sku-modal";
import { useState } from "react";

export default function TableRowActionGroup({
  className,
  row,
}: {
  className?: string;
  row: any;
}) {
  const { onOpen, onClose, show } = useModal();
  const [updatedValue, setUpdatedValue] = useState(row.productName);

  return (
    <>
      <Flex
        align="center"
        justify="start"
        gap="3"
        className={cn("pe-3", className)}
      >
        <Tooltip size="sm" content="Edit Item" placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="Edit Item"
            onClick={onOpen as any}
          >
            <PencilIcon className="size-4" />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <SKUModal
        show={show}
        onClose={onClose}
        View={
          <Flex direction="col" className="mt-5">
            <Input
              value={updatedValue}
              size="lg"
              label="SKU"
              className="w-full"
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <Input
              value={updatedValue}
              size="lg"
              label="Product Name"
              className="w-full"
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <Input
              value={updatedValue}
              size="lg"
              label="Mahakaar"
              className="w-full"
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <Button className="self-center" size="lg">
              Update
            </Button>
          </Flex>
        }
      />
    </>
  );
}
