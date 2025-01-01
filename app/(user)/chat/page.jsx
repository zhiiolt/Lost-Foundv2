/** @format */

import Header from "@/app/(user)/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Kontak } from "./components/Kontak";
import photo from "@/assets/avatar/olly.jpg";
import { Chat } from "./Chat";

export const metadata = {
  title: "Lost & Found: Chat",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function ChatPage() {
  const breadcrumbs = [
    { title: "Chat" },
    // halaman terakhir tanpa link
  ];
  return (
    <div className='h-screen flex flex-col'>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-8 flex-1'>
        <Chat />
      </div>
    </div>
  );
}
