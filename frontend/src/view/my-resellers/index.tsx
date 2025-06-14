import PageHeader from "@shared/page-header";
import ResllersTable from "./resellers-list/table";
import { metaObject } from "@config/site.config";

export const metadata = {
  ...metaObject("My Resellers"),
};

const pageHeader = {
  title: "My Resellers",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "My Resellers",
    },
  ],
};

export default function myResllers() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <ResllersTable />
      </div>
    </>
  );
}
