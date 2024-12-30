/** @format */
"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Activity from "@/components/ui/grouped-timeline";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconBellFilled, IconCircleFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

export default function NotificationButton({ initialState }: any) {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: async () => {
      const response = (
        await fetch("http://localhost:3000/api/notifications/unread-count")
      ).json();
      return response;
    },
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });
  return (
    <div className='relative'>
      <IconBellFilled
        size={40}
        className=' text-slate-500 hover:text-slate-700 hover:bg-slate-200 p-2 rounded-full'
      />
      {!!data.unreadCount && (
        <span className='absolute right-[4px] top-1 rounded-full bg-red-700 text-primary-foreground px-1 text-xs font-medium tabular-nums'>
          {data.unreadCount}
        </span>
      )}
    </div>
  );
}
