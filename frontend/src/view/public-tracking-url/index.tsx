import { Flex, Text, Title } from "rizzui";

const OrderTracking = () => {
  const orderInfo = {
    updateDate: "November 21, 2022",
    expectedDate: "Wednesday, November 30, 2022",
    orderDate: "November 21, 2022",
  };

  const statusSteps = [
    { status: "Delivered", completed: false },
    { status: "Out for Delivery", completed: false },
    { status: "Shipped", completed: false },
    { status: "Ordered", completed: true, date: orderInfo.orderDate },
  ];

  const navTabs = [{ name: "Overview", active: true }];

  const orderDetails = {
    product: {
      name: "Sony PlayStation 5, Digital Edition",
      price: 399.0,
      image:
        "https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart&zoom=0.99",
    },
    summary: [
      { label: "Subtotal (1 item)", value: 399.0 },
      { label: "Shipping", value: "Free" },
      { label: "Tax", value: 38.9 },
    ],
    total: 437.9,
    paymentMethod: "Cash on delivery",
  };

  return (
    <div className="sm:max-w-lg lg:max-w-4xl mx-auto p-4 font-sans shadow-lg border rounded-xl my-2 lg:flex lg:justify-between lg:px-8 lg:pt-5 lg:mt-6">
      <div className="flex flex-col">
        <div className="">
          <Flex className="items-baseline flex-col gap-0 py-2">
            <Title className="text-lg lg:text-2xl font-bold lg:font-semibold">Track order</Title>
            <Text className="text-gray-500 text-xs lg:text-base font-bold lg:font-semibold">
              Updated on {orderInfo.updateDate}
            </Text>
          </Flex>

          <Flex className="items-baseline pb-2 flex-col gap-0">
            <Title className="text-lg lg:text-2xl font-bold lg:font-semibold">
              Expected arrival date
            </Title>
            <Text className="text-gray-500 text-xs lg:text-base font-bold lg:font-semibold">
              {orderInfo.expectedDate}
            </Text>
          </Flex>
        </div>

        <div className="bg-white pb-4 mt-3 mb-4">
          <div className="flex gap-8 mb-4">
            {navTabs.map((tab, index) => (
              <button
                key={index}
                className="text-blue-600 font-semibold border-b-2 border-blue-500 pb-1"
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      step.completed
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 bg-white"
                    } z-10`}
                  >
                    {step.completed && (
                      <svg
                        className="w-4 h-4 text-white mx-auto my-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">
                      {step.status}
                    </span>
                    {step.date && (
                      <p className="text-sm text-gray-500 font-semibold">
                        {step.date}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pb-4">
        <Title className="text-lg font-medium mb-4">Order Summary</Title>

        <div className="flex gap-4 mb-6">
          <img
            src={orderDetails.product.image}
            alt=""
            className="w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{orderDetails.product.name}</p>
            <p className="text-medium font-semibold text-black">
              ${orderDetails.product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {orderDetails.summary.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-semibold">{item.label}</span>
              <span className="font-semibold">
                {typeof item.value === "number"
                  ? item.value.toFixed(2)
                  : item.value}
              </span>
            </div>
          ))}
          <div className="flex justify-between font-medium text-base pt-2 border-t">
            <span>Total</span>
            <span>{orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Payment Method</h3>
          <div className="text-red-600 font-semibold">
            {orderDetails.paymentMethod}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;