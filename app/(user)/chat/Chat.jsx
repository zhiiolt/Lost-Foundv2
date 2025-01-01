/** @format */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { Chat as StreamChat } from "stream-chat-react";
import ChatSidebar from "./ChatSidebar";
import ChatChannel from "./ChatChannel";

export const Chat = ({ contacts }) => {
  const chatClient = useInitializeChatClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='mx-auto my-3 animate-spin' />
      </div>
    );
  }

  return (
    <div className='relative w-full h-full overflow-hidden rounded-2xl bg-card shadow-sm border py-4'>
      <div className='absolute bottom-0 top-0 flex w-full'>
        <StreamChat client={chatClient}>
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </div>
  );
};
