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
const chartData = [
  { month: "January", penemuan: 186, kehilangan: 80 },
  { month: "February", penemuan: 305, kehilangan: 200 },
  { month: "March", penemuan: 237, kehilangan: 120 },
  { month: "April", penemuan: 73, kehilangan: 190 },
  { month: "May", penemuan: 209, kehilangan: 130 },
  { month: "June", penemuan: 214, kehilangan: 140 },
];

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

export default function StatistikPerBulan() {
  return (
    <ChartContainer config={chartConfig} className='max-h-[350px] mx-auto'>
      <AreaChart
        accessibilityLayer
        data={chartData}
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
