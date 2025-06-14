import cn from "@utils/helperFunctions/class-names";
import SimpleBar from "@ui/simplebar";
import Logo from "@shared/components/logo";
import { SidebarMenu } from "./sidebar-menu";
import { Link } from "react-router-dom";
import WorkSpaceSwitcher from "../carbon/work-space-switcher";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[220px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-60",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-2 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6 hidden lg:block 2xl:block">
        <Link
          to={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          {/* <img
            src="https://shopilam.com/assets/img/logo.svg"
            alt=""
            className="max-w-[135px]"
          /> */}
        </Link>
      </div>

      <WorkSpaceSwitcher
        className="px-6 pb-3.5 pt-3.5"
        suffixClassName="text-gray-500 w-5 h-5"
      />

      <SimpleBar className="h-[calc(100%-160px)]">
        <SidebarMenu />
      </SimpleBar>
    </aside>
  );
}
