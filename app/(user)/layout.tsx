/** @format */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import streamServerClient from "@/lib/stream";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserLayout({
  children,
  breadcrumbs, // will be a page or nested layout
}: {
  children: React.ReactNode;
  breadcrumbs: { title: string; url?: string }[];
}) {
  const session = await getServerSession(authOptions);
  const unreadMessagesCount = (
    await streamServerClient.getUnreadCount(session?.user.id)
  ).total_unread_count;
  return (
    <SidebarProvider>
      <AppSidebar unreadCount={unreadMessagesCount} />
      <SidebarInset className='bg-white'>{children}</SidebarInset>
    </SidebarProvider>
  );
}
