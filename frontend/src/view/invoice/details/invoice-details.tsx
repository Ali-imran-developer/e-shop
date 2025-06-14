import { QRCodeSVG } from 'qrcode.react';
import { Badge, Title, Text } from "rizzui";
import Table from "@shared/components/legacy-table";
import { siteConfig } from "@/config/site.config";

const invoiceItems = [
  {
    id: "1",
    product: {
      title: "Fulfilled Orders",
      description:
        "Along With Wordpress Themes & Plugins, We always try to use latest trending techs like React, Next Js, Gatsby Js, GraphQl, Shopify etc to make our products special.",
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  },
  {
    id: "2",
    product: {
      title: "Borobazar React Next Grocery Template",
      description:
        "Our rich tech choice will help you to build high performance applications. We are also known to provide great customer supports to our customers.",
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  }
];

const companyDetails = [
  {
    title: "From",
    name: "REDQ, INC",
    contact: "Jerome Bell",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
    phone: "(302) 555-0107",
    extra: { label: "Creation Date", value: "Mar 22, 2013" },
  },
  {
    title: "Bill To",
    name: "TRANSPORT LLC",
    contact: "Albert Flores",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(671) 555-0110",
    extra: { label: "Due Date", value: "Mar 22, 2013" },
  },
];

const invoiceSummary = [
  { label: "Subtotal", value: "Rs .700" },
  { label: "Shipping", value: "Rs .142" },
  { label: "Discount", value: "Rs .250" },
  { label: "Taxes", value: "15%" },
  { label: "Total", value: "Rs .659.5", isBold: true },
];

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Service",
    dataIndex: "product",
    key: "product",
    width: 350,
    render: (product: any) => (
      <>
        <Title as="h6" className="mb-0.5 text-sm font-medium">
          {product.title}
        </Title>
        <Text
          as="p"
          className="max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
        >
          {product.description}
        </Text>
      </>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 200,
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    width: 200,
    render: (value: string) => <Text className="font-medium">Rs .{value}</Text>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: 200,
    render: (value: string) => <Text className="font-medium">Rs .{value}</Text>,
  },
];

function InvoiceDetailsListTable() {
  return (
    <Table
      data={invoiceItems}
      columns={columns}
      variant="minimal"
      rowKey={(record: any) => record.id}
      scroll={{ x: 660 }}
      className="mb-3"
    />
  );
}

export default function InvoiceDetails() {
  return (
    <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
      <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
        <img
          src={siteConfig.logo}
          alt={siteConfig.title}
          className="dark:invert"
        />
        <div className="mb-4 md:mb-0">
          <Badge
            variant="flat"
            color="success"
            rounded="md"
            className="mb-3 md:mb-2"
          >
            Paid
          </Badge>
          <Title as="h6">INV - #246098</Title>
          <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
        </div>
      </div>

      <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
        {companyDetails.map((detail, index) => (
          <div key={index}>
            <Title as="h6" className="mb-3.5 font-semibold">
              {detail.title}
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              {detail.name}
            </Text>
            <Text className="mb-1.5">{detail.contact}</Text>
            <Text className="mb-1.5">{detail.address}</Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">{detail.phone}</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">
                {detail.extra.label}
              </Text>
              <Text>{detail.extra.value}</Text>
            </div>
          </div>
        ))}
      </div>

      <InvoiceDetailsListTable />

      <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-4 pt-8 xs:flex-row">
        <div className="mt-6 max-w-md pe-4 xs:mt-0">
          <Title
            as="h6"
            className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
          >
            Notes
          </Title>
          <Text className="leading-[1.7]">
            We appreciate your business. Should you need us to add VAT or extra
            notes let us know!
          </Text>
        </div>
        <div className="w-full max-w-sm">
          {invoiceSummary.map((summary, index) => (
            <Text
              key={index}
              className={`flex items-center justify-between ${
                index === invoiceSummary.length - 1 ? "pt-4 font-semibold" : "py-3.5 border-b"
              } text-base lg:py-5`}
            >
              {summary.label}:
              <Text as="span">{summary.value}</Text>
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
}
