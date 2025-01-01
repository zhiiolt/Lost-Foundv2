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
import { format } from "date-fns";
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
import { LaporanSchema } from "../../../schema/formSchema";
import { jenis, kategori, statuses } from "../../../schema/enum";
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
import { useRouter } from "next/navigation";

export default function EditLaporan({ laporan, setIsOpen }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(laporan.fotoUrl);
  const [filename, setFilename] = useState("Hapus Foto");
  const router = useRouter();
  const defaults = {
    judul: laporan.judul,
    deskripsi: laporan.deskripsi,
    lokasi: laporan.lokasi,
    kategori: laporan.kategori,
    namaBarang: laporan.namaBarang,
    tanggal: laporan.tanggal ? new Date(laporan.tanggal) : undefined,
    ciri: laporan.ciri,
    foto: laporan.fotoUrl,
    status: laporan.status,
    jenis: laporan.jenis,
  };

  const form = useForm({
    resolver: zodResolver(LaporanSchema),
    defaultValues: defaults,
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Tambahkan semua field ke dalam FormData
    formData.set("id", laporan.id);
    formData.set("jenis", data.jenis);
    formData.set("status", data.status);
    formData.set("judul", data.judul);
    formData.set("deskripsi", data.deskripsi);
    formData.set("namaBarang", data.namaBarang);
    formData.set("kategori", data.kategori);
    formData.set("tanggal", data.tanggal ? data.tanggal.toLocaleString() : "");
    formData.set("ciri", data.ciri);
    formData.set("lokasi", data.lokasi);

    // Tambahkan file jika ada
    if (data.foto) {
      formData.set("foto", data.foto);
    }

    // Kirimkan menggunakan fetch
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/laporan`,
        {
          method: "PUT",
          body: formData, // Kirim FormData
        }
      );

      if (res.ok) {
        router.refresh();
        setIsOpen(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast("", {
          position: "top-right",
          description: (
            <div className='flex gap-2 items-center'>
              <IconInfoOctagonFilled className='text-teal-500' />
              <p className='text-slate-950'>
                Perubahan pada <span className='font-bold'>{laporan.id}</span>{" "}
                berhasil disimpan.
              </p>
            </div>
          ),
        });
      } else {
        const error = await res.json();
        toast.error(error.message || "Gagal mengedit laporan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <div className='py-4 text-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex gap-4'>
            <div>
              <FormField
                control={form.control}
                name='foto'
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div className='flex justify-center items-center'>
                        <div className='bg-slate-200 rounded-lg w-60 p-2 flex flex-col justify-center items-center'>
                          <div className='w-full h-52 rounded-lg border-dashed border-2 border-teal-700 text-teal-700 flex justify-center items-center overflow-hidden'>
                            {image ? (
                              <Image
                                className='w-full object-contain'
                                src={image}
                                width={200}
                                height={200}
                                alt={laporan.fotoUrl}
                              />
                            ) : (
                              <div className='w-full h-full flex flex-col justify-center items-center space-y-2'>
                                <IconUpload size={60} />
                                <span>Brose image to upload!</span>
                              </div>
                            )}
                          </div>
                          <div className='w-full mt-2'>
                            <div
                              className='w-full flex justify-center items-center gap-2 bg-teal-700 p-2 rounded-lg hover:cursor-pointer hover:bg-teal-900'
                              onClick={() => {
                                !image && fileInputRef.current.click();
                              }}>
                              <div className='text-white font-bold text-xs line-clamp-1'>
                                {filename || "Upload"}
                              </div>
                              {image && (
                                <IconX
                                  size={20}
                                  className='hover:bg-white hover:text-red-600 rounded-full'
                                  onClick={() => {
                                    fileInputRef.current.value = "";
                                    setImage("");
                                    setFilename("");
                                    onChange(null);
                                  }}
                                />
                              )}
                            </div>
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
                                  setFilename(file.name);
                                  setImage(URL.createObjectURL(file));
                                }
                              }}
                              className='hidden'
                              ref={fileInputRef}
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col h-52 flex-1 space-y-4'>
              <div className=''>
                <FormField
                  control={form.control}
                  name='judul'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Tuliskan Judul Laporan ...'
                          {...field}
                          className={
                            form.formState.errors.judul
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
              <div className=''>
                <FormField
                  control={form.control}
                  name='deskripsi'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Tulis deskripsi kejadian atau barang ...'
                          className={`min-h-[155px] resize-none text-sm ${
                            form.formState.errors.deskripsi
                              ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2"
                              : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <FormField
                control={form.control}
                name='namaBarang'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Nama Barang</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Tuliskan Nama Barang'
                        {...field}
                        className={
                          form.formState.errors.namaBarang
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
                name='kategori'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih kategori barang' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Kategori</SelectLabel>
                          {kategori.map((item) => (
                            <SelectItem value={item.value} key={item.value}>
                              <div className='flex items-center'>
                                {item.icon && (
                                  <item.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                                )}
                                <span>{item.label}</span>
                              </div>
                            </SelectItem>
                          ))}
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
                name='tanggal'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Tanggal</FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
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
                            date > new Date() || date < new Date("1900-01-01")
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

            <div>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih Status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statuses.map((item) => (
                            <SelectItem value={item.value} key={item.value}>
                              <div className='flex items-center'>
                                {item.icon && (
                                  <item.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                                )}
                                <span>{item.label}</span>
                              </div>
                            </SelectItem>
                          ))}
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
                name='lokasi'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Tulis Lokasi Kejadian'
                        {...field}
                        className={
                          form.formState.errors.lokasi
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
                name='ciri'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Ciri Barang</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Tulis Ciri atau Tanda Khusus Barang'
                        {...field}
                        className={
                          form.formState.errors.ciri
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

          <div className='space-y-4 flex justify-end w-full space-x-4'>
            <Button
              onClick={() => {
                setImage(laporan.foto);
                setFilename(laporan.foto);
                form.reset(defaults);
                form.setValue("kategori", defaults.kategori);
              }}
              type='reset'
              className='mt-4 disabled:cursor-not-allowed bg-slate-500 text-white hover:bg-slate-600'>
              Reset
            </Button>
            <Button
              type='submit'
              className='mt-4 disabled:cursor-not-allowed'
              disabled={form.formState.isSubmitting}>
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
