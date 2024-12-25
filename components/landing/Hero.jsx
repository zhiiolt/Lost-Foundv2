/** @format */

import Image from "next/image";
import arrow from "../../assets/arrow-r.svg";
import world from "../../assets/undraw_deliveries.svg";

export default function Hero() {
  return (
    <section className='pt-8 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#0d9488,#EAEEFE_80%)]'>
      <div className='container md:flex'>
        <div>
          <h1 className='text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-teal-700 text-transparent bg-clip-text py-2'>
            Platform Aman untuk Melaporkan dan Menemukan Barang Hilang
          </h1>
          <p className='mt-6 text-xl tracking-tight leading-relaxed'>
            Website ini dibuat untuk mempermudah kamu melaporkan barang hilang
            atau barang yang ditemukan. Dengan sistem yang mudah digunakan, kamu
            bisa mencantumkan detail barang, lokasi terakhir, atau informasi
            penting lainnya. Kami berkomitmen untuk membantu mempertemukan
            barang dengan pemiliknya secepat mungkin. Yuk, bersama kita ciptakan
            solusi yang memudahkan dan saling membantu.
          </p>
          <button className='mt-6 text-xl  border border-solid border-teal-950 rounded-lg px-4 py-2 inline-flex items-center gap-1 group'>
            Cari Barangmu
            <span>
              <Image
                src={arrow}
                alt='arrow'
                className='group-hover:translate-x-2 transition'
              />
            </span>
          </button>
        </div>
        <div className='md:h-[480px]'>
          <Image src={world} alt='world' className='md:h-full md:w-[3000px]' />
        </div>
      </div>
    </section>
  );
}
