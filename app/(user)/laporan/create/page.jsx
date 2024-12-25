/** @format */

import Header from "@/app/(user)/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateForm from "@/components/forms/laporan/Create";

export const metadata = {
  title: "Lost & Found: Buat Laporan",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function BuatLaporanPage() {
  const breadcrumbs = [
    { title: "Laporan", url: "/laporan" },
    { title: "Laporan Saya", url: "/laporan/riwayat" },
    { title: "Buat Laporan" },
    // halaman terakhir tanpa link
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='py-4 px-16'>
        <Tabs defaultValue='kehilangan' className='w-full'>
          <TabsList>
            <TabsTrigger value='kehilangan'>Kehilangan</TabsTrigger>
            <TabsTrigger value='penemuan'>Penemuan</TabsTrigger>
          </TabsList>
          <TabsContent value='kehilangan'>
            <CreateForm jenis='kehilangan' />
          </TabsContent>
          <TabsContent value='penemuan'>
            <CreateForm jenis='penemuan' />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
