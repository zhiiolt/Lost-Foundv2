/** @format */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

export const Kontak = ({ contacts }) => {
  const [filterText, setFilterText] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState("");
  return (
    <div className='flex h-full'>
      <div className='w-96 flex flex-col border-r-[1px] border-r-slate-200 h-full'>
        <div className='py-6 pr-6'>
          <div className='relative w-full'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <IconSearch size={20} className='text-slate-400' />
            </div>
            <Input
              type='text'
              placeholder='Cari Kontak'
              className='ps-10 bg-slate-100'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <ScrollArea className='h-[calc(100vh-200px)] mt-4'>
            <div className='flex flex-col space-y-2 mt-4'>
              {contacts
                .filter((contact) => {
                  if (!filterText) return true;
                  return contact.name
                    .toLowerCase()
                    .includes(filterText.toLowerCase());
                })
                .map((contact, index) => (
                  <div
                    className={`${
                      contact.name === selectedContact?.name
                        ? "bg-slate-200"
                        : ""
                    } flex justify-between items-start px-4 border-1 border border-slate-200 py-4 rounded-lg hover:bg-slate-200 hover:cursor-pointer`}
                    onClick={() => setSelectedContact(contact)}
                    key={index}>
                    <div className='flex items-center space-x-4'>
                      <div>
                        <Avatar className='object-cover'>
                          <AvatarImage
                            src={contact.photo}
                            className='object-cover'
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-bold'>
                          {contact.name}
                        </span>
                        <span className='text-xs text-slate-500 line-clamp-1'>
                          {contact.lastMessage}
                        </span>
                      </div>
                    </div>
                    <div className='min-w-12 text-right'>
                      <span className='text-xs text-slate-500 text-right'>
                        {contact.time}
                      </span>
                    </div>
                  </div>
                ))}
              {contacts.filter((contact) =>
                contact.name.toLowerCase().includes(filterText.toLowerCase())
              ).length === 0 && (
                <div className='text-center text-slate-500 relative min-h-96'>
                  <p className='text-sm font-medium absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    Kontak tidak ditemukan
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className='flex-1 flex flex-col relative'>
        <div className='h-20 w-full border-b-[1px] px-4 bg-teal-700 rounded-se-lg'>
          {selectedContact && (
            <div className='flex items-center gap-2 my-auto h-full'>
              <div>
                <Avatar className='object-cover w-14 h-14'>
                  <AvatarImage
                    src={selectedContact?.photo}
                    className='object-cover'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex flex-col'>
                <span className='text-lg font-bold leading-tight text-white'>
                  {selectedContact?.name}
                </span>
                <span className='text-sm text-teal-100'>
                  @{selectedContact?.username}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className='flex-1 w-full'>
          {selectedContact && (
            <ScrollArea className='h-[430px] p-4'>
              <div className='flex flex-col space-y-4'>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <div className='flex gap-2 flex-row-reverse'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='max-w-96 px-4 py-2 text-sm bg-teal-100 rounded-lg'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='flex gap-2'>
                    <Avatar className='object-cover'>
                      <AvatarImage
                        src={selectedContact.photo}
                        className='object-cover'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='px-4 py-2 text-sm bg-slate-200 rounded-lg'>
                      Halo, Apa kabar
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
          {selectedContact && (
            <div className='flex items-center absolute left-4 bottom-2 right-4 gap-2  py-4'>
              <Input
                type='text'
                placeholder='Kirim Pesan ...'
                autoComplete='off'
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
              />
              <Button type='button' className='w-9 h-9' disabled={!messages}>
                <Send />
                <span className='sr-only'>Send</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
