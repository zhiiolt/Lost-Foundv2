/** @format */
"use client";
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

export default function UserLayout({
  children,
  breadcrumbs, // will be a page or nested layout
}: {
  children: React.ReactNode;
  breadcrumbs: { title: string; url?: string }[];
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='bg-white'>{children}</SidebarInset>
    </SidebarProvider>
  );
}
