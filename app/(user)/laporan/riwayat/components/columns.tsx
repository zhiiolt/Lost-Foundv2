/** @format */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { kategori, statuses, jenis } from "../data/data";
import { Laporan } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IconHash } from "@tabler/icons-react";
import { formatTanggal } from "@/lib/time";

export const columns: ColumnDef<Laporan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "judul",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Judul' />
    ),
    cell: ({ row }) => {
      const label = jenis.find(
        (label) => label.value === row.getValue("jenis")
      );

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'> {label.label}</Badge>}
          <span className='max-w-[200px] truncate font-medium'>
            {row.getValue("judul")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kategori' />
    ),
    cell: ({ row }) => {
      const kat = kategori.find(
        (kategori) => kategori.value === row.original.kategori
      );

      if (!kat) {
        return null;
      }

      return (
        <div className='flex w-[150px] items-center'>
          {kat.icon && (
            <kat.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{kat.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          {formatTanggal(row.getValue("tanggal"))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lokasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lokasi' />
    ),
    cell: ({ row }) => {
      return <div className='flex items-center'>{row.getValue("lokasi")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='jenis' />
    ),
    cell: ({ row }) => {
      return <div className='hidden w-0'>{row.getValue("lokasi")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
