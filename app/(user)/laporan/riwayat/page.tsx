/** @format */

import Header from "@/app/(user)/header";
import { headers } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { laporanSchema } from "./data/schema";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Lost & Found: Laporan Saya",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getLaporan() {
  const session = await getServerSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/laporan?email=${session?.user?.email}`,
    {
      cache: "no-store",
    }
  );
  if (res.ok) {
    const data = await res.json();

    return z.array(laporanSchema).parse(data.data);
  } else {
    return [];
  }
}

export default async function RiwayatLaporanPage() {
  const laporan = await getLaporan();

  const breadcrumbs = [
    { title: "Laporan", url: "/laporan" },
    { title: "Laporan Saya" },
    // halaman terakhir tanpa link
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4'>
        <div className='hidden h-full flex-1 flex-col space-y-8 md:flex'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight text-teal-900'>
                Riwayat Laporan
              </h2>
              <p className='text-muted-foreground text-teal-800'>
                Berikut data-data laporan yang telah Anda buat.
              </p>
            </div>
            <div className='flex items-center space-x-2'></div>
          </div>
          <DataTable data={laporan} columns={columns} />
        </div>
      </div>
    </div>
  );
}
