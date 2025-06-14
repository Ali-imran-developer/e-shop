import { Modal } from "rizzui";

type IProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: "md" | "lg";
  className?: string;
};

export const MainModal = ({
  show,
  onClose,
  children,
  size,
  className,
}: IProps) => {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
      containerClassName={`dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl ${className}`}
      className="z-[9999]"
      size={size as any}
    >
      {children}
    </Modal>
  );
};
