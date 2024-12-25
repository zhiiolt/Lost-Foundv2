/** @format */
"use client";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import * as React from "react";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "../../schema/formSchema";
import Link from "next/link";
import Google from "@/assets/google.svg";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconXboxXFilled } from "@tabler/icons-react";

export default function LoginForm() {
  const [showDialog, setShowDialog] = React.useState(false);
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (!res.error) {
        push("/dashboard");
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      setShowDialog(true);
    }
  };

  return (
    <div className='py-4 z-50'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                        : "text-sm md:text-base"
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
                <div className='flex items-center'>
                  <FormLabel>Password</FormLabel>
                  <Link
                    href='#'
                    className='ml-auto inline-block text-xs underline md:text-sm'>
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    {...field}
                    className={
                      form.formState.errors.password
                        ? "border-red-500 ring-red-500 text-red-500 focus-visible:ring-red-300 focus-visible:ring-2 text-sm md:text-normal"
                        : "text-sm md:text-base"
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
              onClick={() => console.log(form.formState.errors)}
              className='w-full mt-4 disabled:cursor-not-allowed'
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className='animate-spin' />
              )}
              Masuk
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={() =>
                signIn("google", { callbackUrl: "/dashboard", redirect: false })
              }>
              <IconBrandGoogle /> Login with Google
            </Button>
          </div>
          <div className='mt-4 text-center text-xs md:text-sm'>
            Belum punya akun ?{" "}
            <Link href='/register' className='underline'>
              Buat Akun
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
              Login Gagal
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center pb-4 flex flex-col gap-2'>
              <IconXboxXFilled className='text-red-600 mx-auto' size={100} />

              <span>Email atau password salah.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='w-full'>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
