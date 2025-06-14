import { Text } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import SimpleBar from "@ui/simplebar";
import MetricCard from "@shared/components/cards/metric-card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import TrendingUpIcon from "@shared/components/icons/trending-up";
import TrendingDownIcon from "@shared/components/icons/trending-down";
import { CustomTooltip } from "@/components/shared/components/charts/custom-tooltip";

interface StatsCardsProps {
  className?: string;
}

const filesStatData = [
  {
    id: 1,
    title: "Total ARR",
    metric: "Rs. 16,085k",
    fill: "#3872FA",
    percentage: 32,
    increased: true,
    decreased: false,
    value: "+32.40",
    engagementRate: 70.03,
    chart: [
      {
        key: "Sat",
        target: 2000,
        actual: 1000,
      },
      {
        key: "Sun",
        target: 4200,
        actual: 3700,
      },
      {
        key: "Mon",
        target: 3000,
        actual: 5800,
      },
      {
        key: "Tue",
        target: 5780,
        actual: 3908,
      },
      {
        key: "Wed",
        target: 4080,
        actual: 2500,
      },
      {
        key: "Thu",
        target: 2300,
        actual: 5200,
      },
      {
        key: "Fri",
        target: 4890,
        actual: 6500,
      },
    ],
  },
  {
    id: 2,
    title: "Total Sales",
    metric: "Rs. 12,402k",
    fill: "#3872FA",
    percentage: 48,
    increased: false,
    decreased: true,
    value: "-18.45",
    chart: [
      {
        key: "Sat",
        target: 2000,
        actual: 1000,
      },
      {
        key: "Sun",
        target: 4200,
        actual: 3700,
      },
      {
        key: "Mon",
        target: 3000,
        actual: 5800,
      },
      {
        key: "Tue",
        target: 5780,
        actual: 3908,
      },
      {
        key: "Wed",
        target: 4080,
        actual: 2500,
      },
      {
        key: "Thu",
        target: 2300,
        actual: 5200,
      },
      {
        key: "Fri",
        target: 4890,
        actual: 6500,
      },
    ],
  },
  {
    id: 3,
    title: "Total Costs",
    metric: "Rs. 12,402",
    fill: "#3872FA",
    percentage: 19,
    increased: true,
    decreased: false,
    value: "+20.34",
    engagementRate: 53.95,
    chart: [
      {
        key: "Sat",
        target: 2000,
        actual: 1000,
      },
      {
        key: "Sun",
        target: 4200,
        actual: 3700,
      },
      {
        key: "Mon",
        target: 3000,
        actual: 5800,
      },
      {
        key: "Tue",
        target: 5780,
        actual: 3908,
      },
      {
        key: "Wed",
        target: 4080,
        actual: 2500,
      },
      {
        key: "Thu",
        target: 2300,
        actual: 5200,
      },
      {
        key: "Fri",
        target: 4890,
        actual: 6500,
      },
    ],
  },
  {
    id: 4,
    title: "Total Order",
    metric: "Rs. 12,402 ",
    fill: "#3872FA",
    percentage: 54,
    increased: true,
    decreased: false,
    value: "+14.45",
    engagementRate: 67.92,
    chart: [
      {
        key: "Sat",
        target: 2000,
        actual: 1000,
      },
      {
        key: "Sun",
        target: 4200,
        actual: 3700,
      },
      {
        key: "Mon",
        target: 3000,
        actual: 5800,
      },
      {
        key: "Tue",
        target: 5780,
        actual: 3908,
      },
      {
        key: "Wed",
        target: 4080,
        actual: 2500,
      },
      {
        key: "Thu",
        target: 2300,
        actual: 5200,
      },
      {
        key: "Fri",
        target: 4890,
        actual: 6500,
      },
    ],
  },
];

export default function StatsCards({ className }: StatsCardsProps) {
  return (
    <SimpleBar>
      <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12 3xl:gap-8">
        {filesStatData.map((stat: any) => {
          return (
            <MetricCard
              key={stat.id}
              title={stat.title}
              metric={stat.metric}
              chartClassName="w-44"
              metricClassName="3xl:text-[22px]"
              className={cn("w-full max-w-full justify-between", className)}
              chart={
                <div className="ms-auto h-12 w-full 4xl:h-9">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stat.chart}
                      margin={{
                        left: -10,
                      }}
                      className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
                    >
                      <defs>
                        <linearGradient id="target" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#eab308"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#eab308"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#00D1FF"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00D1FF"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="8 10"
                        strokeOpacity={0.435}
                      />
                      {/* <XAxis dataKey="key" axisLine={false} tickLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={({ payload, ...rest }) => {
                          const pl = {
                            ...payload,
                            value: formatNumber(Number(payload.value)),
                          };
                          return (
                            <CustomYAxisTick
                              prefix={"$"}
                              payload={pl}
                              {...rest}
                            />
                          );
                        }}
                      /> */}
                      <Tooltip
                        content={<CustomTooltip formattedNumber prefix="$" />}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#eab308"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#target)"
                      />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="#00D1FF"
                        strokeWidth={2}
                        fillOpacity={1}
                        offset={10}
                        fill="url(#actual)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              }
            >
              <Text className="mt-5 flex items-center leading-none text-gray-500">
                <Text
                  as="span"
                  className={cn(
                    "me-2 inline-flex items-center font-medium",
                    stat.increased ? "text-green" : "text-red"
                  )}
                >
                  {stat.increased ? (
                    <TrendingUpIcon className="me-1 h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="me-1 h-4 w-4" />
                  )}
                  {stat.value}%
                </Text>
                {stat.increased ? "Increased" : "Decreased"} last month
              </Text>
            </MetricCard>
          );
        })}
      </div>
    </SimpleBar>
  );
}
