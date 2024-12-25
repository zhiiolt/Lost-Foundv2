/** @format */
"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "../../schema/formSchema";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import * as React from "react";
import { IconXboxXFilled } from "@tabler/icons-react";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());

    console.log(res);
    if (res.status) {
      setShowDialog(true);
      setError(false);
    } else {
      setShowDialog(true);
      setError(true);
      setMessage(res.message);
    }
  };

  return (
    <div className='py-4 z-50'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='John Doe'
                    {...field}
                    className={
                      form.formState.errors.name
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base border-slate-300"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Johndoe'
                    {...field}
                    className={
                      form.formState.errors.username
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base border-slate-300"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='example@gmail.com'
                    {...field}
                    className={
                      form.formState.errors.email
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base border-slate-300"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    {...field}
                    className={
                      form.formState.errors.password
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base border-slate-300"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    {...field}
                    className={
                      form.formState.errors.confirmPassword
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base border-slate-300"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-4'>
            <Button
              type='submit'
              className='w-full mt-4 disabled:cursor-not-allowed'
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className='animate-spin' />
              )}
              Buat Akun
            </Button>
            <Button variant='outline' className='w-full'>
              <IconBrandGoogle /> Registrasi dengan Google
            </Button>
          </div>
          <div className='mt-4 text-center text-xs md:text-sm'>
            Sudah punya akun ?{" "}
            <Link href='/login' className='underline'>
              Login
            </Link>
          </div>
        </form>
      </Form>
      <AlertDialog
        open={showDialog}
        onOpenChange={(isOpen) => setShowDialog(isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center font-bold'>
              {error ? "Registrasi Gagal" : "Registrasi Berhasil"}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center pb-4 flex flex-col gap-2'>
              {error ? (
                <IconXboxXFilled className='text-red-600 mx-auto' size={100} />
              ) : (
                <IconRosetteDiscountCheckFilled
                  className='text-teal-600 mx-auto'
                  size={100}
                />
              )}

              <span>
                {error
                  ? message
                  : "Registrasi berhasil, silahkan login untuk melanjutkan."}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {error && (
              <AlertDialogCancel className='w-full'>Tutup</AlertDialogCancel>
            )}

            {!error && (
              <Button
                className='w-full bg-teal-600 hover:bg-teal-700'
                onClick={() => signIn()}>
                Login
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
