/** @format */

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
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma/db";
import NotificationButton from "./NotificationButton";

export default async function Header({
  breadcrumbs,
}: {
  breadcrumbs: { title: string; url?: string }[];
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const unreadNotificationCount = await prisma.notification.count({
    where: {
      receiverId: session.user.id,
      isRead: false,
    },
  });

  return (
    <header className='flex h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* BreadcrumbItem */}
                  <BreadcrumbItem className='hidden md:block'>
                    {item.url ? (
                      <BreadcrumbLink href={item.url} className='capitalize'>
                        {item.title}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className='capitalize'>
                        {item.title}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {/* BreadcrumbSeparator */}
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className='hidden md:block' />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='px-8'>
          <Popover>
            <PopoverTrigger>
              <NotificationButton
                initialState={{ unreadCount: unreadNotificationCount }}
              />
            </PopoverTrigger>
            <PopoverContent className='w-[600px]'>
              <span className='text-sm font-bold'>Notifikasi</span>
              <Activity />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
