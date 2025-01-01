/** @format */

"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  penemuan: {
    label: "Penemuan",
    color: "hsl(var(--chart-1))",
  },
  kehilangan: {
    label: "Kehilangan",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function StatistikPerBulan({ data }: any) {
  if (data.length == 0) {
    return (
      <div className='text-xs text-muted-foreground mx-auto flex items-center justify-center h-full w-full'>
        <span className=''>Anda belum memiliki laporan apa pun.</span>
      </div>
    );
  }
  return (
    <ChartContainer config={chartConfig} className='max-h-[350px] mx-auto'>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='dot' />}
        />
        <Area
          dataKey='kehilangan'
          type='natural'
          fill='var(--color-kehilangan)'
          fillOpacity={0.4}
          stroke='var(--color-kehilangan)'
          stackId='a'
        />
        <Area
          dataKey='penemuan'
          type='natural'
          fill='var(--color-penemuan)'
          fillOpacity={0.4}
          stroke='var(--color-penemuan)'
          stackId='a'
        />
      </AreaChart>
    </ChartContainer>
  );
}
