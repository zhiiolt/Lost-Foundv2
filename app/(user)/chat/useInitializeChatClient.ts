/** @format */

import { error } from "console";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export default function useInitializeChatClient() {
  const { data: session } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  useEffect(() => {
    const initializeClient = async () => {
      try {
        const client = StreamChat.getInstance(
          process.env.NEXT_PUBLIC_STREAM_KEY!
        );

        // Ambil token dari API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-token`
        );
        const data = await response.json();
        const token = data.token;

        // Hubungkan pengguna
        await client.connectUser(
          {
            id: session?.user.id as string,
            username: session?.user.username,
            name: session?.user.fullname,
            image: session?.user.avatarUrl,
          },
          token
        );

        setChatClient(client);
      } catch (error) {
        console.error("Failed to initialize chat client", error);
      }
    };

    initializeClient();

    // Cleanup function
    return () => {
      if (chatClient) {
        chatClient
          .disconnectUser()
          .catch((error) => console.error("Failed to disconnect user", error))
          .then(() => console.log("User disconnected"));
      }
      setChatClient(null);
    };
  }, [
    session?.user.id,
    session?.user.username,
    session?.user.fullname,
    session?.user.avatarUrl,
  ]);

  return chatClient;
}
