/** @format */
"use client";
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
import { getInitials } from "@/lib/initials";
import { timeAgo } from "@/lib/time";
import { useState } from "react";
import { DialogLaporan } from "../../laporan/component/DialogLaporan";

export default function CardLaporan({ laporan }) {
  const [open, setIsOpen] = useState(false);
  return (
    <Card className='bg-red-100 border border-red-200 max-w-[350px]'>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Avatar className='me-3 object-cover'>
              <AvatarImage
                src={laporan.user.profile.avatarUrl}
                className='object-cover'
              />
              <AvatarFallback>
                {getInitials(laporan.user.fullname)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold'>{laporan.user.fullname}</p>
              <p className='text-sm text-slate-500'>
                {timeAgo(laporan.createdAt)}
              </p>
            </div>
          </div>
          <span className='bg-pink-100 text-pink-800 text-xs font-medium inline-flex items-center px-2.5 h-6  rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-pink-500 '>
            <IconGhost2Filled className='w-3 h-3 ' />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='text-xl font-bold text-teal-800 leading-tight'>
          {laporan.judul}
        </h3>
        <p className='text-base font-semibold italic bg-amber-300 w-fit'>
          Nama Barang: {laporan.namaBarang}
        </p>
        <p className='text-sm'>{laporan.deskripsi}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setIsOpen(true)}
          className='w-full bg-red-700 hover:bg-red-900'>
          <IconEye /> Lihat Detail
        </Button>
      </CardFooter>
      <DialogLaporan laporan={laporan} open={open} setIsOpen={setIsOpen} />
    </Card>
  );
}
