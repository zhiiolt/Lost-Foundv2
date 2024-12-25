/** @format */

import Image from "next/image";
import showcase from "../../assets/showcase.svg";
import { ContainerScroll } from "../ui/container-scroll-animation";

export default function ProductShowsace() {
  return (
    <section className='bg-gradient-to-b from-white to-[#D2DCFF] py-24'>
      <div className='container'>
        <div className='flex justify-center -mt-60 -mb-20'>
          <ContainerScroll
            titleComponent={
              <>
                <div className='max-w-[540px] mx-auto'>
                  <div className='flex justify-center'>
                    <div className='text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight'>
                      Solusi Pintar untuk Barang Hilang dan Temuan
                    </div>
                  </div>
                  <h2 className='text-center text-5xl leading-[50px] font-bold tracking-tighter bg-gradient-to-b from-black to-teal-700 text-transparent bg-clip-text mt-5'>
                    Laporkan barang hilang atau temuan hanya dengan beberapa
                    klik
                  </h2>
                  <p className='text-center text-[22px] leading-[30px] tracking-tight text-teal-950 mt-5'>
                    Jangan biarkan barang hilang terlalu lama. Mulai lapor
                    sekarang dan bantu barang-barang itu kembali ke pemiliknya!
                  </p>
                </div>
              </>
            }>
            <Image src={showcase} alt='showcase' />
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
