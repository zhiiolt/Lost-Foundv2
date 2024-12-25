/** @format */

"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AudioWaveform,
  MapPinned,
  NotebookTextIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  MessageCircleMore,
  Home,
  UserRound,
  Hash,
} from "lucide-react";
import avatar from "../../assets/avatar/karolina.jpg";
import { NavMain } from "@/components/ui/nav-main";
import { NavProjects } from "@/components/ui/nav-project";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo_putih from "@/assets/logo_putih.svg";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: avatar.src,
  },
  teams: [
    {
      name: "Lost & Found",
      logo: logo_putih,
      plan: "by FindIt",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Laporan",
      url: "/laporan",
      icon: NotebookTextIcon,
      items: [
        {
          title: "Daftar Laporan",
          url: "/laporan",
        },
        {
          title: "Laporan Saya",
          url: "/laporan/riwayat",
        },
        {
          title: "Buat Laporan",
          url: "/laporan/create",
        },
      ],
    },
    {
      title: "Map",
      url: "/map",
      icon: MapPinned,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircleMore,
    },
    {
      title: "Profil",
      url: "/profil",
      icon: UserRound,
    },
  ],
  suggestions: [
    {
      name: "Elektronik",
      url: "/laporan/elektronik",
      icon: Hash,
    },
    {
      name: "Dokumen Penting",
      url: "/laporan/dokumen",
      icon: Hash,
    },
    {
      name: "Hewan Peliharaan",
      url: "/laporan/hewan",
      icon: Hash,
    },
    {
      name: "Kunci",
      url: "/laporan/kunci",
      icon: Hash,
    },
    {
      name: "Aksesoris",
      url: "/laporan/aksesoris",
      icon: Hash,
    },
    {
      name: "Kendaraan",
      url: "/laporan/kendaraan",
      icon: Hash,
    },
    {
      name: "Pencurian",
      url: "/laporan/pencurian",
      icon: Hash,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} path={path} />
        <NavProjects suggestions={data.suggestions} path={path} />
      </SidebarContent>
      <SidebarFooter className='py-4'>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
