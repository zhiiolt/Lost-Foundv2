/** @format */

import Header from "@/app/(user)/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Activity from "@/components/ui/grouped-timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconSparkles } from "@tabler/icons-react";
import { IconWaveSawTool } from "@tabler/icons-react";
import { IconReport } from "@tabler/icons-react";
import ChartJenisLaporan from "./components/ChartJenisLaporan";
import ChartKategoriLaporan from "./components/ChartKategoriLaporan";
import StatistikPerBulan from "./components/StatistikPerBulan";
import RecentLaporan from "./components/CarouselRecentLaporan";
import { IconChartBar } from "@tabler/icons-react";
import { IconGraphFilled } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { IconActivity } from "@tabler/icons-react";
import { IconInfoCircle } from "@tabler/icons-react";

export const metadata = {
  title: "Lost & Found: Dashboard",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function DashboardPage() {
  const breadcrumbs = [
    { title: "Dashboard" },
    // halaman terakhir tanpa link
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4 max-w-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
        <div className='grid gap-4 lg:grid-cols-6'>
          <div className='grid lg:grid-cols-3 gap-4 lg:col-span-4'>
            <Card className='relative'>
              <div className='w-2 bg-teal-500 h-full absolute rounded-s-xl'></div>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 pl-8'>
                <CardTitle className='text-sm font-medium'>
                  Total Laporan Saya
                </CardTitle>
                <IconReport className='text-teal-500' />
              </CardHeader>
              <CardContent className='pl-8'>
                <div className='text-3xl text-teal-500 font-bold'>21</div>
                <p className='text-xs text-muted-foreground'>
                  +20.1% from last month
                </p>
              </CardContent>
              <CardFooter>
                <Link href='/laporan/riwayat' className='w-full pl-2'>
                  <Button
                    className='w-full text-teal-500 hover:text-teal-700'
                    variant='outline'>
                    <IconEye /> Lihat Laporan
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className='relative'>
              <div className='w-2 bg-red-400 h-full absolute rounded-s-xl'></div>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 pl-8'>
                <CardTitle className='text-sm font-medium'>
                  Tingkat Penyelesaian
                </CardTitle>
                <IconWaveSawTool className='text-red-400' />
              </CardHeader>
              <CardContent className='pl-8'>
                <div className='text-3xl text-red-400 font-bold'>65.7%</div>
                <p className='text-xs text-muted-foreground'>
                  +8.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card className='relative'>
              <div className='w-2 bg-yellow-500 h-full absolute rounded-s-xl'></div>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 pl-8'>
                <CardTitle className='text-sm font-medium'>
                  Peringkat Saya
                </CardTitle>
                <IconSparkles className='text-yellow-500' />
              </CardHeader>
              <CardContent className='pl-8'>
                <div className='text-3xl text-yellow-500 font-bold'>212</div>
                <p className='text-xs text-muted-foreground'>Top 3%</p>
              </CardContent>
              <CardFooter>
                <Link href='/laporan/riwayat' className='w-full pl-2'>
                  <Button
                    className='w-full text-yellow-500 hover:text-yellow-700 border-yellow-500 hover:bg-yellow-500/30'
                    variant='outline'>
                    <IconEye /> Lihat Peringkat
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <Card className='hidden md:block lg:row-span-2 lg:col-span-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className=' font-bold text-teal-700'>
                Top Helpers
              </CardTitle>
              <IconGraphFilled className='text-teal-700' />
            </CardHeader>
            <CardContent className='grid gap-8 py-4 '>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/04.png' alt='Avatar' />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    William Kim
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    will@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$99.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/04.png' alt='Avatar' />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    William Kim
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    will@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$99.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/05.png' alt='Avatar' />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Sofia Davis
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    sofia.davis@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/05.png' alt='Avatar' />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Sofia Davis
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    sofia.davis@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/05.png' alt='Avatar' />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Sofia Davis
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    sofia.davis@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/05.png' alt='Avatar' />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Sofia Davis
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    sofia.davis@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
            </CardContent>
          </Card>
          <div className='grid lg:grid-cols-2 lg:col-span-4 gap-4'>
            <Card>
              <CardHeader className='items-center pb-0'>
                <CardTitle>Statistik Jenis Laporan</CardTitle>
              </CardHeader>
              <CardContent className='flex-1 pb-0 mt-4'>
                <ChartJenisLaporan />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='items-center pb-0'>
                <CardTitle>Statistik Kategori Laporan</CardTitle>
              </CardHeader>
              <CardContent className='flex-1 pb-0'>
                <ChartKategoriLaporan />
              </CardContent>
            </Card>
          </div>

          <Card className='lg:col-span-3 flex flex-col gap-4'>
            <CardHeader className='items-center pb-0'>
              <CardTitle>Statistik Laporan per Bulan</CardTitle>
              <CardDescription>
                Menampilkan Jumlah Laporan Saya 6 Bulan Terakhir
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <StatistikPerBulan />
            </CardContent>
          </Card>

          <Card className='lg:col-span-3 max-h-[400px]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Recent Activity
              </CardTitle>
              <IconInfoCircle />
            </CardHeader>
            <CardContent>
              <Activity />
            </CardContent>
          </Card>
        </div>
        <div className='hidden lg:block'>
          <h3 className='text-lg font-bold text-teal-900 py-4'>
            Laporan Terbaru
          </h3>
          <div className='flex justify-center px-12 box-border'>
            <RecentLaporan />
          </div>
        </div>
      </div>
    </div>
  );
}
