import { Button } from 'rizzui';
import { PiSliders } from 'react-icons/pi';
import cn from '@/utils/helperFunctions/class-names';
import { DrawerPlacements, useDrawer } from '@shared/drawer-views/use-drawer';

interface FiltersButtonProps {
  className?: string;
  modalView: React.ReactNode;
  placement: DrawerPlacements;
}

export default function FiltersButton({
  className,
  placement,
  modalView,
}: FiltersButtonProps) {
  const { openDrawer } = useDrawer();
  return (
    <Button
      className={cn(
        'w-28 mt-4 cursor-pointer @lg:mt-0 @lg:w-auto',
        className
      )}
      onClick={() =>
        openDrawer({
          view: modalView,
          placement,
        })
      }
    >
      <PiSliders className="me-1 h-4 w-4 rotate-90" />
      Filters
    </Button>
  );
}
