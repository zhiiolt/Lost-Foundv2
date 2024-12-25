/** @format */

"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
const chartData = [
  { kategori: "elektronik", jumlah: 5, fill: "var(--color-elektronik)" },
  { kategori: "dokumen", jumlah: 6, fill: "var(--color-dokumen)" },
  { kategori: "kunci", jumlah: 2, fill: "var(--color-kunci)" },
  { kategori: "aksesoris", jumlah: 7, fill: "var(--color-aksesoris)" },
  { kategori: "hewan", jumlah: 1, fill: "var(--color-hewan)" },
];

const chartConfig = {
  jumlah: {
    label: "Jumlah",
  },
  elektronik: {
    label: "Elektronik",
    color: "hsl(var(--chart-1))",
  },
  dokumen: {
    label: "Dokumen Penting",
    color: "hsl(var(--chart-2))",
  },
  kunci: {
    label: "Kunci",
    color: "hsl(var(--chart-3))",
  },
  aksesoris: {
    label: "Aksesoris",
    color: "hsl(var(--chart-4))",
  },
  hewan: {
    label: "Hewan",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function ChartKategoriLaporan() {
  const totalLaporan = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.jumlah, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'>
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Pie
          data={chartData}
          dataKey='jumlah'
          nameKey='kategori'
          innerRadius={60}
          strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-3xl font-bold'>
                      {totalLaporan.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className='fill-muted-foreground'>
                      Laporan
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
