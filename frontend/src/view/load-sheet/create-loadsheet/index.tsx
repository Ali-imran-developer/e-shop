import PageHeader from "@shared/page-header";
import { metaObject } from "@config/site.config";
import CreateLoadSheetTable from "./components/table";

export const metadata = {
  ...metaObject("Create Load Sheet"),
};

const pageHeader = {
  title: "Create Load Sheet",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Create Load Sheets",
    },
  ],
};

export default function CreateLoadSheet() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7 3xl:gap-8">
        <CreateLoadSheetTable />
      </div>
    </>
  );
}
