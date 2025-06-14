import { useState } from "react";
import EyeIcon from "@shared/components/icons/eye";
import PencilIcon from "@shared/components/icons/pencil";
import { ActionIcon, Flex, Tooltip } from "rizzui";
import { Link } from "react-router-dom";
import cn from "@utils/helperFunctions/class-names";
import DeletePopover from "../delete-popover";
import { AddUserModal } from "../../roles-permissions/modal/edititem";

export default function TableRowActionGroup({
  onDelete,
  editUrl = "#",
  viewUrl = "#",
  deletePopoverTitle = "Delete the appointment",
  deletePopoverDescription = "Are you sure you want to delete this item?",
  className = "",
}: {
  onDelete?: () => void;
  editUrl?: string;
  viewUrl?: string;
  deletePopoverTitle?: string;
  deletePopoverDescription?: string;
  className?: string;
}) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Function to handle edit button click
  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

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
            className="cursor-pointer"
            onClick={handleEditClick} // Open modal on click
          >
            <PencilIcon className="size-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content="View Item" placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label="View item"
            className="cursor-pointer"
            onClick={() => setEditModalOpen(true)} // Open modal for View Item
          >
            <EyeIcon className="size-4" />
          </ActionIcon>
        </Tooltip>
        {/* <DeletePopover
          title={deletePopoverTitle}
          description={deletePopoverDescription}
          onDelete={onDelete}
        /> */}
      </Flex>

      {/* Render AddUserModal with EditRole */}
      <AddUserModal show={isEditModalOpen} onClose={handleCloseModal} />
    </>
  );
}
