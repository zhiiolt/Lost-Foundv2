/** @format */

import Image from "next/image";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandGithub,
} from "@tabler/icons-react";
import logoputih from "../../assets/logo_putih.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-teal-700 min-h-80 pt-4'>
      <div className='container'>
        <div className='flex justify-between items-center border-b-[1px]'>
          <div>
            <Image src={logoputih} alt='logo' className='w-16' />
            <h4 className='text-lg text-white font-bold -mt-2'>Lost & Found</h4>
            <div className='flex py-8'>
              <div className='flex flex-col'>
                <span className='text-slate-300'>Email</span>
                <span className='text-white mt-1'>lostfound@findit.com</span>
              </div>
              <div className='flex flex-col ml-8'>
                <span className='text-slate-300'>Telepon</span>
                <span className='text-white mt-1'>+62 8123432165</span>
              </div>
            </div>
          </div>
          <div className='max-w-96'>
            <h4 className='text-2xl leading-relaxed text-white font-bold text-right'>
              Bantu Temukan Barang-Barang di Sekitarmu Sekarang
            </h4>
            <div className='mt-4 flex gap-4 justify-end'>
              <button className='px-4 py-2 rounded-full text-white border border-white font-medium hover:bg-teal-800'>
                Bergabung
              </button>
              <button className='px-4 py-2  bg-white rounded-full font-medium hover:bg-slate-300'>
                Lihat Demo
              </button>
            </div>
          </div>
        </div>
        <div className='py-8 flex justify-between items-center'>
          <p className='text-white'>
            &copy; 2024 Lost & Found. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <Link href='/'>
              <IconBrandInstagram stroke={1} size={30} color='white' />
            </Link>
            <Link href='/'>
              <IconBrandFacebook stroke={1} size={30} color='white' />
            </Link>
            <Link href='/'>
              <IconBrandTwitter stroke={1} size={30} color='white' />
            </Link>
            <Link href='/'>
              <IconBrandYoutube stroke={1} size={30} color='white' />
            </Link>
            <Link href='/'>
              <IconBrandGithub stroke={1} size={30} color='white' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
