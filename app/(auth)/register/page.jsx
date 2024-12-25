/** @format */

import Image from "next/image";
import logohijau from "@/assets/logo-hijau.svg";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "../../../components/forms/RegisterForm";
import { FlipWords } from "@/components/ui/flip-word";
import { BackgroundLines } from "@/components/ui/background-line";
import illustration from "../../../assets/undraw_adventure_re_ncqp (1).svg";

export const metadata = {
  title: "Lost & Found: Register",
  description: "Halaman register untuk masuk ke akun Anda.",
};

export default function RegisterPage() {
  const word = ["mudah", "cepat", "aman"];

  return (
    <div className='lg:grid lg:grid-cols-7 bg-gradient-to-b from-white to-[#D2DCFF]'>
      <div className='px-8 md:px-36 lg:px-12 lg:col-span-3 md:py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='flex items-center'>
              <Image src={logohijau} alt='logo' className='w-16' />
              <span className='hidden md:block text-lg text-teal-700 font-bold ml-2 -mt-2 '>
                Lost & Found
              </span>
            </div>
          </div>
          <div>
            <Link
              href='/'
              className={buttonVariants({
                variant: "ghost",
                className: "text-teal-900",
              })}>
              <ArrowLeft /> Kembali
            </Link>
          </div>
        </div>
        <div className='flex flex-col justify-center py-8 md:px-12'>
          <h1 className='text-lg md:text-3xl font-bold bg-gradient-to-b from-black to-teal-700 text-transparent bg-clip-text'>
            Buat Akun!
          </h1>
          <p className='text-slate-500 py-2 text-sm md:text-base'>
            Lengkapi data-data berikut untuk membuat akun.
          </p>
          <RegisterForm />
        </div>
      </div>
      <div className='hidden bg-teal-950 rounded-tl-3xl rounded-bl-3xl lg:col-span-4 col-end-8 relative py-12 lg:flex lg:flex-col lg:justify-between'>
        <BackgroundLines>
          <div className=' flex items-center justify-center px-12'>
            <div className='text-3xl text-center leading-relaxed font-semibold tracking-tight text-white dark:text-neutral-400'>
              Temukan barangmu dengan
              <FlipWords words={word} />
              <p>hanya dengan beberapa klik.</p>
            </div>
          </div>
          <Image
            src={illustration}
            alt='illustration'
            className='absolute bottom-52 h-[350px]'
          />
        </BackgroundLines>
        <p className='text-white italic text-center'>
          "Barang hilang bisa ketemu di Lost & Found. Hati yang hilang? Cari di
          aplikasi sebelah, bro."
        </p>
      </div>
    </div>
  );
}
