/** @format */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import photo from "../../../../assets/avatar/olly.jpg";
import dompet from "../../../../assets/losts/dompet.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  IconGhost2Filled,
  IconMessage,
  IconMessage2Filled,
  IconMessageFilled,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function CardLaporan() {
  return (
    <Card className='bg-red-100 border border-red-200 max-w-[350px]'>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Avatar className='me-3 object-cover'>
              <AvatarImage src={photo.src} className='object-cover' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold'>Reyhan Putra</p>
              <p className='text-sm text-slate-500'>2 jam lalu</p>
            </div>
          </div>
          <span className='bg-pink-100 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 h-6  rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-pink-500 '>
            <IconGhost2Filled className='w-3 h-3 ' />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Halo semua! Saya kehilangan dompet warna hitam merek Fossil di area
          parkir Mall XYZ pada Minggu, 15 Desember sekitar pukul 14.00. Di
          dalamnya ada KTP atas nama [Nama Kamu], kartu debit, dan uang tunai
          secukupnya. 🙏
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='w-full bg-red-700 hover:bg-red-900'>
              <IconEye /> Lihat Detail
            </Button>
          </DialogTrigger>
          <DialogContent className='pt-12 max-h-[600px] overflow-y-scroll min-w-[700px]'>
            <DialogHeader className='border-b-[1px] border-b-slate-300'></DialogHeader>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  <Avatar className='me-3 object-cover'>
                    <AvatarImage src={photo.src} className='object-cover' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <p className='text-sm font-semibold'>Reyhan Putra</p>
                    <p className='text-sm text-slate-500'>2 jam lalu</p>
                  </div>
                </div>
                <span className='bg-pink-100 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 h-6  rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-pink-500 '>
                  <IconGhost2Filled className='w-3 h-3 me-2' />
                  Kehilangan
                </span>
              </div>
              <p>
                Halo semua! Saya kehilangan dompet warna hitam merek Fossil di
                area parkir Mall XYZ pada Minggu, 15 Desember sekitar pukul
                14.00. Di dalamnya ada KTP atas nama [Nama Kamu], kartu debit,
                dan uang tunai secukupnya. 🙏
              </p>
              <div className='bg-slate-100 rounded-lg'>
                <Image
                  src={dompet}
                  alt='dompet'
                  className='rounded-lg object-contain max-h-[300px]'
                />
              </div>
              <Button className='w-full'>
                <IconPhone /> Hubungi
              </Button>
              <div className='flex gap-4'>
                <span className='flex text-pink-700 gap-1 text-sm items-center'>
                  <IconHeartFilled className='h-6' /> 213
                </span>
                <span className='flex text-slate-400 gap-1 text-sm items-center'>
                  <IconMessage2Filled className='h-6' /> 17
                </span>
              </div>
            </div>

            <div className='flex flex-col gap-4 px-4 py-6 rounded-lg bg-slate-100 shadow-[inset_0px_0px_53px_-19px_rgba(0,_0,_0,_0.1)] max-h-[300px] overflow-y-scroll'>
              <div className='flex items-start gap-2'>
                <Avatar className='object-cover'>
                  <AvatarImage src={photo.src} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                    <span className='text-sm font-semibold'>Juan Ror</span>
                    <p className='text-sm text-slate-700'>
                      Wah saya melihatnya kemarin di gedung E
                    </p>
                  </div>
                  <span className='text-xs text-slate-700'>3 jam lalu</span>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <Avatar className='object-cover'>
                  <AvatarImage src={photo.src} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                    <span className='text-sm font-semibold'>Juan Ror</span>
                    <p className='text-sm text-slate-700'>
                      Wah saya melihatnya kemarin di gedung E
                    </p>
                  </div>
                  <span className='text-xs text-slate-700'>3 jam lalu</span>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <Avatar className='object-cover'>
                  <AvatarImage src={photo.src} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                    <span className='text-sm font-semibold'>Juan Ror</span>
                    <p className='text-sm text-slate-700'>
                      Wah saya melihatnya kemarin di gedung E
                    </p>
                  </div>
                  <span className='text-xs text-slate-700'>3 jam lalu</span>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <Avatar className='object-cover'>
                  <AvatarImage src={photo.src} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                    <span className='text-sm font-semibold'>Juan Ror</span>
                    <p className='text-sm text-slate-700'>
                      Wah saya melihatnya kemarin di gedung E
                    </p>
                  </div>
                  <span className='text-xs text-slate-700'>3 jam lalu</span>
                </div>
              </div>
            </div>
            <div className='flex items-center px-4 gap-2'>
              <Avatar className='object-cover'>
                <AvatarImage src={photo.src} className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Input
                type='text'
                placeholder='Tulis Komentar ...'
                autoComplete='off'
              />
              <Button type='submit' className='w-9 h-9'>
                <Send />
                <span className='sr-only'>Send</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
