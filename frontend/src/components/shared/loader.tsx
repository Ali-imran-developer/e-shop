import { Loader } from "rizzui";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader size="xl" />
    </div>
  );
};
export const TableLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader size="xl" />
    </div>
  );
};
