import { Drawer } from "rizzui";
import Sidebar from "./sidebar";

export default function CourierDrawer({
  isDrawerOpen,
  closeDrawer,
}: {
  isDrawerOpen: any;
  closeDrawer: () => void;
}) {
  return (
    <Drawer
      size="sm"
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      placement="left"
      containerClassName="w-[220px]"
      className="w-60"
    >
      <div className="w-60 !important">
        <Sidebar />
      </div>
    </Drawer>
  );
}
