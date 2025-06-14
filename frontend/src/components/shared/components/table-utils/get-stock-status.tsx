import { Progressbar, Text } from "rizzui";

export function getStockStatus(status: number, stock?: boolean) {
  let progressValue = status > 100 ? 100 : status;
  if (status === 0 && stock) {
    return (
      <>
        <Progressbar
          value={progressValue}
          color="danger"
          className="h-1.5 w-24"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">0 Low In Stock</Text>
      </>
    );
  } else if (status === 0 && stock === false) {
    return (
      <>
        <Progressbar
          value={progressValue}
          color="danger"
          className="h-1.5 w-24"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">Out of stock</Text>
      </>
    );
  } else if (status <= 20) {
    return (
      <>
        <Progressbar
          value={progressValue}
          color="warning"
          className="h-1.5 w-24"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} low stock
        </Text>
      </>
    );
  } else {
    return (
      <>
        <Progressbar
          value={progressValue}
          color="success"
          className={`h-1.5 w-24`}
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} in stock
        </Text>
      </>
    );
  }
}
