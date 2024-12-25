/** @format */

"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  Plus,
  Phone,
  HelpingHandIcon,
  Info,
  MessageSquareWarning,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: StaticImageData;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
                <Image src={activeTeam.logo} alt='logo' className='size-6' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight pl-2'>
                <span className='truncate font-semibold'>
                  {activeTeam.name}
                </span>
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Pusat Bantuan
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2 hover:cursor-pointer'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Phone className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Hubungi Kami
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='gap-2 p-2 hover:cursor-pointer'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Info className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Panduan Pengguna
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='gap-2 p-2 hover:cursor-pointer'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <MessageSquareWarning className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Feedback</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
