import { Link } from "react-router-dom";
import { Button } from "rizzui";
import WelcomeBanner from "@shared/components/banners/welcome";
import StatCards from "./components/stat-cards";
import ProfitWidget from "./components/profit-widget";
import SalesReport from "./components/sales-report";
import BestSellers from "./components/best-sellers";
import RepeatCustomerRate from "./components/repeat-customer-rate";
import UserLocation from "./components/user-location";
import RecentOrder from "./components/recent-order";
import StockReport from "./components/stock-report";
import { PiPlusBold } from "react-icons/pi";
import HandWaveIcon from "@shared/components/icons/hand-wave";
import AuthController from "@/controllers/authController";

export default function EcommerceDashboard() {
  // const { stores } = AuthController.getSession();
  return (
    // <div className="@container">
    //   <WelcomeBanner
    //     title={
    //       <>
    //         Good Morning {""}
    //         <HandWaveIcon className="inline-flex h-8 w-8" />
    //       </>
    //     }
    //     description={
    //       "You don't have a store yet. Create your first store to start managing your products."
    //     }
    //     media={
    //       <div className=" ">
    //         <img
    //           src="/assets/images/not-found.png"
    //           alt="Welcome shop image form freepik"
    //           className="dark:brightness-95 dark:drop-shadow-md"
    //           width={200}
    //           height={200}
    //         />
    //       </div>
    //     }
    //     contentClassName="@2xl:max-w-[calc(100%-340px)]"
    //     className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
    //   >
    //     <Link to={"/add-channels"} className="inline-flex">
    //       <Button as="span" className="h-[38px] shadow md:h-10">
    //         <PiPlusBold className="me-1 h-4 w-4" /> Create Store
    //       </Button>
    //     </Link>
    //   </WelcomeBanner>
    // </div>
  
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />

        <ProfitWidget className="h-[464px] @sm:h-[520px] @7xl:col-span-8 @7xl:col-start-12 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" />

        <SalesReport className="@4xl:col-span-1 @7xl:col-span-8" />

        <RecentOrder className="relative @4xl:col-span-2 @7xl:col-span-12" />

        <RepeatCustomerRate className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-8" />

        <BestSellers className="@7xl:col-span-6 @[90rem]:col-span-4" />

        <UserLocation className="@7xl:col-span-6 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8" />
      </div>
    </div>
  );
}
