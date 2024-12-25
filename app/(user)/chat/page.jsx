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

export const metadata = {
  title: "Lost & Found: Chat",
  description: "A task and issue tracker build using Tanstack Table.",
};

const contacts = [
  {
    name: "Ilham Wahyudi",
    photo: photo.src,
    lastMessage: "Halo, apa kabar?",
    time: "1 jam",
    username: "ilhamwahyudi",
  },
  {
    name: "Reyhan Putra",
    photo: photo.src,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "1 jam",
    username: "reyhanputra",
  },
  {
    name: "Bellamy Blake",
    photo: photo.src,
    lastMessage: "You gon ple ste odon",
    time: "1 hari",
    username: "bellamyblake",
  },
  {
    name: "Raven Reyes",
    photo: photo.src,
    lastMessage: "Halo, apa kabar?",
    time: "1 jam",
    username: "ravenreyes",
  },
];

export default function ChatPage() {
  const breadcrumbs = [
    { title: "Chat" },
    // halaman terakhir tanpa link
  ];
  return (
    <div className='h-screen flex flex-col'>
      <Header breadcrumbs={breadcrumbs} />
      <div className='p-4 flex-1'>
        <Card className='w-full h-full border-slate-300'>
          <CardContent className='h-full py-0 border-teal-700 pr-0'>
            <Kontak contacts={contacts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
