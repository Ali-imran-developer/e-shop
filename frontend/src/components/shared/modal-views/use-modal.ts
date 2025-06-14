// import { atom, useAtom } from "jotai";
// import { ModalSize } from "rizzui";

// type ModalTypes = {
//   view: React.ReactNode;
//   isOpen: boolean;
//   customSize?: string;
//   size?: ModalSize;
// };
import { atom, useAtom } from "jotai";
import { ModalSize } from "rizzui";

// const modalAtom = atom<ModalTypes>({
//   isOpen: false,
//   view: null,
//   customSize: "320px",
//   size: "sm",
// });

// export function useModal() {
//   const [state, setState] = useAtom(modalAtom);

//   const openModal = ({
//     view,
//     customSize,
//     size,
//   }: {
//     view: React.ReactNode;
//     customSize?: string;
//     size?: ModalSize;
//   }) => {
//     setState({
//       ...state,
//       isOpen: true,
//       view,
//       customSize,
//       size,
//     });
//   };

//   const closeModal = () => {
//     setState({
//       ...state,
//       isOpen: false,
//     });
//   };

//   return {
//     ...state,
//     openModal,
//     closeModal,
//   };
// }
import { useState, useCallback, ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModal = (): ModalProps => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState<ReactNode | null>(null);

  const onOpen = useCallback(() => {
    // setView(viewComponent);
    setShow(true);
  }, []);

  const onClose = useCallback(() => {
    setShow(false);
    setView(null);
  }, []);

  return {
    show,
    onOpen,
    onClose,
  };
};
