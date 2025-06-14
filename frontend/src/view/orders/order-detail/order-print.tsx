import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Avatar, Text, Title } from "rizzui";

interface OrderPrintProps {
  name: string;
  orderRefNumber: string;
  created_at: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    phone: string;
  };
  line_items: Array<{
    title: string;
    quantity: number;
    price: string;
  }>;
  shipperDetail: Array<{
    domainName: string;
    shopDetail: {
      email: string;
      country_name: string;
    };
  }>;
  note?: string;
  shopDetail: {
    name: string;
    email: string;
    domain: string;
    country_name: string;
  };
}

const OrderPrint = ({ data }: any) => {
  const formattedDate = new Date(data?.createdAt)?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto py-6 md:px-8 w-full max-w-screen-xl">
      {/* <div className="flex items-center justify-between gap-4 px-8"> */}
      <div className="flex justify-between w-full max-w-full font-semibold px-8">
        <div className="flex items-center gap-2">
          <span>Order ID</span>
          <span>{data?.name || ""}</span>
        </div>
        <div className="">
          <span>{formattedDate || ""}</span>
        </div>
      </div>
      {/* </div> */}

      <div className="flex items-start gap-20 border-b border-gray-200 py-4 px-8">
        <div className="flex flex-col gap-1 font-semibold">
          <div className="py-4">
            <span className="text-black font-bold">SHIP TO</span>
          </div>
          <span>{data?.shipmentDetails?.addresses[0]?.address1 || ""}</span>
          <span>{data?.shipmentDetails?.addresses[0]?.city?.city || ""}</span>
          <div className="flex items-center gap-2">
            <span>{data?.shipmentDetails?.addresses[0]?.country || ""}</span>
          </div>
          {/* <span>{data?.shopDetail?.country_name || "Not Available"}</span> */}
          <span>{data?.shipmentDetails?.addresses[0]?.phone || ""}</span>
        </div>

        <div className="flex flex-col gap-1 font-semibold">
          <div className="py-4">
            <span className="text-black font-bold">BILL TO</span>
          </div>
          <span></span>
          <span>{data?.shipmentDetails?.addresses[0]?.address1 || ""}</span>
          <span>{data?.shipmentDetails?.addresses[0]?.city?.city || ""}</span>
          {/* <div className="flex items-center gap-2">
            <span>{data?.shipping_address?.city || "Not Available"}</span>
          </div> */}
          <span>{data?.shipmentDetails?.addresses[0]?.country || ""}</span>
          <span>{data?.shipmentDetails?.addresses[0]?.phone || ""}</span>
        </div>
      </div>

      <div className="py-6 px-8 flex items-center justify-between border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-black">ITEMS</div>
          {ensureArray(data?.lineItems)?.map(
            (item: { name: any; image: any }, index: any) => (
              <div key={index} className="py-2 flex items-center gap-8">
                <Avatar name={item?.name || ""} src={item?.image || ""} />
                {/* // className="w-10 h-auto object-cover rounded-full" */}
                <span className="font-semibold">
                  {item?.name || "Not Available"}
                </span>
              </div>
            )
          )}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="font-bold text-black">QUANTITY</div>
          {ensureArray(data?.lineItems)?.map(
            (item: { quantity: any }, index: any) => (
              <div key={index} className="py-2 flex items-center gap-8">
                <span className="font-semibold">
                  {`${item?.quantity || "0"} of ${item?.quantity || "0"}`}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* <div className="flex flex-col gap-4 py-6 px-8">
          <Title as="h6">NOTES</Title>
          <Text className="font-semibold">{data?.note || ""}</Text>
       </div> */}

      <div className="flex flex-col items-center justify-center gap-2 py-4 px-8">
        <Text className="font-semibold">Thank you for shopping with us!</Text>
        {/* <Title as="h6" className="font-medium">
           {data?.orderRefNumber?.replace(/^[^a-zA-Z]+/, "") || "Not Available"}
        </Title> */}
        <Text className="font-semibold">
          {data?.shipmentDetails?.addresses[0]?.country || ""}
        </Text>
        <Text className="font-semibold">
          {data?.shipmentDetails?.email || ""}
        </Text>
        <Text className="font-semibold">
          {ensureArray(data?.lineItems)?.map(
            (item: { vendor: any }, index: any) => (
              <div key={index} className="py-2 flex items-center gap-8">
                <span className="font-semibold">{item?.vendor || ""}</span>
              </div>
            )
          )}
        </Text>
      </div>
    </div>
  );
};

export default OrderPrint;
