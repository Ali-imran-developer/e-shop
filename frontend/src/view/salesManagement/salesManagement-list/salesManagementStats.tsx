import CountUp from 'react-countup';
import cn from "@utils/helperFunctions/class-names";
import { IconType } from 'react-icons/lib';
import { PiArrowUpRightBold, PiArrowDownRightBold } from 'react-icons/pi';
import SimpleBar from 'simplebar-react';
import { Box, Text } from 'rizzui';
import { salesManagementStatData } from '@/data/salesMangementStatusData';

type StatType = {
  icon: IconType;
  title: string;
  amount: number;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

type StatCardProps = {
  className?: string;
  transaction: StatType;
};

export default function JobStats({ className }: { className?: string }) {
  return (
    <div className={cn('@container', className)}>
      <SimpleBar>
        <div className="flex items-start gap-4 @md:gap-6 3xl:gap-8">
          {salesManagementStatData.map((stat: StatType, index: number) => {
            return (
              <StatCard
                key={'stat-card-' + index}
                transaction={stat}
                className="w-full"
              />
            );
          })}
        </div>
      </SimpleBar>
    </div>
  );
}

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount} =
    transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-gray-300 p-3 @1xl:p-3',
        className
      )}
    >
      <div className="mb-2 ml-2 mt-2 mr-5 flex items-start gap-5">
        <span className="flex rounded-lg bg-[#E2EEFF] p-3 text-[#3962F7] dark:bg-[#75A1E3]/10 dark:text-[#3b66ec]">
          <Icon className="h-auto w-[28px]" strokeWidth={4} />
        </span>
        <Box className="space-y-1">
          <Text className="font-medium">{title}</Text>
          <Text className="text-[22px] font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
            <CountUp end={amount} duration={3} />
          </Text>
        </Box>
      </div>
    </div>
  );
}
