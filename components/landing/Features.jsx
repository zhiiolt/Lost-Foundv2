/** @format */
"use client";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconMap2,
  IconFileBroken,
  IconBellRingingFilled,
  IconMessage,
} from "@tabler/icons-react";
import world from "../../assets/undraw_world.svg";
import laporan from "../../assets/undraw_laporan.svg";
import reminder from "../../assets/undraw_reminder.svg";
import chat from "../../assets/undraw_chat.svg";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Features() {
  return (
    <section className='bg-gradient-to-b from-[#D2DCFF] to-white'>
      <div className='container'>
        <div className='max-w-[640px] mx-auto'>
          <div className='flex justify-center'>
            <div className='text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight'>
              Features
            </div>
          </div>
          <h2 className='text-center text-5xl leading-[50px] font-bold tracking-tighter bg-gradient-to-b from-black to-teal-700 text-transparent bg-clip-text mt-5 py-2'>
            Semua yang Kamu Butuhkan
          </h2>
          <p className='text-center text-[22px] leading-[30px] tracking-tight text-teal-950 mt-5'>
            Lihat fitur-fitur unggulan kami yang dirancang untuk mempermudah
            hidupmu.
          </p>
        </div>
        <div className='mt-8'>
          <BentoGrid className='max-w-4xl mx-auto md:auto-rows-[20rem]'>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

const PetaInteraktif = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      <motion.div
        variants={variants}
        className='flex flex-row justify-center rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black'>
        <Image src={world} alt='world' height='150' />
      </motion.div>
    </motion.div>
  );
};
const BuatLaporan = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      <motion.div
        variants={variants}
        className='flex flex-row justify-center rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black'>
        <Image src={laporan} alt='world' height='150' />
      </motion.div>
    </motion.div>
  );
};
const Notification = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      <motion.div
        variants={variants}
        className='flex flex-row justify-center rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black'>
        <Image src={reminder} alt='world' height='150' />
      </motion.div>
    </motion.div>
  );
};
const Chatting = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      <motion.div
        variants={variants}
        className='flex flex-row justify-center rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black'>
        <Image src={chat} alt='world' height='150' />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Peta Interaktif",
    description:
      "Peta yang menampilkan lokasi barang hilang dan ditemukan terbaru. Fitur ini membantu pengguna mengetahui barang apa saja yang dilaporkan di sekitar mereka atau lokasi tertentu.",
    header: <PetaInteraktif />,
    className: "md:col-span-2",
    icon: <IconMap2 className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "Buat Laporan",
    description:
      " Laporan memungkinkan pengguna melaporkan barang yang hilang atau ditemukan dengan detail yang memudahkan pencocokan.",
    header: <BuatLaporan />,
    className: "md:col-span-1",
    icon: <IconFileBroken className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "Notifikasi Realtime",
    description:
      "Notifikasi yang menunjukkan pembaruan terkini tentang laporan barang yang cocok dengan deskripsi barang yang hilang.",
    header: <Notification />,
    className: "md:col-span-1",
    icon: <IconBellRingingFilled className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: "Realtime Chat",
    description:
      "Fitur chat memungkinkan pemilik barang dan penemu barang untuk berkomunikasi secara langsung dan aman melalui aplikasi.",
    header: <Chatting />,
    className: "md:col-span-2",
    icon: <IconMessage className='h-4 w-4 text-neutral-500' />,
  },
];
