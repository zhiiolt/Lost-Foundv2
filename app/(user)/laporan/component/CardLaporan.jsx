/** @format */
"use client";
import Image from "next/image";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import photo from "@/assets/avatar/olly.jpg";
import { kategori, statuses, jenis } from "@/schema/enum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconHash,
  IconHeartFilled,
  IconMessage2Filled,
} from "@tabler/icons-react";
import { IconMessageCircle2Filled } from "@tabler/icons-react";
import { DialogLaporan } from "./DialogLaporan";
import { IconSearch } from "@tabler/icons-react";
import { timeAgo } from "../../../../lib/time";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InfiniteScrollContainer from "../../../../components/ui/InfiniteScrollContainer";
import { getInitials } from "@/lib/initials";
import { useQueryClient } from "@tanstack/react-query";
import LikeButton from "./LikeButton";

export function CardLaporan({
  laporan,
  filters,
  fetchNext,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isLike = (item) => {
    const like = item.find((like) => like.userId === session?.user?.id);

    if (like) {
      return { status: true, data: like };
    } else {
      return { status: false };
    }
  };
  const handleContactReporter = (reporterId) => {
    router.push(`/chat?userId=${reporterId}`);
  };

  laporan.map((item) => console.log(isLike(item.likes)));

  const findstatus = (item) => {
    return statuses.find((s) => s.value === item.status);
  };
  const formattedDate = (item) => {
    return formatDate(item.tanggal);
  };

  const [open, setIsOpen] = React.useState(false);
  const [selectedLaporan, setSelectedLaporan] = React.useState(null);
  const [filterText, setFilterText] = React.useState("");
  const isFilterActive =
    filters.statuses.length > 0 ||
    filters.kategori.length > 0 ||
    filters.waktu !== "semua";

  const handleOpenDialog = (laporan) => {
    setSelectedLaporan(laporan);
    setIsOpen(true);
  };

  return (
    <div className='col-span-2'>
      <div className='grid grid-cols-1 gap-4'>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <IconSearch size={20} className='text-slate-400' />
          </div>
          <Input
            type='text'
            placeholder='Cari Laporan ...'
            className='ps-10'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        {isFetching && !isFetchingNextPage && (
          <Loader2 className='mx-auto my-3 animate-spin' />
        )}
        <InfiniteScrollContainer
          className='space-y-4'
          onBottomReached={() => {
            hasNextPage && !isFetching && fetchNext();
          }}>
          {laporan
            .filter(
              (item) =>
                item.judul.toLowerCase().includes(filterText.toLowerCase()) ||
                item.namaBarang.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((item, index) => (
              <div key={index}>
                <Card className={`py-4 `}>
                  <CardContent>
                    <div className='flex flex-col gap-4 pt-2'>
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          <Avatar className='me-3 object-cover'>
                            <AvatarImage
                              src={item.user.profile.avatarUrl}
                              className='object-cover'
                            />
                            <AvatarFallback>
                              {getInitials(item.user.fullname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex flex-col'>
                            <p className='text-sm font-semibold'>
                              {item.user.fullname}
                            </p>
                            <p className='text-sm text-slate-500'>
                              {timeAgo(item.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span
                          className={` ${
                            item.jenis === "kehilangan"
                              ? "text-pink-800 bg-pink-100 border-pink-500"
                              : "text-blue-800 bg-blue-200 border-blue-500"
                          } text-xs capitalize font-medium flex items-center px-2.5 h-8  rounded me-2 dark:bg-gray-700 dark:text-gray-400 border `}>
                          <span>{item.jenis}</span>
                        </span>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-bold text-teal-800 leading-tight'>
                          {item.judul}
                        </h3>
                        <p className='text-base font-semibold italic bg-amber-300 w-fit'>
                          Nama Barang: {item.namaBarang}
                        </p>
                      </div>
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant='outline'
                            className='capitalize px-4 py-1 rounded-full bg-teal-50 border-teal-700 text-slate-700'>
                            <IconHash className='me-1' size={12} />{" "}
                            {item.kategori}
                          </Badge>
                          <Badge
                            variant='outline'
                            className='capitalize px-4 py-1 rounded-full bg-teal-50 border-teal-700 text-slate-700'>
                            <MapPinned className='me-1' size={12} />{" "}
                            {item.lokasi}
                          </Badge>
                        </div>
                        <div>
                          <Badge
                            variant='outline'
                            className={`capitalize px-4 py-1 rounded-full  ${
                              item.status === "hilang"
                                ? "bg-pink-300 border-pink-800 text-pink-700"
                                : "bg-sky-100 border-sky-700 text-sky-700"
                            } `}>
                            {(() => {
                              const status = findstatus(item);
                              return status?.icon ? (
                                <status.icon className='me-1' size={12} />
                              ) : null;
                            })()}
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                      <p className='text-sm'>{item.deskripsi}</p>
                      <p className='text-xs italic text-slate-500'>
                        Tanggal Kejadian: {formattedDate(item)}
                      </p>
                      <div className='bg-slate-100 rounded-lg flex justify-center'>
                        <Image
                          src={item.fotoUrl}
                          alt='foto'
                          className='rounded-lg object-contain max-h-[300px]'
                          width={300}
                          height={300}
                        />
                      </div>
                      <p className='text-xs italic text-slate-500 before:content-["*"]'>
                        Ciri-Ciri: {item.ciri}
                      </p>
                      <div className='flex gap-2'>
                        <LikeButton
                          laporanId={item.id}
                          initialState={{
                            likes: item.likes.length,
                            isLiked: item.likes.some(
                              (like) => like.userId === session.user.id
                            ),
                          }}
                        />
                        <span className='flex text-slate-400 gap-1 text-sm items-center'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant='ghost'
                                  className='px-2'
                                  onClick={() => {
                                    handleOpenDialog(item);
                                  }}>
                                  <IconMessage2Filled className='h-6' />{" "}
                                  {item.comments.length}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Lihat Komentar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </div>
                      {session?.user?.email !== item.user.email && (
                        <Button
                          onClick={() => handleContactReporter(item.user.id)}
                          className={`w-full disabled:cursor-not-allowed disabled:hover:cursor-not-allowed`}
                          disabled={item.status !== "hilang"}>
                          <IconMessageCircle2Filled /> Hubungi Pelapor
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </InfiniteScrollContainer>
        {isFetchingNextPage && (
          <Loader2 className='mx-auto my-3 animate-spin' />
        )}
        {laporan.filter(
          (item) =>
            item.judul.toLowerCase().includes(filterText.toLowerCase()) ||
            item.namaBarang.toLowerCase().includes(filterText.toLowerCase())
        ).length === 0 &&
          !isFilterActive &&
          !isFetching && (
            <div className='text-center text-slate-500 relative min-h-96'>
              <p className='text-sm font-medium absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                Laporan tidak ditemukan
              </p>
            </div>
          )}
        {isFilterActive &&
          !isFetching &&
          !isFetchingNextPage &&
          laporan.filter(
            (item) =>
              item.judul.toLowerCase().includes(filterText.toLowerCase()) ||
              item.namaBarang.toLowerCase().includes(filterText.toLowerCase())
          ).length === 0 && (
            <div className='text-center text-slate-500 relative min-h-96'>
              <p className='text-sm font-medium absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                Laporan tidak ditemukan
              </p>
            </div>
          )}

        {selectedLaporan && (
          <DialogLaporan
            laporan={selectedLaporan}
            open={open}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy", { locale: id });
}
