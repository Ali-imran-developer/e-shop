import { MainModal } from "../../modal";
import EditRole from "../edit-role";

interface AddUserModalProps {
  show: boolean;
  onClose: () => void;
}

export const AddUserModal = ({ show, onClose }: AddUserModalProps) => {
  return (
    <MainModal show={show} onClose={onClose} size="md">
      <EditRole onClose={onClose} />
    </MainModal>
  );
};
