/** @format */

"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
const chartData = [
  { jenis: "kehilangan", jumlah: 8, fill: "var(--color-kehilangan)" },
  { jenis: "penemuan", jumlah: 13, fill: "var(--color-penemuan)" },
];

const chartConfig = {
  jumlah: {
    label: "Jumlah",
  },
  kehilangan: {
    label: "Kehilangan",
    color: "hsl(var(--chart-1))",
  },
  penemuan: {
    label: "Penemuan",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ChartJenisLaporan() {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px] px-0'>
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey='jumlah' hideLabel />}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey='jenis' />}
          className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center mt-4'
        />
        <Pie
          data={chartData}
          dataKey='jumlah'
          labelLine={false}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill='hsla(var(--foreground))'>
                {payload.jumlah}
              </text>
            );
          }}
          nameKey='jenis'
        />
      </PieChart>
    </ChartContainer>
  );
}
