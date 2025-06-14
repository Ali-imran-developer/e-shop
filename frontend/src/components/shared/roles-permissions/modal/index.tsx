import { MainModal } from "../../modal";
import CreateUser from "../create-user";

interface AddUserModalProps {
  show: boolean;
  onClose: () => void;
}

export const AddUserModal = ({ show, onClose }: AddUserModalProps) => {
  return (
    <MainModal show={show} onClose={onClose} size="md">
      <CreateUser onClose={onClose} />
    </MainModal>
  );
};
