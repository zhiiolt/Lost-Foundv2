/** @format */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  useChatContext,
  Window,
} from "stream-chat-react";

export default function ChatChannel({ open, openSidebar }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { client, setActiveChannel } = useChatContext();
  const { data: session } = useSession();

  useEffect(() => {
    const createChannel = async () => {
      if (!userId || !session?.user?.id) return;

      try {
        // Buat atau dapatkan channel
        const channel = client.channel("messaging", {
          members: [session.user.id, userId],
        }); // Aktifkan channel
        await channel.create();
        setActiveChannel(channel); // Set channel aktif
      } catch (error) {
        console.error("Error creating channel:", error);
      }
    };

    createChannel();
  }, [userId, client, session?.user?.id, setActiveChannel]);

  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <Channel>
        <Window>
          <CustomChannelHeader openSidebar={openSidebar} />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
}

function CustomChannelHeader({ openSidebar, ...props }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='h-full p-2 md:hidden'>
        <Button size='icon' variant='ghost' onClick={openSidebar}>
          <MenuIcon className='size-5' />
        </Button>
      </div>
      <ChannelHeader {...props} />
    </div>
  );
}
