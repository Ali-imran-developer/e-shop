import { useNavigate } from "react-router-dom";
import { Modal, Button, Title } from "rizzui";

type CourierModalProps = {
  isOpen: boolean;
  title1?: string;
  title2?: string;
  route?: string;
  ButtonName?: string;
  onClose: () => void;
};

export default function DynamicModal({
  isOpen,
  onClose,
  title1,
  title2,
  route,
  ButtonName,
}: CourierModalProps) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-5 space-y-4">
        <Title className="text-lg font-semibold text-center">{title1}</Title>
        <Title className="text-lg font-semibold text-center ">{title2}</Title>
        <div className="pt-4 flex gap-4 justify-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => navigate(`${route}`)}>{ButtonName}</Button>
        </div>
      </div>
    </Modal>
  );
}
