/** @format */
"use client";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Menubar from "../../assets/menubar.svg";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className='py-5 sticky top-0 backdrop-blur-xl z-[1000]'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Image src={logo} alt='logo lost & found' width={50} height={50} />
          <Image
            src={Menubar}
            alt='menubar'
            width={30}
            height={30}
            className='md:hidden'
          />
          <div className='hidden md:flex gap-10 text-black items-center font-medium'>
            <Link href='/'>About</Link>
            <Link href='/'>Features</Link>
            <Link href='#reviews'>Reviews</Link>
            <div className='inline-flex gap-4'>
              <button
                onClick={() => signIn()}
                className='bg-teal-700 text-white px-4 py-2 rounded-full font-medium hover:bg-teal-800 focus:ring-4 focus:ring-teal-200'>
                Login
              </button>

              <Link href='/register'>
                <button className='border border-solid border-teal-700 px-4 py-2 rounded-full text-teal-700 font-medium hover:bg-slate-200 focus:ring-4 focus:ring-teal-200'>
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
