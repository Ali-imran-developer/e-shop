import { ActionIcon, Button, Flex, Title } from "rizzui";
import { MainModal } from "../../../../components/shared/modal";
import { PiX } from "react-icons/pi";
import { ReactNode } from "react";

interface Iprops {
  show: boolean;
  onClose: () => void;
  View?: ReactNode;
}

const SKUModal = ({ show, onClose, View }: Iprops) => {
  return (
    <MainModal onClose={onClose} show={show} size="lg" className="p-5">
      <Flex direction="row" justify="between" align="center">
        <Title as="h4">Update Mapping</Title>
        <ActionIcon variant="text" size="xl" onClick={onClose}>
          <PiX size={28} />
        </ActionIcon>
      </Flex>
      {View}
    </MainModal>
  );
};

export default SKUModal;
