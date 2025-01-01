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

export default function ChartJenisLaporan({ data }: any) {
  if (data.length == 0) {
    return (
      <div className='text-xs text-muted-foreground mx-auto flex items-center justify-center h-full w-full'>
        <span className=''>Anda belum memiliki laporan apa pun.</span>
      </div>
    );
  }
  const chartData =
    data &&
    data.map((item: any) => ({
      jenis: item.jenis,
      jumlah: item._count.id, // Sesuaikan dengan struktur data `item`
      fill: `var(--color-${item.jenis})`,
    }));

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
