/** @format */

"use client";

import * as React from "react";

import { MapPinned, MoreHorizontal, Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import photo from "@/assets/avatar/olly.jpg";
import { kategori, statuses, jenis } from "@/schema/enum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/initials";

import {
  IconHash,
  IconHeartFilled,
  IconInfoOctagonFilled,
  IconMessage2Filled,
  IconSquareRoundedLetterFFilled,
  IconSquareRoundedLetterLFilled,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { timeAgo } from "../../../../lib/time";
import { useSession } from "next-auth/react";

export function DialogLaporan({ laporan, open, setIsOpen }) {
  const status = statuses.find((s) => s.value === laporan.status);
  const formattedDate = formatDate(laporan.tanggal);
  const { data: session } = useSession();

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTitle>{""}</DialogTitle>
        <DialogContent className='max-h-[600px] overflow-y-scroll min-w-[700px] py-0'>
          <DialogHeader className='border-b-[1px] border-b-slate-300 bg-white sticky top-0 z-[50] h-full py-4 text-right shadow-[0px_7px_21px_-8px_rgba(0,_0,_0,_0.1)]'>
            <div className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:cursor-pointer hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex justify-between'>
              <div>{""}</div>
              <X
                className='h-4 w-4'
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </DialogHeader>
          <div className='flex flex-col gap-4 pt-2'>
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
                  <p className='text-sm font-semibold'>
                    {laporan.user.fullname}
                  </p>
                  <p className='text-sm text-slate-500'>
                    {timeAgo(laporan.createdAt)}
                  </p>
                </div>
              </div>
              <span
                className={` ${
                  laporan.jenis === "kehilangan"
                    ? "text-pink-800 bg-pink-100 border-pink-500"
                    : "text-blue-800 bg-blue-200 border-blue-500"
                } text-xs capitalize font-medium flex items-center px-2.5 h-8  rounded me-2 dark:bg-gray-700 dark:text-gray-400 border `}>
                <span>{laporan.jenis}</span>
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-bold text-teal-800 leading-tight'>
                {laporan.judul}
              </h3>
              <p className='text-base font-semibold italic bg-amber-300 w-fit'>
                Nama Barang: {laporan.namaBarang}
              </p>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='outline'
                  className='capitalize px-4 py-1 rounded-full bg-teal-50 border-teal-700 text-slate-700'>
                  <IconHash className='me-1' size={12} /> {laporan.kategori}
                </Badge>
                <Badge
                  variant='outline'
                  className='capitalize px-4 py-1 rounded-full bg-teal-50 border-teal-700 text-slate-700'>
                  <MapPinned className='me-1' size={12} /> {laporan.lokasi}
                </Badge>
              </div>
              <div>
                <Badge
                  variant='outline'
                  className={`capitalize px-4 py-1 rounded-full  ${
                    laporan.status === "hilang"
                      ? "bg-pink-300 border-pink-800 text-pink-700"
                      : "bg-sky-100 border-sky-700 text-sky-700"
                  } `}>
                  {status && status.icon && (
                    <status.icon className='me-1' size={12} />
                  )}
                  {laporan.status}
                </Badge>
              </div>
            </div>
            <p className='text-sm'>{laporan.deskripsi}</p>
            <p className='text-xs italic text-slate-500'>
              Tanggal Kejadian: {formattedDate}
            </p>
            <div className='bg-slate-100 rounded-lg flex justify-center'>
              <Image
                src={laporan.fotoUrl}
                alt='foto'
                className='rounded-lg object-contain max-h-[300px]'
                width={300}
                height={300}
              />
            </div>
            <p className='text-xs italic text-slate-500 before:content-["*"]'>
              Ciri-Ciri: {laporan.ciri}
            </p>
            <div className='flex gap-4'>
              <span className='flex text-pink-700 gap-1 text-sm items-center'>
                <IconHeartFilled className='h-6' /> {laporan.likes.length}
              </span>
              <span className='flex text-slate-400 gap-1 text-sm items-center'>
                <IconMessage2Filled className='h-6' /> {laporan.comments.length}
              </span>
            </div>
          </div>

          <Separator />

          <div className='flex flex-col gap-4 px-4 py-6 rounded-lg  max-h-[300px] overflow-y-scroll'>
            <div className='flex items-start gap-2'>
              <Avatar className='object-cover'>
                <AvatarImage
                  src={session.user.image}
                  className='object-cover'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                  <span className='text-sm font-semibold'>Reyhan Putra</span>
                  <p className='text-sm text-slate-700'>
                    Wah saya melihatnya kemarin di gedung E
                  </p>
                </div>
                <span className='text-xs text-slate-400'>3 jam lalu</span>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Avatar className='object-cover'>
                <AvatarImage src={photo.src} className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                  <span className='text-sm font-semibold'>Reyhan Putra</span>
                  <p className='text-sm text-slate-700'>
                    Wah saya melihatnya kemarin di gedung E
                  </p>
                </div>
                <span className='text-xs text-slate-400'>3 jam lalu</span>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Avatar className='object-cover'>
                <AvatarImage src={photo.src} className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                  <span className='text-sm font-semibold'>Reyhan Putra</span>
                  <p className='text-sm text-slate-700'>
                    Wah saya melihatnya kemarin di gedung E
                  </p>
                </div>
                <span className='text-xs text-slate-400'>3 jam lalu</span>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Avatar className='object-cover'>
                <AvatarImage src={photo.src} className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                  <span className='text-sm font-semibold'>Reyhan Putra</span>
                  <p className='text-sm text-slate-700'>
                    Wah saya melihatnya kemarin di gedung E
                  </p>
                </div>
                <span className='text-xs text-slate-400'>3 jam lalu</span>
              </div>
            </div>
          </div>
          <DialogFooter className='flex items-center px-4 gap-2 sticky bottom-0 bg-white h-full py-4 shadow-[0px_-20px_21px_-8px_rgba(0,_0,_0,_0.1)]'>
            <Avatar className='object-cover'>
              <AvatarImage src={session.user.image} className='object-cover' />
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy", { locale: id });
}
