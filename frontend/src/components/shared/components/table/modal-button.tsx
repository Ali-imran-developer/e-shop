import { PiPlusBold } from "react-icons/pi";
import { useModal } from "../../../shared/modal-views/use-modal";
import CreateUser from "@components/shared/roles-permissions/create-user";
import { Button, type ButtonProps } from "rizzui";
// import cn from "@utils/helperFunctions/class-names";
import cn from "@/utils/helperFunctions/class-names";

interface ModalButtonProps extends ButtonProps {
  label?: string;
  className?: string;
  customSize?: string;
  icon?: React.ReactNode;
  view: React.ReactNode;
}

export default function ModalButton({
  label = "Add New",
  className,
  customSize = "500px",
  view,
  icon = <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />,
  ...rest
}: ModalButtonProps) {
  const { onOpen } = useModal();
  return (
    <Button
      className={cn(
        "mt-5 w-full text-xs capitalize @lg:w-auto sm:text-sm lg:mt-0",
        className
      )}
      // onClick={() => onOpen(<CreateUser />)}
      {...rest}
    >
      {icon}
      {label}
    </Button>
  );
}
