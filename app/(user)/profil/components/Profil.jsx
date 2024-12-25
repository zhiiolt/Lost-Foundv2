/** @format */
"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProfilSchema } from "../../../../schema/formSchema";
import Link from "next/link";
import Google from "@/assets/google.svg";
import {
  IconBrandGoogle,
  IconFile,
  IconInfoOctagonFilled,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconEdit } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getInitials } from "@/lib/initials";

export function Profil() {
  const { data: session, status } = useSession();

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(session.user.avatarUrl);
  const [disable, setDisable] = useState(true);

  const form = useForm({
    resolver: zodResolver(ProfilSchema),
    defaultValues: {
      username: session.user.username || "",
      email: session.user.email || "",
      password: session.user.password || "",
      fullName: session.user.fullname || "",
      gender: session.user.gender || "",
      birthdate: session.user.birthdate || "",
      address: session.user.address || "",
      phoneNumber: session.user.telp || "",
      profilePicture: session.user.avatarUrl || "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    toast("", {
      position: "top-right",
      description: (
        <div className='flex gap-2 items-center'>
          <IconInfoOctagonFilled className='text-teal-500' />
          <p className='text-slate-950'>Perubahan profil berhasil disimpan.</p>
        </div>
      ),
    });
  };

  return (
    <div className='py-4 text-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center '>
                <Avatar className='me-3 object-cover h-20 w-20'>
                  <AvatarImage src={image} className='object-cover' />
                  <AvatarFallback>
                    {getInitials(session.user.fullname)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='text-lg font-bold'>
                    {session.user.fullname}
                  </span>
                  <span className='text-sm text-slate-500'>
                    @{session.user.username}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  disabled={disable}
                  variant='outline'
                  onClick={() => {
                    setImage(null);
                    form.setValue("profilePicture", "");
                  }}>
                  Hapus Foto
                </Button>
                <div className='-mt-2'>
                  <FormField
                    control={form.control}
                    name='profilePicture'
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <div className='w-full mt-0'>
                            <Button
                              type='button'
                              onClick={() => {
                                fileInputRef.current.click();
                              }}
                              className='w-full mt-0'
                              disabled={disable}>
                              Edit Foto
                            </Button>
                            <Input
                              {...fieldProps}
                              placeholder='Foto'
                              type='file'
                              accept='image/*'
                              onChange={(event) => {
                                const file =
                                  event.target.files && event.target.files[0];

                                onChange(file);

                                if (file) {
                                  setImage(URL.createObjectURL(file));
                                }
                              }}
                              className='hidden'
                              ref={fileInputRef}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <div className='pb-6'>
                <h1 className='text-xl font-bold'>Profil</h1>
                <p className='text-sm text-slate-500'>
                  Orang lain akan melihatmu sesuai dengan data yang Anda isikan
                  di bawah.
                </p>
              </div>
              <div className='grid grid-cols-5 gap-y-4 gap-x-16'>
                <div className='col-span-3 flex flex-col gap-6'>
                  <div>
                    <FormField
                      control={form.control}
                      name='fullName'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Nama Panjang
                          </FormLabel>
                          <FormDescription>
                            Tulis nama lengkap kamu biar kami bisa mengenalmu
                            lebih baik!
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='text'
                              placeholder='John Doe'
                              {...field}
                              className={
                                form.formState.errors.fullName
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Email
                          </FormLabel>
                          <FormDescription>
                            Pastikan email yang Anda masukkan aktif dan dapat
                            diakses, karena akan digunakan untuk login,
                            verifikasi, dan pemulihan akun.
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='email'
                              placeholder='example@email.com'
                              {...field}
                              className={
                                form.formState.errors.email
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Telepon</FormLabel>
                          <FormDescription>
                            Nomor telepon ini akan digunakan untuk verifikasi
                            dan pemulihan akun jika diperlukan.
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='text'
                              placeholder='0856XXXXXXXX'
                              {...field}
                              className={
                                form.formState.errors.phoneNumber
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Alamat</FormLabel>
                          <FormDescription>
                            Alamat ini tidak wajib diisi, hanya jika Anda ingin
                            menambahkan lokasi alternatif
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='text'
                              placeholder='JL. Contoh no.12'
                              {...field}
                              className={
                                form.formState.errors.address
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className='col-span-2 flex flex-col gap-6'>
                  <div>
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Username
                          </FormLabel>
                          <FormDescription>
                            Username digunakan sebagai identitas unik Anda di
                            platform ini dan akan terlihat oleh pengguna lain{" "}
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='text'
                              placeholder='Masukkan username'
                              {...field}
                              className={
                                form.formState.errors.username
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Password
                          </FormLabel>
                          <FormDescription>
                            Kata sandi ini akan digunakan untuk melindungi akun
                            Anda. Harap simpan dengan aman.
                          </FormDescription>
                          <FormControl>
                            <Input
                              disabled={disable}
                              type='password'
                              placeholder='Masukkan password'
                              {...field}
                              className={
                                form.formState.errors.password
                                  ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm"
                                  : "text-sm"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            disabled={disable}
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Pilih Gender' />
                              </SelectTrigger>
                            </FormControl>
                            <FormDescription>
                              Pilih jenis kelamin Anda. Pilihan ini bersifat
                              opsional.
                            </FormDescription>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>

                                <SelectItem value='pria'>
                                  <div className='flex items-center'>Pria</div>
                                </SelectItem>
                                <SelectItem value='wanita'>
                                  <div className='flex items-center'>
                                    Wanita
                                  </div>
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name='birthdate'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Tanggal Lahir</FormLabel>
                          <FormDescription>
                            Masukkan tanggal lahir Anda. Kolom ini opsional dan
                            bisa dibiarkan kosong.
                          </FormDescription>
                          <Popover modal={true}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={disable}
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pilih Tanggal</span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-auto p-0 z-[9999]'
                              align='start'>
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-4 flex items-center justify-end w-full space-x-4'>
            <Button
              type='button'
              onClick={() => {
                setDisable(!disable);
              }}
              variant='outline'>
              <IconEdit />
            </Button>
            <Button
              type='submit'
              className='w-[120px] disabled:cursor-not-allowed'
              disabled={form.formState.isSubmitting || disable}>
              {form.formState.isSubmitting && (
                <Loader2 className='animate-spin' />
              )}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
