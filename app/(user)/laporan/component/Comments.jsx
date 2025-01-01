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
import { useInfiniteQuery } from "@tanstack/react-query";

export function Comments({ laporan }) {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["komen"],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment${
          pageParam
            ? `?cursor=${pageParam}&id=${laporan.id}`
            : `?id=${laporan.id}`
        }`
      );
      if (res.ok) {
        const data = await res.json();
        return data.data;
      } else {
        return [];
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  if (status == "success") {
    console.log(data);
  }

  console.log(laporan);

  return (
    <div className='flex flex-col gap-4 px-4 py-6 rounded-lg  max-h-[300px] overflow-y-scroll'>
      {laporan.comments.length > 0 ? (
        laporan.comments.map((comment) => (
          <div className='flex items-start gap-2' key={comment.id}>
            <Avatar className='object-cover'>
              <AvatarImage
                src={comment.user.profile.avatarUrl}
                className='object-cover'
              />
              <AvatarFallback>
                {getInitials(comment.user.fullname)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='flex flex-col bg-slate-200 rounded-lg px-4 py-2'>
                <span className='text-sm font-semibold'>
                  {comment.user.fullname}
                </span>
                <p className='text-sm text-slate-700'>{comment.isi}</p>
              </div>
              <span className='text-xs text-slate-400'>
                {timeAgo(comment.createdAt)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center text-slate-500 relative py-8'>
          <p className='text-sm font-medium absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
            Belum ada komentar
          </p>
        </div>
      )}
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy", { locale: id });
}
