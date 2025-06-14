import { IoCloseCircle } from "react-icons/io5";
import { useEffect } from "react";
import Sidebar from "./sidebar";

interface CustomDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  width?: string;
  height?: string;
}

export default function CustomDrawer({
  isOpen,
  closeDrawer,
  width = "13rem",
  height = "100vh",
}: CustomDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1400]"
          onClick={closeDrawer}
        >
          <div
            className="fixed top-0 left-0 bg-white shadow-lg transition-transform duration-300 ease-in-out z-[1500]"
            style={{ width, height }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4">
              <IoCloseCircle
                className="text-black w-6 h-6 cursor-pointer"
                onClick={closeDrawer}
              />
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
