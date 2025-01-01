/** @format */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import {
  ChannelList,
  ChannelPreviewMessenger,
  useChatContext,
} from "stream-chat-react";

export default function ChatSidebar({ open, onClose }) {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const { channel } = useChatContext();
  useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
    }
  }, [channel?.id, queryClient]);
  const ChannelPreviewCustom = useCallback(
    (props) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );

  return (
    <div
      className={cn(
        "size-full md:flex flex-col border-e md:w-72",
        open ? "flex" : "hidden"
      )}>
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [session?.user?.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}

function MenuHeader({ onClose }) {
  return (
    <div className='flex items-center gap-3 p-2'>
      <div className='h-full p-2 md:hidden'>
        <Button size='icon' variant='ghost' onClick={onClose}>
          <X className='size-5' />
        </Button>
      </div>
      <h1 className='me-auto text-sm font-bold md:ms-2'>Messages</h1>
    </div>
  );
}
