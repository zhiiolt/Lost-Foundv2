/** @format */
"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import photo from "../../assets/avatar/olly.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { convertDateString2 } from "@/lib/time";
import { getInitials } from "@/lib/initials";
import {
  IconHeartFilled,
  IconMessage2,
  IconMessageFilled,
  IconZoomExclamation,
  IconZoomExclamationFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DialogLaporan } from "@/app/(user)/laporan/component/DialogLaporan";
import { useEffect, useState } from "react";

export default function Activity() {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notification"],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications${
          pageParam ? `?cursor=${pageParam}` : ""
        }`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      return res.json();
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/mark-as-read`,
        {
          method: "PATCH",
        }
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["unread-notification-count"], {
        unreadCount: 0,
      });
    },
    onError(error) {
      console.error(error);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);
  const [open, setOpen] = useState(false);
  const [laporan, setLaporan] = useState(null);

  const notifications =
    status === "success" ? data.pages.flatMap((page) => page.notification) : [];

  const groupedNotifications = notifications.reduce((acc, notification) => {
    // Ambil tanggal hari ini dan kemarin
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Ubah string tanggal
    const dateString = convertDateString2(
      notification.createdAt.toLocaleString()
    );
    const date = new Date(dateString);
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // Tentukan label
    let dateLabel;
    if (dateOnly.getTime() === today.getTime()) {
      dateLabel = "Hari ini";
    } else if (dateOnly.getTime() === yesterday.getTime()) {
      dateLabel = "Kemarin";
    } else {
      dateLabel = dateOnly.toLocaleDateString(); // Format tanggal biasa
    }

    // Tambahkan ke grup
    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }
    acc[dateLabel].push(notification);

    return acc;
  }, {});

  console.log(groupedNotifications);

  if (status === "pending") {
    return (
      <div className='flex items-center justify-center min-h-[100px] text-sm my-auto  text-center text-muted-foreground mx-auto'>
        <Loader2 className='mx-auto animate-spin' />;
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className='text-center text-red-500'>
        Terjadi kesalahan saat memuat notifikasi.
      </div>
    );
  }

  if (status === "success" && notifications.length === 0 && !hasNextPage) {
    return (
      <div className='flex items-center justify-center min-h-[100px] text-sm my-auto  text-center text-muted-foreground mx-auto'>
        Tidak ada notifikasi
      </div>
    );
  }

  return (
    <div className='min-h-[100px] max-h-[400px] overflow-y-scroll p-2 mt-2'>
      {Object.keys(groupedNotifications).map((date) => (
        <div
          key={date}
          className='p-5 mb-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700'>
          <time className='text-xs font-bold text-teal-900 dark:text-white'>
            {date}
          </time>
          <ol className='mt-2 divide-y divider-gray-200 dark:divide-gray-700'>
            {groupedNotifications[date].map((notification: any, idx: any) => (
              <li key={idx}>
                <a
                  onClick={() => {
                    setLaporan(notification.laporan);
                    setOpen(true);
                  }}
                  className='block px-3 py-4 sm:flex hover:bg-slate-100 rounded-xl hover:cursor-pointer dark:hover:bg-gray-700'>
                  <Avatar className='me-3 object-cover'>
                    <AvatarImage
                      src={notification.sender.profile.avatarUrl}
                      className='object-cover'
                    />
                    <AvatarFallback>
                      {getInitials(notification.sender.fullname)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <div className='text-xs font-normal'>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        {notification.sender.fullname}
                      </span>{" "}
                      {notification.notifType === "comment"
                        ? "mengomentari laporan anda:"
                        : notification.notifType == "like"
                        ? "menyukai laporan Anda"
                        : notification.message}{" "}
                    </div>
                    {notification.notifType === "comment" && (
                      <div className='text-xs font-normal'>
                        "{notification.message}"
                      </div>
                    )}
                    <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400 gap-2'>
                      {notification.notifType === "comment" && (
                        <IconMessageFilled size={12} />
                      )}
                      {notification.notifType === "like" && (
                        <IconHeartFilled size={12} />
                      )}
                      {notification.notifType === "match" && (
                        <IconZoomExclamationFilled size={12} />
                      )}
                      {notification.notifType}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='w-full py-2 mt-2 text-sm '>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
      {status === "success" && laporan && (
        <DialogLaporan laporan={laporan} open={open} setIsOpen={setOpen} />
      )}
    </div>
  );
}
