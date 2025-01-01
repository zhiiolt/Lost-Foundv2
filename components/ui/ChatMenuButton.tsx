/** @format */
"use clinet";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SidebarMenuButton } from "./sidebar";

export default function ChatButton({ initialState, item, path }: any) {
  console.log(item);
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {
      const response = (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/messages/unread-count`
        )
      ).json();
      return response;
    },
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <SidebarMenuButton
      asChild
      className={path == item.url ? "bg-teal-950" : ""}>
      <Link
        href={item.url}
        className='flex items-center text-sm gap-2 px-2 relative'>
        {item.icon && <item.icon className='w-4' />}
        <span>{item.title}</span>
        {!!data.unreadCount && (
          <span className='absolute right-4 rounded-full bg-red-700 text-primary-foreground px-1 text-xs font-medium tabular-nums'>
            {data.unreadCount}
          </span>
        )}
      </Link>
    </SidebarMenuButton>
  );
}
