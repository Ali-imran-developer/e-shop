import { ReactNode } from "react";
import { ActionIcon, Flex, Title } from "rizzui";
import { PiX } from "react-icons/pi";
import { MainModal } from "../modal";

interface Iprops {
  show: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

const BrowseOrdersModal = ({ children, show, onClose, title }: Iprops) => {
  return (
    <MainModal onClose={onClose} show={show} size="lg" className="p-5">
      <Flex direction="row" justify="between" align="center">
        <Title as="h4">{title}</Title>
        <ActionIcon variant="text" size="lg" onClick={onClose}>
          <PiX size={28} />
        </ActionIcon>
      </Flex>
      {children}
    </MainModal>
  );
};

export default BrowseOrdersModal;
