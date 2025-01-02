/** @format */
"use client";
import * as React from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  IconBrandGoogle,
  IconFile,
  IconInfoOctagonFilled,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { useEdgeStore } from "@/lib/edgestore";

export default function EditLaporan({ jenis }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const { edgestore } = useEdgeStore();
  const defaults = {
    jenis: jenis,
    status: statuses[0].value,
    foto: null,
    judul: "",
    deskripsi: "",
    namaBarang: "",
    kategori: "",
    tanggal: null,
    ciri: "",
    lokasi: "",
  };

  const form = useForm({
    resolver: zodResolver(LaporanSchema),
    defaultValues: defaults,
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Tambahkan semua field ke dalam FormData
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
      if (data.foto instanceof File) {
        const res = await edgestore.publicFiles.upload({
          file: data.foto,
        });
        formData.set("foto", res.url);
      } else {
        formData.set("foto", data.foto);
      }
    } else {
      formData.set("foto", null);
    }

    // Kirimkan menggunakan fetch
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/laporan`,
        {
          method: "POST",
          body: formData, // Kirim FormData
        }
      );

      if (res.ok) {
        setShowDialog(true);
      } else {
        const error = await res.json();
        toast.error(error.message || "Gagal mengirim laporan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <>
      <h1 className='text-lg font-bold capitalize pt-4 text-teal-800'>
        Buat Laporan {jenis}
      </h1>
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
                                <img
                                  className='w-full object-contain'
                                  src={image}></img>
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
                        <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Judul
                        </FormLabel>
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
                        <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Deskripsi
                        </FormLabel>
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
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Nama Barang
                      </FormLabel>
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
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Kategori
                      </FormLabel>
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
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Tanggal
                      </FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
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
                  name='ciri'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Ciri Barang
                      </FormLabel>
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

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='lokasi'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Lokasi
                      </FormLabel>
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
            </div>

            <div className='space-y-4 flex justify-end w-full space-x-4'>
              <Button
                type='submit'
                className='mt-4 disabled:cursor-not-allowed'
                onClick={() => console.log(form.formState.errors)}
                disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className='animate-spin' />
                )}
                Kirim Laporan
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <AlertDialog
        open={showDialog}
        onOpenChange={(isOpen) => setShowDialog(isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Laporan Berhasil Dibuat
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center pb-4 flex flex-col gap-2'>
              <IconRosetteDiscountCheckFilled
                className='text-teal-600 mx-auto'
                size={100}
              />
              <span>
                Laporan <span className='capitalize'>{jenis}</span> telah
                selesai dibuat, klik lihat laporan untuk melihat detail laporan
                yanng telah Anda buat.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='grid grid-cols-2 gap-2'>
            <AlertDialogCancel
              onClick={() => {
                form.reset(defaults);
                setImage("");
                setFilename("");
              }}>
              Tutup
            </AlertDialogCancel>
            <Link href={`/laporan/riwayat`}>
              <Button className='bg-teal-600 hover:bg-teal-700 w-full'>
                Lihat Laporan
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
