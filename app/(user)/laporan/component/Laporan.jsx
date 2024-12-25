/** @format */
"use client";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { kategori, statuses, jenis } from "@/schema/enum";
import { isThisMonth, isThisWeek, isToday } from "date-fns";

import { CardLaporan } from "./CardLaporan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Laporan({ laporan }) {
  const [filters, setFilters] = React.useState({
    statuses: [],
    kategori: [],
    waktu: "semua",
  });
  const filteredLaporan = laporan.filter((item) => {
    const filterStatus =
      filters.statuses.length === 0 || filters.statuses.includes(item.status);

    const filterKategori =
      filters.kategori.length === 0 || filters.kategori.includes(item.kategori);

    const filterWaktu =
      filters.waktu === "semua" ||
      (filters.waktu === "hari" && isToday(new Date(item.tanggal))) ||
      (filters.waktu === "minggu" && isThisWeek(new Date(item.tanggal))) ||
      (filters.waktu === "bulan" && isThisMonth(new Date(item.tanggal)));

    return filterStatus && filterKategori && filterWaktu;
  });
  return (
    <div className='p-4 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='md:col-span-2'>
        <Tabs defaultValue='semua' className='space-y-8'>
          <TabsList>
            <TabsTrigger value='semua'>Semua</TabsTrigger>
            <TabsTrigger value='kehilangan'>Kehilangan</TabsTrigger>
            <TabsTrigger value='penemuan'>Penemuan</TabsTrigger>
          </TabsList>

          <TabsContent value='semua'>
            <CardLaporan laporan={filteredLaporan} />
          </TabsContent>
          <TabsContent value='kehilangan'>
            <CardLaporan
              laporan={filteredLaporan.filter(
                (item) => item.jenis === "kehilangan"
              )}
            />
          </TabsContent>
          <TabsContent value='penemuan'>
            <CardLaporan
              laporan={filteredLaporan.filter(
                (item) => item.jenis === "penemuan"
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className='md:col-span-1'>
        <FilterBox filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

const FilterBox = ({ filters, setFilters }) => {
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const currentValues = prev[type];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value) // Hapus jika sudah ada
        : [...currentValues, value]; // Tambah jika belum ada
      return { ...prev, [type]: updatedValues };
    });
  };

  const handleRadioChange = (value) => {
    setFilters((prev) => ({ ...prev, waktu: value }));
  };

  return (
    <Card className='max-h-[600px] h-fit sticky top-4 overflow-y-scroll mt-[68px]'>
      <CardHeader className='sticky top-0 bg-white'>
        <CardTitle>Filter Laporan</CardTitle>
        <CardDescription>
          Data laporan akan difilter sesuai pilihan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filter Status */}
        <Collapsible>
          <div className='flex items-center justify-between space-x-4 pb-1'>
            <h4 className='text-sm font-semibold'>Status</h4>
            <CollapsibleTrigger asChild>
              <Button variant='ghost' size='sm'>
                <ChevronsUpDown className='h-4 w-4' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator />
          <CollapsibleContent className='space-y-3 py-4 px-2'>
            {statuses.map((status, index) => (
              <div className='flex items-center space-x-2' key={index}>
                <Checkbox
                  id={status.value}
                  checked={filters.statuses.includes(status.value)}
                  onCheckedChange={() =>
                    handleCheckboxChange("statuses", status.value)
                  }
                />
                <Label
                  htmlFor={status.value}
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  {status.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Filter Kategori */}
        <Collapsible>
          <div className='flex items-center justify-between space-x-4 pb-1'>
            <h4 className='text-sm font-semibold'>Kategori</h4>
            <CollapsibleTrigger asChild>
              <Button variant='ghost' size='sm'>
                <ChevronsUpDown className='h-4 w-4' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator />
          <CollapsibleContent className='space-y-3 py-4 px-2'>
            {kategori.map((kat, index) => (
              <div className='flex items-center space-x-2' key={index}>
                <Checkbox
                  id={kat.value}
                  checked={filters.kategori.includes(kat.value)}
                  onCheckedChange={() => {
                    handleCheckboxChange("kategori", kat.value);
                  }}
                />
                <Label
                  htmlFor={kat.value}
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  {kat.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Filter Waktu */}
        <Collapsible>
          <div className='flex items-center justify-between space-x-4 pb-1'>
            <h4 className='text-sm font-semibold'>Waktu</h4>
            <CollapsibleTrigger asChild>
              <Button variant='ghost' size='sm'>
                <ChevronsUpDown className='h-4 w-4' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator />
          <CollapsibleContent className='space-y-3 py-4 px-2'>
            <RadioGroup value={filters.waktu} onValueChange={handleRadioChange}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='semua' id='r1' />
                <Label
                  htmlFor='r1'
                  className='text-sm leading-none font-normal'>
                  Semua waktu
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='hari' id='r2' />
                <Label
                  htmlFor='r2'
                  className='text-sm leading-none font-normal'>
                  Hari ini
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='minggu' id='r3' />
                <Label
                  htmlFor='r3'
                  className='text-sm leading-none font-normal'>
                  Minggu ini
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='bulan' id='r4' />
                <Label
                  htmlFor='r4'
                  className='text-sm leading-none font-normal'>
                  Bulan ini
                </Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
