/** @format */

"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses, jenis, kategori } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { IconPlus } from "@tabler/icons-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter laporan...'
          value={(table.getColumn("judul")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("judul")?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title='Status'
            options={statuses}
          />
        )}
        {table.getColumn("kategori") && (
          <DataTableFacetedFilter
            column={table.getColumn("kategori")}
            title='Kategori'
            options={kategori}
          />
        )}
        {table.getColumn("jenis") && (
          <DataTableFacetedFilter
            column={table.getColumn("jenis")}
            title='Jenis'
            options={jenis}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'>
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-2'>
        <Link href={`/laporan/create`}>
          <Button className='h-8'>
            <IconPlus /> Buat Laporan
          </Button>
        </Link>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
